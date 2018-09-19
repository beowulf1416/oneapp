import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import IAuthenticationPolicy
import jwt

class AuthenticationPolicy:

    def __init__(self, provider):
        self._provider = provider

    def forget(self, request):
        log.debug('forget')

    def authenticated_userid(self, request):
        log.debug('authenticated_userid')
        log.debug(authenticated_userid)

    def effective_principals(self, request):
        log.debug('effective_principals')

        authorization = request.authorization
        if (authorization):
            (bearer, jwt_token) = authorization

            jwt_secret = request.registry.settings['app.jwt.secret']
            jwt_algorithm = request.registry.settings['jwt.algorithm']
            claims = jwt.decode(
                jwt_token,
                jwt_secret,
                jwt_algorithm
            )
            log.debug(claims)

            user_token = claims['token']
            return [user_token]


    def remember(self, request, user_id, **kw):
        log.debug('remember')
        log.debug(user_id)

    def unauthenticated_userid(self, request):
        log.debug('unauthenticated_userid')