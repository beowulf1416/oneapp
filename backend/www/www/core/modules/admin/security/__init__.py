import logging
log = logging.getLogger(__name__)

def add_routes(config):
    # permissions
    config.add_route(
        name='admin_security_permission_create',
        path='/admin/security/permissions/create'
    )

    config.add_route(
        name='admin_security_permissions_get',
        path='/admin/security/permissions/get'
    )

    config.add_route(
        name='admin_security_permissions_all',
        path='/admin/security/permissions/all'
    )

    # roles
    config.add_route(
        name='admin_security_role_create',
        path='/admin/security/roles/create'
    )

    config.add_route(
        name='admin_security_roles_get',
        path='/admin/security/roles/get'
    )

    config.add_route(
        name='admin_security_roles_all',
        path='/admin/security/roles/all'
    )
    

def includeme(config):
    log.debug('included: www.core.modules.admin.security')

    add_routes(config)
    
    config.scan('www.core.modules.admin.security')