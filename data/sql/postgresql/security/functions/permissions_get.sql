create or replace function permissions_get (
    p_order varchar,
    p_direction varchar,
    p_items int,
    p_offset int
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
    if lower(p_direction) not in ('asc','desc','ascending','descending') then
        raise exception 'unknown value for direction.';
    end if;

    return query execute format(
    'select
        p.id,
        p.active,
        p.created_ts,
        p.name,
        p.description
    from security.permissions p
    order by %s %s
    limit $3
    offset $4'
    ,
    p_order,
    p_direction
    )
    using p_order, p_direction, p_items, p_offset;
end;
$$
language plpgsql;