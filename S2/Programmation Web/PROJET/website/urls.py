from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('home', views.home, name="home"),
    path('login', views.login_, name="login"),
    path('logout', views.logout_, name="logout"),
    path('register', views.register, name="register"),
    path('private', views.private, name="private"),
    path('givePseudo', views.givePseudo, name="givePseudo"),
    path('game', views.game, name="game"),
    path('loading', views.loading, name="loading"),
    path('save_message', views.save_message, name="save_message"),
    path('get_message', views.get_message, name="get_message"),
    path('check_try', views.check_try, name='check_try'),
    path('delete_message', views.delete_message, name='delete_message'),
    path('change_email', views.change_email, name='change_email'),
    path('change_password', views.change_password, name='change_password')
]
