from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Friendrequest(models.Model):
    state_choices = [('P', 'pending'), ('A', 'accepted'), ('R', 'rejected')]

    sending_user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='friendrequests_sent')
    receiving_user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='friendrequests_received')
    state = models.CharField(max_length=1, choices=state_choices, default='P')
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sending_user} --> {self.receiving_user} : {self.state}"
