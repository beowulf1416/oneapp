create or replace function role_get (
    p_id security.permissions.id%type
)
returns table (
    id security.roles.id%type,
    active security.roles.active%type,
    created security.roles.created_ts%type,
    name security.roles.name%type,
    description security.roles.description%type
)
as $$
begin
    return query
    select
        r.id,
        r.active,
        r.created_ts,
        r.name,
        r.description
    from security.roles r
    where r.id = p_id;
end;
$$
language plpgsql;