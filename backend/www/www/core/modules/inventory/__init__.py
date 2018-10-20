import logging
log = logging.getLogger(__name__)


def add_routes(config):
    config.add_route(
        name='inv_items_all',
        path='/api/inventory/items/all'
    )

    config.add_route(
        name='inv_items_add',
        path='/api/inventory/items/add'
    )

def includeme(config):
    log.debug('included: www.core.modules.inventory')
    add_routes(config)
    config.scan('www.core.modules.inventory')