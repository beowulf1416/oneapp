import logging
log = logging.getLogger(__name__)


def add_routes(config):
    config.add_route(
        name='admin_home',
        path='/admin'
    )

def includeme(config):
    log.debug('included: www.core.modules.admin')

    add_routes(config)