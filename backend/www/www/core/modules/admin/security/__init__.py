import logging
log = logging.getLogger(__name__)

def add_routes(config):
    # permissions
    config.add_route(
        name='admin_security_permission_create',
        path='/api/admin/security/permissions/create'
    )

    config.add_route(
        name='admin_security_permissions_get',
        path='/api/admin/security/permissions/get'
    )

    config.add_route(
        name='admin_security_permissions_all',
        path='/api/admin/security/permissions/all'
    )

    # roles
    config.add_route(
        name='admin_security_role_create',
        path='/api/admin/security/roles/create'
    )

    config.add_route(
        name='admin_security_roles_get',
        path='/api/admin/security/roles/get'
    )

    config.add_route(
        name='admin_security_roles_all',
        path='/api/admin/security/roles/all'
    )

    # users
    config.add_route(
        name='admin_security_users_all',
        path='/api/admin/security/users/all'
    )

    config.add_route(
        name='admin_security_users_get',
        path='/api/admin/security/users/get'
    )
    
    config.add_route(
        name='admin_security_users_create',
        path='/api/admin/security/users/create'
    )

def includeme(config):
    log.debug('included: www.core.modules.admin.security')

    add_routes(config)
    
    config.scan('www.core.modules.admin.security')