# Generated by Django 5.1.4 on 2024-12-15 20:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('xspares_app', '0003_emailotp_customuser_role_alter_customuser_email_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='car',
            unique_together={('brand', 'model', 'variant')},
        ),
    ]
