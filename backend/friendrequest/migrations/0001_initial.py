# Generated by Django 4.2.2 on 2023-06-27 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Friendrequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state', models.CharField(choices=[('P', 'pending'), ('A', 'accepted'), ('R', 'rejected')], default='P', max_length=1)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
