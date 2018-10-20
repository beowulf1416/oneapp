import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import IAuthorizationPolicy
from pyramid.security import Allowed, Denied


@implementer(IAuthorizationPolicy)
class AuthorizationPolicy:

    def __init__(self, provider):
        self._provider = provider

    def principals_allowed_by_permission(context, permission):
        log.debug('AuthorizationPolicy::principals_allowed_by_permission')

    def permits(self, context, principals, permission):
        log.debug(context)
        log.debug(principals)
        log.debug(permission)

        if (principals is not None):
            for p in principals:
                if (self._provider.is_allowed(p, permission)):
                    return True

        return False


    def principals_allowed_by_permission(context, permission):
        log.debug(context)
        log.debug(permission)
        raise NotImplemented