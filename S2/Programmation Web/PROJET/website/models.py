from django.db import models
import uuid
from django.utils import timezone
from django.core.validators import MinValueValidator

# Create your models here.
from django.utils import timezone
from django.urls import reverse

class Message(models.Model):
    createur_username = models.TextField(null=False, default=0)
    message = models.TextField(default="", null=False)
    indice = models.TextField(default="", null=False)
    lien = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    date = models.DateTimeField(null=False, default=timezone.now)
    deleted = models.BooleanField(null=False, default=False)

    def str(self):
        return "hello"

class Message_Player(models.Model): # track each time a player start a new game
    player_username = models.TextField(default="", null=False)
    lien_message = models.UUIDField(null=True)
    date_started = models.DateTimeField(null=False, default=timezone.now)
    registered_user = models.BooleanField(null=False, default=False)
    won = models.BooleanField(null=False, default=False)

class Message_Game(models.Model): # track each try a player does for a game
    id_game = models.IntegerField(null=True)
    essaie = models.TextField(null=True)
    occurences = models.IntegerField(null=True)
    actual = models.TextField(null=True)
    points = models.IntegerField(null=True, validators=[MinValueValidator(-2147483648)])
    date_sent = models.DateTimeField(null=False, default=timezone.now)
