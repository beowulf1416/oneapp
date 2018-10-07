import logging
log = logging.getLogger(__name__)

def add_routes(config):
    config.add_route(
        name='admin_clients_create',
        path='/api/admin/clients/create'
    )

    config.add_route(
        name='admin_clients_get',
        path='/api/admin/clients/all'
    )

def includeme(config):
    log.debug('included: www.core.modules.admin.clients')
    add_routes(config)
    config.scan('www.core.modules.admin.clients')