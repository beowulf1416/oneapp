import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
from pyramid.security import remember, forget
import jwt
import secrets

from www.core.security.mail import Mail
from www.core.security.common.user import UserOperations


@view_config(
    route_name='user_signup',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_user_signup(request):
    log.debug('view_user_signup')

    params = request.json_body
    email = params['email'] if 'email' in params else ''

    try:
        uo = UserOperations()
        result = uo.signup_create(request.data, Mail(request), email)
        return result
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

        (authentic, ) = dp.authenticate(email, pw)
        if (authentic):
            user = dp.get_user_by_email(email)
            if (user is None):
                return {
                    'status': False,
                    'errors': [ 'Unable to retrieve user account' ]
                }

            (user_id, active, created_ts, email, last_signed_ts) = user
            remember(request, user_id)

            result = dp.permissions(user_id)
            permissions = [p[0] for p in result]

            return {
                'status': True,
                'data': {
                    'user': {
                        'email': email,
                        'authenticated': authentic,
                        'permissions': permissions
                    }
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

    headers = forget(request)

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