create or replace function is_user_allowed (
    p_user_id security.users.id%type,
    p_permission security.permissions.name%type
)
returns boolean
as $$
declare
    tmp int;
begin
    select
        count(*) into tmp
    from security.users u
        inner join security.user_roles ur on u.id = ur.user_id
        inner join security.roles r on ur.role_id = r.id
        inner join security.role_permissions rp on r.id = rp.role_id
        inner join security.permissions p on rp.permission_id = p.id
    where u.id = p_user_id
        and p.name = p_permission
        and u.active = true
        and r.active = true
        and p.active = true;

    return tmp > 0;
end;
$$
language plpgsql;