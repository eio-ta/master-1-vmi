from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from .models import Message, Message_Game, Message_Player
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.db.models import Sum, Value, Q
from django.db.models.functions import Coalesce
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .forms import MessageForm
from django.http import JsonResponse
from django.core import serializers
from .helpers import check_message_try


# Create your views here.

def home(request):
    return render(request, 'home.html', {})

def login_(request):
    if request.user.is_authenticated:
        return redirect("private")
    
    if request.method == "POST":
        username = request.POST['email']
        password = request.POST['password']

        user_ = authenticate(username=username, password=password)

        if user_ is not None:
            login(request, user_)
            request.session['username'] = username
            return redirect("private")
        else:
            messages.warning(request, "Bad Credentials used.")
            return redirect("login")
        
    return render(request, 'authentication/login.html', {})

def register(request):
    if request.method == "POST":
        email = request.POST['email']
        username = request.POST['username']
        password = request.POST['password']

        try:
            print("trying")
            user_ex = User.objects.filter(email=email)
            print(f"user_ex: {len(user_ex)}")
        except Exception as e:
            print(f"exception: {e}")
            user_ex = []

        if len(user_ex) == 0:
            try:
                user_ = User.objects.create_user(username, email, password) 
                user_.save()
                messages.success(request,"Your Account has been created successfully.")
                return redirect("login")
            except Exception as e:
                messages.warning(request, "Email/username already exists.")
                return redirect("register")
        else:
            messages.warning(request, "Email already exists.")
            return redirect("register")
    
    return render(request, 'authentication/register.html', {})

def logout_(request):
    logout(request)
    return redirect("home")

@login_required
def private(request):
    if request.user.is_authenticated:
        # get all the messages created by this user
        messages = Message.objects.filter(createur_username=request.session["username"])
        data = []

        for message in messages:
            number_of_player = Message_Player.objects.filter(lien_message=message.lien).count()
            winner = Message_Player.objects.filter(lien_message=message.lien, won=True).count()
            game_ids_uid = Message_Player.objects.filter(lien_message=message.lien).values_list("id", flat=True)
            total_try_positive = Message_Game.objects.filter(Q(points__gt=0), id_game__in=game_ids_uid).count()
            total_try_negative = Message_Game.objects.filter(Q(points__lt=0), id_game__in=game_ids_uid).count()
            total_try = Message_Game.objects.filter(id_game__in=game_ids_uid).count()

            if total_try == 0:
                perc_positive = 0
                perc_negative = 0
            else:
                perc_positive = total_try_positive/total_try
                perc_negative = total_try_negative/total_try


            data.append({
                "message": message.message,
                "date": message.date,
                "lien": message.lien,
                "id": message.id,
                "deleted": message.deleted,
                "number_of_player": number_of_player, 
                "winner": winner,
                "not_yet_won": number_of_player - winner,
                "winning_tendancy": f"{((perc_positive) * 100):.0f}%",
                "loosing_tendancy": f"{((perc_negative) * 100):.0f}%",
                "total_essaie": total_try
            })


        return render(request, 'private.html', {"user_messages": data})
    else:
        return redirect("login")
    
def givePseudo(request):
    return render(request, 'game/give_pseudo.html', {"redirection_uid": request.GET['redirection_uid']})

def game(request):
    if 'game_start' not in request.GET: # check if the game is started
        if 'uid' not in request.GET:
            return redirect("home")
        else:
            # check if the uid is in the data
            uid = request.GET['uid']
            try: # if the uid format is not correct throw an error
                message = Message.objects.filter(lien=uid)
            except Exception as e:
                print(e)
                return redirect("home")

            if len(message) == 0: # if the message is not find in db
                return redirect("home")
            else:
                # check if the messages is not deleted
                if message[0].deleted:
                    return redirect("home")

                # check if the user is logged in
                if request.user.is_authenticated:
                    # check if the user is not the same as the one who created the game
                    print(f"{len(str(request.user))} == {len(message[0].createur_username)} ? {request.user == message[0].createur_username}")
                    if str(request.user) == message[0].createur_username:
                        print("private")
                        return redirect("private")
                    else:
                        print("loading")
                        return redirect(f'/loading?player={request.user}&lien={uid}&registered={True}')
                else: # redirect to the pseudo page
                    return redirect(f'/givePseudo?redirection_uid={uid}')
    else:
        data = {
            "pseudo": request.GET['player'],
            "game": request.GET['game_id'],
            "uid": request.GET['uid'],
            "points": 0
        }
        
        # TO-DO: handle case where wrong or unexisting lien is used
        message = Message.objects.filter(lien=request.GET['uid'])[0].message
        data['message'] = "_" * len(message)

        previous_try = Message_Game.objects.filter(id_game=data['game']).order_by('id').last()

        if previous_try is not None:
            total_points = Message_Game.objects.filter(id_game=data['game']).aggregate(total=Coalesce(Sum('points'), Value(0)))['total']
            data['message'] = previous_try.actual
            data['points'] =  total_points

        return render(request, "game/game.html", data)
                
def loading(request):
    if request.method == 'POST':
        data = {
            "player": request.POST['player'],
            "uid": request.POST['uid'],
            "registered": False
        }
    else:
        data = {
            "player": request.GET['player'],
            "uid": request.GET['lien'],
            "registered": True
        }

    new_player = Message_Player.objects.create(
        player_username= data['player'],
        lien_message = data['uid'],
        registered_user = data['registered']
    )

    data['game_id'] = new_player.id

    return render(request, "game/loading.html", data)

@login_required
@csrf_exempt
def save_message(request):
    if request.method == 'POST':
        form = MessageForm(request.POST)

        if form.is_valid():
            # Save the data to the database
            form.save()
            # Return a JSON response indicating success
            messages = Message.objects.filter(createur_username=request.session["username"]).order_by('id').last()
            messages = serializers.serialize('json', list([messages]))
            return JsonResponse({'success': True, 'messages': messages})
        else:
            print(form.errors)
    # If the form is not valid, return a JSON response indicating failure
    return JsonResponse({'success': False})

@login_required
@csrf_exempt
def get_message(request):
    if request.method == 'GET':
        id_message = request.GET['id']
        messages = Message.objects.filter(id=id_message)
        
        data = {}
        data['message'] = messages[0].message
        data['date'] = messages[0].date
        data['indice'] = messages[0].indice
        data['stats'] = []

        message_player = Message_Player.objects.filter(lien_message=messages[0].lien)

        for player in message_player:
            message_game = Message_Game.objects.filter(id_game=player.id)

            total_tries = message_game.count()
            positive_tries = message_game.filter(Q(points__gt=0)).count()
            negative_tries = message_game.filter(Q(points__lt=0)).count()

            data['stats'].append({
                "total_tries": total_tries,
                "positive_tries": positive_tries,
                "negative_tries": negative_tries,
                "player": player.player_username,
                "won": player.won
            })

        return JsonResponse({'success': True, 'messages': data})

@csrf_exempt
def check_try(request):
    if request.method == 'POST':
        data = request.POST
        message = Message.objects.filter(lien=data['uid'])[0]

        new_actual, occurences, points, won = check_message_try(message.message, data['actual_message'], data['essai'])

        Message_Game.objects.create(
            essaie = data['essai'],
            occurences = occurences,
            actual = new_actual,
            points = points,
            id_game = data['game_id'],
        )

        if won:
            message_player = Message_Player.objects.get(id=data['game_id'])
            message_player.won = True
            message_player.save()

        total_points = Message_Game.objects.filter(id_game=data['game_id']).aggregate(total=Coalesce(Sum('points'), Value(0)))['total']
        
        return JsonResponse({"success": True, 
                             "actual": new_actual, 
                             "occurences": occurences, 
                             "total_points": total_points, 
                             "points": points, 
                             "won": won})
    else:
        return JsonResponse({"success": False})

@login_required
@csrf_exempt
def delete_message(request):
    if request.method == "POST":
        id_message = request.POST['id_message']
        print(f"id message: {id_message}")
        message = Message.objects.get(id=id_message)
        message.deleted = True
        message.save()

        return JsonResponse({"success": True})

    return JsonResponse({"success": False})

@login_required
def change_email(request):
    if request.method == "POST":
        new_email = request.POST['new-email']

        try:
            print("trying")
            user_ex = User.objects.filter(email=new_email)
        except Exception as e:
            print(f"exception: {e}")
            user_ex = []

        if len(user_ex) == 0:
            user = User.objects.get(username=request.user)
            user.email = new_email
            user.save()
            logout(request)
            messages.success(request, "Your email has been changed. Please login again.")
            return redirect("login")
        else:
            messages.warning(request, "This email already exits.")
            return redirect("private")

@login_required
def change_password(request):
    if request.method == 'POST':
        current_password = request.POST['current_password']
        new_password = request.POST['new_password']
        confirm_password = request.POST['confirm_password']
        
        # Get the current user
        user = request.user
        
        # Check if the current password is correct
        if user.check_password(current_password):
            print("old password")
            # Check if the new password and confirm password match
            if new_password == confirm_password:
                # Set the new password for the user
                user.set_password(new_password)
                user.save()
                messages.success(request, 'Your password has been changed successfully. Please login again.')
                return redirect('login')
            else:
                messages.warning(request, 'New password and confirm password do not match.')
        else:
            messages.warning(request, 'The current password you entered is incorrect.')
    
    return redirect('private')