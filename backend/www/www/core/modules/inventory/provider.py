import logging
log = logging.getLogger(__name__)

import secrets

from www.core.data.provider import Provider

def create_provider(connection):
    log.debug('creating provider: www.core.modules.inventory.InventoryDataProvider')
    try:
        return InventoryDataProvider(connection)
    except Exception as e:
        log.error(e)
        raise e


class InventoryDataProvider(Provider):
    def __init__(self, connection):
        self._cn = connection

    def get_items(self, rows, offset):
        sql = 'select * from inventory.items_get(%s,%s)'
        try:
            result = self.fetch_all(sql, (rows, offset))
            items = []
            for c in result:
                (
                    item_id, 
                    active, 
                    created, 
                    name, 
                    description, 
                    brand, 
                    model, 
                    upc_ean, 
                    sku, 
                    perishable
                ) = c
                items.append({
                    'id': item_id,
                    'active': active,
                    'created': created,
                    'name': name,
                    'description': description,
                    'brand': brand,
                    'model': model,
                    'upc_ean': upc_ean,
                    'sku': sku,
                    'perishable': perishable
                })
            return items
        except Exception as e:
            log.error(e)
            raise e