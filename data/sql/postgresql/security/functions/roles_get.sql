create or replace function roles_get (
    p_order varchar,
    p_direction varchar,
    p_items int,
    p_offset int
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
    if lower(p_direction) not in ('asc','desc','ascending','descending') then
        raise exception 'unknown value for direction.';
    end if;

    return query execute format(
    'select
        r.id,
        r.active,
        r.created_ts,
        r.name,
        r.description
    from security.roles r
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