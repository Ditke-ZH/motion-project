from django.db import models
from django.utils import timezone


class EmailScheduler(models.Model):
    sender = models.CharField(max_length=150, default='best.motion.ever.group3@gmail.com')
    receiver_to = models.TextField(blank=True)
    receiver_cc = models.TextField(blank=True)
    receiver_bcc = models.TextField(blank=True)
    header = models.CharField(max_length=150, blank=True)
    body = models.TextField(blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    scheduled_date = models.DateTimeField(default=timezone.now())
    sent_date = models.DateTimeField(default=None, blank=True, null=True)

    def __str__(self):
        return f'{self.sender} --> {self.receiver_to}: {self.header}'
