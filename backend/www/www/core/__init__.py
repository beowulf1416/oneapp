import logging
log = logging.getLogger(__name__)

# from pyramid.authorization import ACLAuthorizationPolicy
from www.core.common.session import SessionFactory
from www.core.security.authorization_policy import AuthorizationPolicy
from www.core.security.authentication_policy import AuthenticationPolicy
# from pyramid.session import PickleSerializer
import json
from pyramid.renderers import JSON
import datetime

from www.core.data.manager import Manager

def subscribe_new_response(event):
    request = event.request
    if (request.method in ['POST','OPTIONS']):
        response = event.response
        response.headers.update({
            'Access-Control-Allow-Origin': 'https://app.local',
            'Access-Control-Allow-Methods': 'POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
            'Access-Control-Allow-Credentials': 'true'
        })

def get_data(params):
    log.debug('get_data')
    return Manager()

def includeme(config):
    log.debug('included: www.core')

    # config.set_authorization_policy(ACLAuthorizationPolicy())
    manager = get_data(None)
    dp = manager.get_data_provider('authentication')

    settings = config.get_settings()
    cookie_name = settings['app.cookie']

    config.set_session_factory(SessionFactory(
        json,
        cookie_name
    ))
    config.set_authentication_policy(AuthenticationPolicy(dp))
    config.set_authorization_policy(AuthorizationPolicy(dp))
    # config.set_jwt_authentication_policy('thisisasecret')

    # include json datetime renderer
    json_renderer = JSON()
    def datetime_adapter(obj, request):
        return obj.isoformat()
    json_renderer.add_adapter(datetime.datetime, datetime_adapter)
    config.add_renderer('json', json_renderer)

    def add_cors_headers_response_callback(event):
        response = event.response

    config.add_subscriber(
        subscriber='www.core.subscribe_new_response',
        iface='pyramid.events.NewResponse'
    )

    config.add_request_method(
        callable='www.core.get_data',
        name='data',
        reify=True
    )