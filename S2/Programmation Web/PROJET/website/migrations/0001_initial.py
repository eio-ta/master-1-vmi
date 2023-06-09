# Generated by Django 4.1.7 on 2023-04-13 07:32

import django.core.validators
from django.db import migrations, models
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createur_username', models.TextField(default=0)),
                ('message', models.TextField(default='')),
                ('indice', models.TextField(default='')),
                ('lien', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Message_Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_game', models.IntegerField(null=True)),
                ('essaie', models.TextField(null=True)),
                ('occurences', models.IntegerField(null=True)),
                ('actual', models.TextField(null=True)),
                ('points', models.IntegerField(null=True, validators=[django.core.validators.MinValueValidator(-2147483648)])),
                ('date_sent', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Message_Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player_username', models.TextField(default='')),
                ('lien_message', models.UUIDField(null=True)),
                ('date_started', models.DateTimeField(default=django.utils.timezone.now)),
                ('registered_user', models.BooleanField(default=False)),
                ('won', models.BooleanField(default=False)),
            ],
        ),
    ]
