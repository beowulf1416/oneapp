import logging
log = logging.getLogger(__name__)

import os
import json
import importlib

import www


class Manager:

    _conf = {}
    _connections = {}
    _providers = {}
    

    def __init__(self):
        log.debug('Manager::__init__()')

        conf_path = os.path.join(
            os.path.dirname(www.__file__),
            'etc',
            'app',
            'data.json'
        )
        log.debug('using config: ' + conf_path)

        try:
            if (os.path.isfile(conf_path)):
                self._conf = json.loads(open(conf_path, 'r').read())
                log.debug(self._conf)
        except IOError as e:
            log.error(e)
    

    def _create_connection(self, key):
        try:
            conf = self._conf['connections'][key]
            module_name = conf['type']
            log.debug('including: www.core.data.connectros.%s', module_name)
            module = importlib.import_module('.' + module_name, 'www.core.data.connectors')
            return module.create_connection(conf)
        except KeyError:
            msg = 'connection configuration %s is missing' % (key)
            log.error(msg)
            raise RuntimeError(msg)
        except Exception as e:
            log.error(e)
            raise e


    def get_connection(self, key):
        try:
            return self._connections[key]
        except KeyError:
            log.error('connection %s not found. attempting to create', key)
            self._connections[key] = self._create_connection(key)
            return self._connections[key]
        except Exception as e:
            log.error(e)
            raise e

    def _create_data_provider(self, key):
        try:
            conf = self._conf['providers'][key]
            connection_name = conf['connection']
            connection = self.get_connection(connection_name)
            if (connection):
                module_name = conf['module']
                package_name = conf['package']
                log.debug('including: %s.%s', package_name, module_name)
                module = importlib.import_module('.' + module_name, package_name)
                provider = module.create_provider(connection)
                return provider
        except KeyError:
            msg = 'data provider configuration %s is missing' % (key)
            log.error(msg)
            raise RuntimeError(msg)
        except Exception as e:
            log.error(e)
            raise e

    def get_data_provider(self, key):
        try:
            return self._providers[key]
        except KeyError:
            log.error('data provider %s not found. attempting to create', key)
            self._providers[key] = self._create_data_provider(key)
            return self._providers[key]
        except Exception as e:
            log.error(e)
            raise e
