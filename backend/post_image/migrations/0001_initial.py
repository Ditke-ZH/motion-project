# Generated by Django 4.2.2 on 2023-06-27 13:36

from django.db import migrations, models
import django.db.models.deletion
import post_image.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PostImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to=post_image.models.post_directory_path)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='post.post')),
            ],
            options={
                'verbose_name': 'Post Image',
                'verbose_name_plural': 'Post Images',
            },
        ),
    ]
