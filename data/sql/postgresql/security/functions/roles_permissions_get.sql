create or replace function roles_permissions_get (
    p_role_id security.roles.id%type
)
returns table (
    id security.permissions.id%type,
    active security.permissions.active%type,
    created security.permissions.created_ts%type,
    name security.permissions.name%type,
    description security.permissions.description%type
)
as $$
begin
    return query select
        a.id,
        a.active,
        a.created_ts,
        a.name,
        a.description
    from security.permissions a
        inner join security.role_permissions b on a.id = b.permission_id
    where b.role_id = p_role_id;
end;
$$
language plpgsql;