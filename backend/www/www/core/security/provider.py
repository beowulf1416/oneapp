import logging
log = logging.getLogger(__name__)

import secrets

from www.core.data.provider import Provider


def create_provider(connection):
    log.debug('creating provider: www.core.security.provider.SecurityDataProvider')
    try:
        return SecurityDataProvider(connection)
    except Exception as e:
        log.error(e)
        raise e


class SecurityDataProvider(Provider):

    TOKEN_LENGTH = 16

    def __init__(self, connection):
        log.debug('__init__')
        super().__init__(connection)

    def get_signup_from_email(self, email):
        sql = 'select * from security.get_signup_from_email(%s)'
        try:
            result = self.fetch_one(sql, (email, ))
            return result
        except Exception as e:
            log.error(e)
            raise e

    def get_signup_token(self, email):
        token = secrets.token_urlsafe(self.TOKEN_LENGTH)
        sql = 'select * from security.add_signup(%s,%s)'
        try:
            result = self.fetch_one(sql, (email, token))
            (token, ) = result
            return token
        except Exception as e:
            log.error(e)
            raise e
        
    def update_signup_token(self, email):
        token = secrets.token_urlsafe(self.TOKEN_LENGTH)
        sql = 'select * from security.update_signup_token(%s,%s)'
        try:
            result = self.fetch_one(sql, (email, token))
            return token
        except Exception as e:
            log.error(e)
            raise e

    def get_signup_from_token(self, token):
        sql = 'select * from security.get_signup_from_token(%s)'
        try:
            result = self.fetch_one(sql, (token, ))
            return result
        except Exception as e:
            log.error(e)
            raise e

    def update_verify_signup(self, token, pw):
        sql = 'select * from security.update_verify_signup(%s,%s)'
        try:
            result = self.fetch_one(sql, (token, pw))
            return result
        except Exception as e:
            log.error(e)
            raise e
    
    def get_user_by_email(self, email):
        sql = 'select * from security.get_user_by_email(%s)'
        try:
            result = self.fetch_one(sql, (email, ))
            return result
        except Exception as e:
            log.error(e)
            raise e

    def add_user(self, email, password):
        sql = 'select * from security.create_user(%s, %s)'
        try:
            result = self.fetch_one(sql, (email, password))
            (new_id,) = result
            return new_id
        except Exception as e:
            log.error(e)
            raise e


    def authenticate(self, email, password):
        sql = 'select * from security.authenticate(%s,%s)'
        try:
            result = self.fetch_one(sql, (email, password))
            return result
        except Exception as e:
            log.error(e)
            raise e

    def update_signin_token(self, user_id, token):
        sql = 'select * from security.update_signin_token(%s,%s)'
        try:
            result = self.fetch_one(sql, (user_id, token))
            return result
        except Exception as e:
            log.error(e)
            raise e

    def get_user_from_token(self, token):
        sql = 'select * from security.get_user_from_token(%s)'
        try:
            result = self.fetch_one(sql, (token, ))
            return result
        except Exception as e:
            log.error(e)
            raise e

    def permissions(self, user_id):
        log.debug('SecurityDataProvider::permissions')
        sql = 'select * from security.user_get_permissions(%s)'
        try:
            result = self.fetch_all(sql, (user_id, ))
            log.debug(result)
            return result
        except Exception as e:
            log.error(e)
            raise e

    def is_allowed(self, user_id, permission):
        log.debug('SecurityDataProvider::is_allowed')
        sql = 'select * from security.is_user_allowed(%s,%s)'
        try:
            (allowed, ) = self.fetch_one(sql, (user_id, permission))
            return allowed
        except Exception as e:
            log.error(e)
            raise e