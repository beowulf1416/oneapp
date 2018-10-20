import logging
log = logging.getLogger(__name__)

import secrets

from www.core.data.provider import Provider

def create_provider(connection):
    log.debug('creating provider: www.core.modules.admin.security.provider.SecurityDataProvider')
    try:
        return SecurityDataProvider(connection)
    except Exception as e:
        log.error(e)
        raise e


class SecurityDataProvider(Provider):

    def __init__(self, connection):
        self._cn = connection

    # permissions
    def permission_create(self, name, description):
        log.debug('SecurityDataprovider::permission_create')
        sql = 'select * from security.permission_create(%s,%s)'
        try:
            result = self.fetch_one(sql, (name, description))
            return result
        except Exception as e:
            log.error(e)
            raise e
    
    def permission_get(self, id):
        log.debug('SecurityDataprovider::permission_get')
        sql = 'select * from security.permission_get(%s)'
        try:
            result = self.fetch_one(sql, (id, ))
            return result
        except Exception as e:
            log.error(e)
            raise e

    def permissions_get(self, order, direction, items, offset):
        log.debug('SecurityDataprovider::permissions_get')
        sql = 'select * from security.permissions_get(%s, %s, %s,%s)'
        try:
            result = self.fetch_all(sql, (order, direction, items, offset))
            permissions = []
            for p in result:
                (permission_id, active, created, name, description) = p
                permissions.append({
                    'id': permission_id,
                    'active': active,
                    'created': created,
                    'name': name,
                    'description': description
                })
            return permissions
        except Exception as e:
            log.error(e)
            raise e

    # roles
    def role_create(self, name, description):
        log.debug('SecurityDataprovider::role_create')
        sql = 'select * from security.role_create(%s,%s)'
        try:
            result = self.fetch_one(sql, (name, description))
            return result
        except Exception as e:
            log.error(e)
            raise e
    
    def role_get(self, id):
        log.debug('SecurityDataprovider::role_get')
        sql = 'select * from security.role_get(%s)'
        try:
            result = self.fetch_one(sql, (id, ))
            return result
        except Exception as e:
            log.error(e)
            raise e

    def roles_get(self, order, direction, items, offset):
        log.debug('SecurityDataprovider::roles_get')
        sql = 'select * from security.roles_get(%s, %s, %s,%s)'
        try:
            result = self.fetch_all(sql, (order, direction, items, offset))
            roles = []
            for r in result:
                (role_id, active, created, name, description) = r
                roles.append({
                    'id': role_id,
                    'active': active,
                    'created': created,
                    'name': name,
                    'description': description
                })
            return roles
        except Exception as e:
            log.error(e)
            raise e

    def users_get(self, order, direction, items, offset):
        log.debug('SecurityDataprovider::users_get')
        sql = 'select * from security.users_get(%s, %s, %s,%s)'
        try:
            result = self.fetch_all(sql, (order, direction, items, offset))
            users = []
            for r in result:
                (user_id, active, created, email) = r
                users.append({
                    'id': user_id,
                    'active': active,
                    'created': created,
                    'email': email
                })
            return users
        except Exception as e:
            log.error(e)
            raise e

    def user_get(self, id):
        log.debug('SecurityDataprovider::user_get')
        sql = 'select * from security.user_get(%s)'
        try:
            result = self.fetch_one(sql, (id, ))
            return result
        except Exception as e:
            log.error(e)
            raise e

    def user_create(self, email, pw):
        log.debug('SecurityDataprovider::user_create')
        sql = 'select * from security.user_create(%s, %s)'
        try:
            result = self.fetch_one(sql, (email, pw))
            return result
        except Exception as e:
            log.error(e)
            raise e

    # def is_allowed(self, user_id, permission):
    #     log.debug('SecurityDataProvider::is_allowed')