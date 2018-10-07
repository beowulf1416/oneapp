import logging
log = logging.getLogger()

from www.core.data.manager import Manager
from www.core.security.mail import Mail

class UserOperations(object):
    def signup_create(self, m: Manager, mail: Mail, email):
        log.debug('user_signup_create')

        if (email == ''):
            raise Exception('Email address is required')

        dp = m.get_data_provider('authentication')

        # check if email is already registered
        user = dp.get_user_by_email(email)
        if (user):
            raise Exception('Email is already registered')
        else:
            # check if email is already in signups
            signup = dp.get_signup_from_email(email)
            if (signup):
                (email, token, created_ts, verified_ts) = signup
                if (verified_ts):
                    raise Exception('Email %s is already registered but not yet verified' % (email))
                else:
                    token = dp.update_signup_token(email)
                    # mail = Mail(request)
                    mail.signup(email, token)

                    return {
                        'status': True,
                        'messages': [
                            'An email has been sent to %s containing a link to verify this signup.' % (email)
                        ]
                    }
            else:
                token = dp.get_signup_token(email)
                # mail = Mail(request)
                mail.signup(email, token)

                return {
                    'status': True,
                    'messages': [
                        'An email has been sent to %s containing a link to verify this signup' % (email)
                    ]
                }