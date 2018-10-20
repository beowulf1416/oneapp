import logging
log = logging.getLogger(__name__)

from zope.interface import implementer
from pyramid.interfaces import ISession
from pyramid.compat import native_

import jwt

def wrap_changed(wrapped):
    def changed(session, *arg, **kw):
        session.changed()
        return wrapped(session, *arg, **kw)
    return changed

def SessionFactory(
    serializer,
    cookie_name,
    max_age = None,
    path = '/',
    domain = None,
    secure = False,
    httponly = False,
    timeout = 1200,
    reissue_time = 0
):

    @implementer(ISession)
    class Session(dict):

        _dirty = False

        _cookie_name = cookie_name
        _cookie_max_age = max_age
        _cookie_path = path
        _cookie_domain = domain
        _cookie_secure = secure
        _cookie_httponly = httponly

        def __init__(self, request):
            self.request = request
            state = {}
            dict.__init__(self, state)

        def _set_cookie(self, response):
            log.debug('Session::_set_cookie')

            user_id = dict.__getitem__(self, 'user_id')

            try:
                jwt_token = jwt.encode(
                    {
                        'user_id': user_id
                    },
                    self.request.registry.settings['app.jwt.secret'],
                    self.request.registry.settings['jwt.algorithm']
                )
                log.debug(jwt_token)
                cookie_value = jwt_token.decode('utf-8')

                response.set_cookie(
                    self._cookie_name,
                    value = cookie_value,
                    max_age = self._cookie_max_age,
                    path = self._cookie_path,
                    domain = self._cookie_domain,
                    secure = self._cookie_secure,
                    httponly = self._cookie_httponly
                )

            except Exception as e:
                log.error(e)
                raise e
            

        def clear(self):
            log.debug('Session::clear')
            try:
                d = self.request.data
                dp = d.get_data_provider('session')
            except Exception as e:
                log.error(e)

        def create(self):
            log.debug('Session::create')

        def destroy(self):
            log.debug('Session::destroy')


        # ISession
        def changed(self):
            log.debug('Session::changed')
            if not self._dirty:
                self._dirty = True
                def set_cookie_callback(request, response):
                    log.debug('Session::set_cookie_callback')
                    self._set_cookie(response)
                    self.request = None
                self.request.add_response_callback(set_cookie_callback)

        def invalidate(self):
            log.debug('Session::invalidate')
            self.clear()

        # dict methods
        def __setitem__(self, key, value):
            log.debug('Session::__setitem__')
            log.debug(key)
            log.debug(value)
            dict.__setitem__(self, key, value)
            self.changed()


    return Session
        