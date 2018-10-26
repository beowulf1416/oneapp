create or replace function items_get (
    sort_col varchar,
    sort_dir varchar,
    pager_rows int,
    pager_offset int
)
returns table (
    id inventory.items.id%type,
    active inventory.items.active%type,
    created inventory.items.created_ts%type,
    name inventory.items.name%type,
    description inventory.items.description%type,
    brand inventory.items.brand%type,
    model inventory.items.model%type,
    upc_ean inventory.items.upc_ean%type,
    sku inventory.items.sku%type,
    perishable inventory.items.perishable%type
)
as $$
begin
    if lower(sort_col) not in ('id','name','description') then
        raise exception 'unknown sort column';
    end if;

    if lower(sort_dir) not in ('asc','desc','ascending','descending') then
        raise exception 'unknown value for sort direction';
    end if;

    return query execute format(
        'select
            a.id,
            a.active,
            a.created_ts,
            a.name,
            a.description,
            a.brand,
            a.model,
            a.upc_ean,
            a.sku,
            a.perishable
        from inventory.items a
        order by %s %s
        limit $1
        offset $2
        ',
        sort_col,
        sort_dir
    ) using pager_rows, pager_offset;
end;
$$
language plpgsql;