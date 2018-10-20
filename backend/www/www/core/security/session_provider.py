import logging
log = logging.getLogger(__name__)

import secrets

from www.core.data.provider import Provider


def create_provider(connection):
    log.debug('creating provider: www.core.security.provider.SecurityDataProvider')
    try:
        # todo hardcoded constant
        return SessionDataProvider(connection, 16)
    except Exception as e:
        log.error(e)
        raise e


class SessionDataProvider(Provider):

    def __init__(self, connection, token_length):
        log.debug('__init__')
        self._token_length = token_length
        super().__init__(connection)

    def create(self, user_id):
        log.debug('SessionDataProvider::create')
        sql = 'select * from www.session_create(%s, %s)'
        try:
            token = secrets.token_urlsafe(self._token_length)

            self.fetch_one(sql, (token, user_id))
            return (token, )
        except Exception as e:
            log.error(e)
            raise e

    # def set_data(self, session_id, dict):
    #     log.debug('SessionDataProvider::set_data')
    #     try:
    #         for k, v in dict.items():
    #             log.debug(k)
    #             log.debug(v)
    #     except Exception as e:
    #         log.debug(e)
    #         raise e

    def invalidate(self, user_id):
        sql = 'select * from www.session_invalidate(%s)'
        try:
            result = self.fetch_one(sql, (user_id, ))
        except Exception as e:
            log.error(e)
            raise e