create or replace function permission_get (
    p_id security.permissions.id%type
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
    return query
    select
        p.id,
        p.active,
        p.created_ts,
        p.name,
        p.description
    from security.permissions p
    where p.id = p_id;
end;
$$
language plpgsql;