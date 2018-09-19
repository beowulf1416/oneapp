from pyramid.view import view_config

@view_config(
    route_name='home',
    renderer='www.core:templates/index.html.jinja2'
)
def view_home(request):
    return {}