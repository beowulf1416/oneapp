import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config

#permissions
@view_config(
    route_name='admin_security_permission_create',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_admin_security_permission_create(request):
    log.debug('view_admin_security_permission_create')

    params = request.json_body
    name = params['name'] if 'name' in params else ''
    description = params['description'] if 'description' in params else ''

    if (name == ''):
        return {
            'status': False,
            'errors': [ 'Permission name is required' ]
        }

    try:
        d = request.data
        dp = d.get_data_provider('admin.security')

        result = dp.permission_create(name, description)
        log.debug(result)
        if (result):
            (permission_id, ) = result
            return {
                'status': True,
                'data': {
                    'permission': {
                        'id': permission_id,
                        'name': name,
                        'description': description
                    }
                }
            }
        else:
            return {
                'status': False,
                'errors': [ 'Unable to add permission' ]
            }
    except Exception as  e:
        log.error(e)
        return {
            'status': False,
            'errors': [ str(e) ]
        }


@view_config(
    route_name='admin_security_permissions_get',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_admin_security_permissions_get(request):
    log.debug('view_admin_security_permissions_get')

    params = request.json_body
    permission_id = params['id'] if 'id' in params else ''

    if (permission_id == ''):
        return {
            'status': False,
            'errors': [ 'Permission id is required' ]
        }
    
    try:
        d = request.data
        dp = d.get_data_provider('admin.security')

        result = dp.permission_get(permission_id)
        if (result):
            (permission_id, active, created, name, description) = result

            return {
                'status': True,
                'data': {
                    'permission': {
                        'id': permission_id,
                        'name': name,
                        'description': description
                    }
                }
            }
        else:
            return {
                'status': False,
                'errors': [ 'Permission with id %s not found' % (permission_id) ]
            }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'errors': [ str(e) ]
        }


@view_config(
    route_name='admin_security_permissions_all',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_admin_security_permissions_all(request):
    log.debug('view_admin_security_permissions_all')

    params = request.json_body
    page = params['page'] if 'page' in params else { 'order': 'id', 'direction': 'asc', 'items': 0, 'offset': 0 }
    order = page['order'] if 'order' in page else ''
    direction = page['direction'] if 'direction' in page else ''
    offset = page['offset'] if 'offset' in page else 0
    items = page['items'] if 'items' in page else 10

    try:
        d = request.data
        dp = d.get_data_provider('admin.security')

        result = dp.permissions_get('id','asc', items, offset)
        return {
            'status': True,
            'data': {
                'permissions': result
            }
        }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'errors': [ str(e) ]
        }

# roles
@view_config(
    route_name='admin_security_role_create',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_admin_security_role_create(request):
    log.debug('view_admin_security_role_create')

    params = request.json_body
    name = params['name'] if 'name' in params else ''
    description = params['description'] if 'description' in params else ''

    if (name == ''):
        return {
            'status': False,
            'errors': [ 'Role name is required' ]
        }

    try:
        d = request.data
        dp = d.get_data_provider('admin.security')

        result = dp.role_create(name, description)
        log.debug(result)
        if (result):
            (role_id, ) = result
            return {
                'status': True,
                'data': {
                    'permission': {
                        'id': role_id,
                        'name': name,
                        'description': description
                    }
                }
            }
        else:
            return {
                'status': False,
                'errors': [ 'Unable to add role' ]
            }
    except Exception as  e:
        log.error(e)
        return {
            'status': False,
            'errors': [ str(e) ]
        }


@view_config(
    route_name='admin_security_roles_get',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_admin_security_roles_get(request):
    log.debug('view_admin_security_roles_get')

    params = request.json_body
    role_id = params['id'] if 'id' in params else ''

    if (role_id == ''):
        return {
            'status': False,
            'errors': [ 'Role id is required' ]
        }
    
    try:
        d = request.data
        dp = d.get_data_provider('admin.security')

        result = dp.role_get(role_id)
        if (result):
            (role_id, active, created, name, description) = result

            return {
                'status': True,
                'data': {
                    'permission': {
                        'id': role_id,
                        'name': name,
                        'description': description
                    }
                }
            }
        else:
            return {
                'status': False,
                'errors': [ 'Role with id %s not found' % (role_id) ]
            }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'errors': [ str(e) ]
        }


@view_config(
    route_name='admin_security_roles_all',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_admin_security_roles_all(request):
    log.debug('view_admin_security_roles_all')

    params = request.json_body
    page = params['page'] if 'page' in params else { 'order': 'id', 'direction': 'asc', 'items': 0, 'offset': 0 }
    order = page['order'] if 'order' in page else ''
    direction = page['direction'] if 'direction' in page else ''
    offset = page['offset'] if 'offset' in page else 0
    items = page['items'] if 'items' in page else 10

    try:
        d = request.data
        dp = d.get_data_provider('admin.security')

        result = dp.roles_get('id','asc', items, offset)
        return {
            'status': True,
            'data': {
                'roles': result
            }
        }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'errors': [ str(e) ]
        }