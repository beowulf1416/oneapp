import logging
log = logging.getLogger(__name__)

import secrets

from www.core.data.provider import Provider

def create_provider(connection):
    log.debug('creating provider: www.core.modules.admin.security.provider.ClientsDataProvider')
    try:
        return ClientsDataProvider(connection)
    except Exception as e:
        log.error(e)
        raise e


class ClientsDataProvider(Provider):
    def __init__(self, connection):
        self._cn = connection
    
    def client_create(self, name, description):
        sql = 'select * from clients.client_create(%s,%s)'
        try:
            result = self.fetch_one(sql, (name, description))
            return result
        except Exception as e:
            log.error(e)
            raise e

    def clients_get(self, order, direction, items, offset):
        log.debug('clients_get')
        sql = 'select * from clients.clients_get(%s, %s, %s,%s)'
        try:
            result = result = self.fetch_all(sql, (order, direction, items, offset))
            clients = []
            for c in result:
                (client_id, active, created, name, description) = c
                clients.append({
                    'id': client_id,
                    'active': active,
                    'created': created,
                    'name': name,
                    'description': description
                })
            return clients
        except Exception as e:
            log.error(e)
            raise e
