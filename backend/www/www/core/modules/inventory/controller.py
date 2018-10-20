import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config


@view_config(
    route_name='inv_items_all',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_inv_items_all(request):
    log.debug('view_inv_items_all')

    params = request.json_body
    pager = params['pager'] if 'pager' in params else ''
    filter = params['filter'] if 'filter' in params else ''

    log.debug(params)

    try:
        d = request.data
        dp = d.get_data_provider('inventory')

        items = dp.get_items(10, 0)

        return {
            'status': True,
            'data': {
                'items': items
            }
        }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'errors': [ str(e) ]
        }


@view_config(
    route_name='inv_items_add',
    request_method=('POST','OPTIONS'),
    renderer='json'
)
def view_inv_items_add(request):
    log.debug('view_inv_items_add')

    params = request.json_body
    name = params['name'] if 'name' in params else ''
    description = params['description'] if 'description' in params else ''

    if (name == ''):
        return {
            'status': False,
            'errors': ['Client name is required']
        }

    try:
        d = request.data
        dp = d.get_data_provider('inventory')

        result = dp.item_add(name, description)
        log.debug(result)

        return {
            'status': False,
            'errors': ['Unknown']
        }
    except Exception as e:
        log.error(e)
        return {
            'status': False,
            'errors': [ str(e) ]
        }