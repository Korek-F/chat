# Generated by Django 4.0.4 on 2022-08-22 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0005_alter_chat_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='name',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
