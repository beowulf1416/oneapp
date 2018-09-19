import logging
log = logging.getLogger(__name__)

from pyramid.renderers import render
from pyramid_mailer.message import Message
import premailer


class Mail:

    def __init__(self, request):
        self._request = request
        self._mailer = request.mailer

    def send_templated(self, template, recipients, context):
        log.debug('send_templated')

        subject = render(template + '.subject.txt', context, self._request)
        
        html = render(template + '.body.html', context, self._request)
        html_body = premailer.transform(html)

        text_body = render(template + '.body.txt', context, self._request)

        message = Message(
            subject = subject,
            sender = 'noreply@testing.com',
            recipients = recipients,
            body = text_body,
            html = html_body
        )

        self._mailer.send(message)


    def signup(self, email, token):
        log.debug('signup')
        body = '''
        <html>
        <head>
            <title>Signup</title>
        </head>`
        <body>
            <h3>Sign Up</h3>
            <a href='%s'>click here</a>
        </body>
        </html>
        ''' % (
            token
        )

        msg = Message(
            subject='Signup',
            sender='noreply@testing.com',
            recipients=[email],
            body=body
        )

        self._mailer.send(msg)