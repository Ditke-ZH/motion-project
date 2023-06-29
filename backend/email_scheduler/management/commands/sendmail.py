from django.core.mail import send_mail
from django.core.management.base import BaseCommand
from django.utils import timezone

from email_scheduler.models import EmailScheduler


class Command(BaseCommand):
    help = 'This command will send emails that are due. Usually executed every 10 seconds by cron!'

    '''
    line added in crontab: (crontab -e)
    
    * * * * * for i in {1..6}; do /path/to/virtualenv/bin/python /path/to/project/manage.py mytask & sleep 10; done
    
    first test:
    * * * * * /path/to/virtualenv/bin/python /path/to/project/manage.py mytask

    '''

    def handle(self, *args, **options):
        emails = EmailScheduler.objects.filter(sent_date=None, scheduled_date__lte=timezone.now())

        for email in emails:
            subject = email.subject
            message = email.message
            from_email = email.from_email
            recipient_list_text = email.recipient_list
            recipient_list = [x.strip() for x in recipient_list_text.split(';')]

            send_mail(
                subject,
                message,
                from_email,
                recipient_list,
                fail_silently=False,
            )
            email.sent_date = timezone.now()
            email.save()
