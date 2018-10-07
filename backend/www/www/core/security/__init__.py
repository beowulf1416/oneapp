import logging
log = logging.getLogger(__name__)


def add_routes(config):
    config.add_route(
        name='user_signup',
        pattern='/api/user/signup'
    )

    config.add_route(
        name='user_token_email',
        pattern='/api/user/token/email'
    )

    config.add_route(
        name='user_verify_token',
        pattern='/api/user/verify/token'
    )

    config.add_route(
        name='user_signin',
        pattern='/api/user/signin'
    )

    config.add_route(
        name='user_signout',
        pattern='/api/user/signout'
    )

    config.add_route(
        name='user_current',
        pattern='/api/user/current'
    )


def includeme(config):
    log.debug('included: www.core.security')

    add_routes(config)

    config.scan(__package__)