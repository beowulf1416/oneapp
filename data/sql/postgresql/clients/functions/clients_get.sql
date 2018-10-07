create or replace function clients_get (
    p_order varchar,
    p_direction varchar,
    p_items int,
    p_offset int
)
returns table (
    id clients.clients.id%type,
    active clients.clients.active%type,
    created clients.clients.created_ts%type,
    name clients.clients.name%type,
    description clients.clients.description%type
)
as $$
begin
    if lower(p_direction) not in ('asc','desc','ascending','descending') then
        raise exception 'unknown value for direction.';
    end if;

    return query execute format(
    'select
        c.id,
        c.active,
        c.created_ts,
        c.name,
        c.description
    from clients.clients c
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