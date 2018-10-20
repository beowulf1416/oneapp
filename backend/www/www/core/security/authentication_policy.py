import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import IAuthenticationPolicy
import jwt

class AuthenticationPolicy:

    def __init__(self, provider):
        self._provider = provider

    def authenticated_userid(self, request):
        log.debug('authenticated_userid')
        log.debug(authenticated_userid)

    def effective_principals(self, request):
        log.debug('effective_principals')

        sid = request.cookies['sid'] if 'sid' in request.cookies else ''
        if (sid == ''):
            return []
        else:
            jwt_secret = request.registry.settings['app.jwt.secret']
            jwt_algorithm = request.registry.settings['jwt.algorithm']
            claims = jwt.decode(
                sid,
                jwt_secret,
                jwt_algorithm
            )
            log.debug(claims)
            user_id = claims['user_id'] if 'user_id' in claims else ''
            if (user_id == ''):
                log.error('no user id')
                return []
            else:
                return [user_id]


    def remember(self, request, user_id, **kw):
        log.debug('remember')
        log.debug(user_id)

        try:
            session = request.session
            session['user_id'] = user_id
        except Exception as e:
            log.error(e)
            raise e

    def forget(self, request):
        log.debug('forget')

        try:
            session = request.session
            session['user_id'] = ''
        except Exception as e:
            log.error(e)
            raise e

    def unauthenticated_userid(self, request):
        log.debug('unauthenticated_userid')