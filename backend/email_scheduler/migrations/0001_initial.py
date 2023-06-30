# Generated by Django 4.2.2 on 2023-06-29 08:37

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EmailScheduler',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender', models.CharField(default='best.motion.ever.group3@gmail.com', max_length=150)),
                ('receiver_to', models.TextField(blank=True)),
                ('receiver_cc', models.TextField(blank=True)),
                ('receiver_bcc', models.TextField(blank=True)),
                ('header', models.CharField(blank=True, max_length=150)),
                ('body', models.TextField(blank=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('scheduled_date', models.DateTimeField(default=datetime.datetime(2023, 6, 29, 8, 37, 29, 335525, tzinfo=datetime.timezone.utc))),
                ('sent_date', models.DateTimeField(blank=True, default=None, null=True)),
            ],
        ),
    ]