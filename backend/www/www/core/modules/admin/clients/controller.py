import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config


@view_config(
    route_name='admin_clients_create',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_admin_clients_create(request):
    log.debug('view_admin_clients_create')

    params = request.json_body
    name = params['name'] if 'name' in params else ''
    description = params['description'] if 'description' in params else ''

    if (name == ''):
        return {
            'status': False,
            'errors': [ 'Client name is required' ]
        }

    try:
        d = request.data
        dp = d.get_data_provider('admin.clients')

        result = dp.client_create(name, description)
        log.debug(result)

        if (result):
            (client_id, ) = result
            return {
                'status': True,
                'data': {
                    'client': {
                        'id': client_id,
                        'name': name,
                        'description': description
                    }
                }
            }
        else:
            return {
                'status': False,
                'errors': [ 'Unable to add client' ]
            }
    except Exception as  e:
        log.error(e)
        return {
            'status': False,
            'errors': [ str(e) ]
        }


@view_config(
    route_name='admin_clients_get',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_admin_clients_get(request):
    log.debug('view_admin_clients_get')

    params = request.json_body
    page = params['page'] if 'page' in params else { 'order': 'id', 'direction': 'asc', 'items': 10, 'offset': 0 }
    order = page['order'] if 'order' in page else ''
    direction = page['direction'] if 'direction' in page else ''
    offset = page['offset'] if 'offset' in page else 0
    items = page['items'] if 'items' in page else 10

    try:
        d = request.data
        dp = d.get_data_provider('admin.clients')

        result = dp.clients_get('id','asc', items, offset)
        return {
            'status': True,
            'data': {
                'clients': result
            }
        }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'errors': [ str(e) ]
        }