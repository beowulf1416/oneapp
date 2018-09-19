import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
from pyramid.security import remember, forget
import jwt
import secrets

from www.core.security.mail import Mail


@view_config(
    route_name='user_signup',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_user_signup(request):
    log.debug('view_user_signup')

    params = request.json_body
    email = params['email'] if 'email' in params else ''

    if (email == ''):
        return {
            'status': False,
            'errors': [
                'Email address is required'
            ]
        }

    try:
        d = request.data
        dp = d.get_data_provider('authentication')

        # check if email is already registered
        user = dp.get_user_by_email(email)
        if (user):
            return {
                'status': False,
                'errors': [
                    'Email %s is already registered' % (Email)
                ]
            }
        else:
            # check if email is already in signups
            signup = dp.get_signup_from_email(email)
            log.debug(signup)
            if (signup):
                (email, token, created_ts, verified_ts) = signup
                if (verified_ts):
                    return {
                        'status': False,
                        'errors': [
                            'Email %s is already signed up but not yet verified' % (email)
                        ]
                    }
                else:
                    token = dp.update_signup_token(email)

                    mail = Mail(request)
                    mail.signup(email, token)

                    return {
                        'status': True,
                        'messages': [
                            'An email has been sent to %s containing a link to verify this signup.' % (email)
                        ]
                    }
            else:
                token = dp.get_signup_token(email)

                mail = Mail(request)
                mail.signup(email, token)

                return {
                    'status': True,
                    'messages': [
                        'An email has been sent to %s containing a link to verify this signup' % (email)
                    ]
                }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'errors': [
                str(e)
            ]
        }

@view_config(
    route_name='user_token_email',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_user_token_email(request):
    log.debug('view_user_token_email')

    params = request.json_body
    token = params['token'] if 'token' in params else ''

    if (token == ''):
        return {
            'status': False,
            'errors': [
                'Token is required'
            ]
        }

    try:
        d = request.data
        dp = d.get_data_provider('authentication')

        result = dp.get_signup_from_token(token)
        if (result):
            (email, token, created_ts, verified_ts) = result
            if (email):
                log.debug(email)
                return {
                    'status': True,
                    'data': {
                        'email': email
                    }
                }
            else:
                return {
                    'status': False,
                    'errors': [
                        'Token is not valid'
                    ]
                }
        else:
            return {
                'status': False,
                'errors': [
                    'Token is not valid'
                ]
            }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'errors': [
                str(e)
            ]
        }


@view_config(
    route_name='user_verify_token',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_user_verify_token(request):
    log.debug('view_user_verify_token')

    params = request.json_body
    token = params['token'] if 'token' in params else ''
    password = params['password'] if 'password' in params else ''

    if (token == '' or password == ''):
        return {
            'status': False,
            'errors': [
                'Token and password parameters are required'
            ]
        }
    
    try:
        d = request.data
        dp = d.get_data_provider('authentication')

        result = dp.update_verify_signup(token, password)
        return {
            'status': True,
            'data': {
                'result': result
            }
        }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'errors': [
                str(e)
            ]
        }

@view_config(
    route_name='user_signin',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_user_signin(request):
    log.debug('view_user_signin')

    params = request.json_body
    email = params['email'] if 'email' in params else ''
    pw = params['password'] if 'password' in params else ''

    if (email == '' and pw == ''):
        return {
            'status': False,
            'errors': [
                'Email and password is required.'
            ]
        }

    try:
        d = request.data
        dp = d.get_data_provider('authentication')

        authentic = dp.authenticate(email, pw)
        if (authentic):
            user = dp.get_user_by_email(email)
            if (user is None):
                return {
                    'status': False,
                    'errors': [ 'Unable to retrieve user account' ]
                }

            (user_id, active, created_ts, email, last_signed_ts) = user
            token = secrets.token_urlsafe(16) # todo hardcoded constant
            result = dp.update_signin_token(user_id, token)

            # jwt_token = request.create_jwt_token(
            #     token,
            #     email=email
            # )
            jwt_token = jwt.encode(
                {
                    'token': token
                },
                request.registry.settings['app.jwt.secret'],
                request.registry.settings['jwt.algorithm']
            )
            log.debug(jwt_token)

            remember(request, token)

            return {
                'status': True,
                'data': {
                    'authenticated': authentic,
                    'user': {
                        'id': user_id,
                        # 'active': active,
                        # 'created': created_ts,
                        'email': email,
                        # 'last_signed': last_signed_ts
                    },
                    'token': jwt_token.decode('utf-8')
                }
            }
        else:
            return {
                'status': False,
                'errors': [
                    'Email and password combination incorrect.'
                ]
            }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'errors': [ str(e) ]
        }


@view_config(
    route_name='user_signout',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_user_signout(request):
    log.debug('view_user_signout')

    return {
        'status': True,
        'data': {}
    }


@view_config(
    route_name='user_current',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_user_current(request):
    log.debug('view_user_current')

    jwt_secret = request.registry.settings['app.jwt.secret']
    jwt_algorithm = request.registry.settings['jwt.algorithm']

    authorization = request.authorization
    log.debug(authorization)
    if (authorization is None):
        return {
            'status': False,
            'errors': [ 'User is not logged in.' ]
        }

    # log.debug(authorization)
    (bearer, token) = authorization
    log.debug(token)
    claims = jwt.decode(
        token,
        jwt_secret,
        jwt_algorithm
    )
    log.debug(claims)

    email = claims['email'] if 'email' in claims else ''
    token = claims['sub'] if 'sub' in claims else ''

    issued_at_ts = claims['iat'] if 'iat' in claims else ''
    expire_ts = claims['exp'] if 'exp' in claims else ''

    try:
        d = request.data
        dp = d.get_data_provider('authentication')

        # result = dp.get_user_from_token(token)
        # log.debug(result)

        return {
            'status': False,
            'errors': [
                '//todo'
            ]
        }
    except Exception as e:
        log.debug(e)
        return {
            'status': False,
            'errors': [
                str(e)
            ]
        }


@view_config(
    route_name='user_test',
    request_method=('POST','OPTIONS'),
    renderer='json',
    permission='user.test'
)
def view_user_test(request):
    log.debug('view_user_test')

    return {
        'status': False,
        'errors': [ '//todo' ]
    }