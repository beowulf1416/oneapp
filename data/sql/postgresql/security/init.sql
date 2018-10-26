/**
 * initialize security data
 */

create or replace function init()
returns void
as $$
declare
    client_id bigint := 1;
    user_id bigint;
    role_id bigint;
    permission_id bigint;
begin
    select
        security.role_create('admin', 'default administrative role')
        into
        role_id;

    -- users
    select
        security.permission_create('security.users.list', 'list all users')
        into
        permission_id;
    perform security.add_permission_to_role(permission_id, role_id);

    select
        security.permission_create('security.users.create', 'create user account')
        into
        permission_id;
    perform security.add_permission_to_role(permission_id, role_id);

    select
        security.permission_create('security.users.view', 'view user account')
        into
        permission_id;
    perform security.add_permission_to_role(permission_id, role_id);

    -- permissions
    select
        security.permission_create('security.permissions.list', 'list all permissions')
        into
        permission_id;
    perform security.add_permission_to_role(permission_id, role_id);

    select
        security.permission_create('security.permissions.create', 'create permission')
        into
        permission_id;
    perform security.add_permission_to_role(permission_id, role_id);

    select
        security.permission_create('security.permissions.view', 'view permission')
        into
        permission_id;
    perform security.add_permission_to_role(permission_id, role_id);

    -- roles
    select
        security.permission_create('security.roles.list', 'list all roles')
        into
        permission_id;
    perform security.add_permission_to_role(permission_id, role_id);

    select
        security.permission_create('security.roles.create', 'create role')
        into
        permission_id;
    perform security.add_permission_to_role(permission_id, role_id);

    select
        security.permission_create('security.roles.view', 'view role')
        into
        permission_id;
    perform security.add_permission_to_role(permission_id, role_id);

    select
        security.permission_create('security.roles.permissions', 'view permissions assigned to role')
        into
        permission_id;
    perform security.add_permission_to_role(permission_id, role_id);



    select
        security.user_create('admin@test.com','testing')
        into
        user_id;
    perform security.add_role_to_user(role_id, user_id);

    
end;
$$
language plpgsql;

select init();
drop function init;