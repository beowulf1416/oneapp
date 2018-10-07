create or replace function users_get (
    p_order varchar,
    p_direction varchar,
    p_items int,
    p_offset int
)
returns table (
    id security.users.id%type,
    active security.users.active%type,
    created security.users.created_ts%type,
    email security.users.email%type
)
as $$
begin
    if lower(p_direction) not in ('asc','desc','ascending','descending') then
        raise exception 'unknown value for direction.';
    end if;

    return query execute format(
    'select
        u.id,
        u.active,
        u.created_ts,
        u.email
    from security.users u
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