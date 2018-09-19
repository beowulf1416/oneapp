create or replace function is_user_allowed(
    p_token security.tokens.token%type,
    p_permission security.permissions.name%type
)
returns boolean
as $$
declare
    tmp boolean;
begin
    select
        true
        into
        tmp
    from security.permissions p
        inner join security.role_permissions rp on p.id = rp.permission_id
        inner join security.user_roles ur on rp.role_id = ur.role_id
    where
        ur.user_id = (
            select
                t.user_id
            from security.tokens t
            where t.token = p_token
        )
        and p.name = p_permission;

    return tmp;
end;
$$
language plpgsql;