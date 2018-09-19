import logging
log = logging.getLogger(__name__)


def add_routes(config):
    config.add_route(
        name='user_signup',
        pattern='/user/signup'
    )

    config.add_route(
        name='user_token_email',
        pattern='/user/token/email'
    )

    config.add_route(
        name='user_verify_token',
        pattern='/user/verify/token'
    )

    config.add_route(
        name='user_signin',
        pattern='/user/signin'
    )

    config.add_route(
        name='user_signout',
        pattern='/user/signout'
    )

    config.add_route(
        name='user_current',
        pattern='/user/current'
    )

    config.add_route(
        name='user_test',
        pattern='/user/test'
    )


def includeme(config):
    log.debug('included: www.core.security')

    add_routes(config)

    config.scan(__package__)