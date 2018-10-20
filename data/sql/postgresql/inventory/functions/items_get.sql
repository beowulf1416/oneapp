create or replace function items_get (
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
        '
    );
end;
$$
language plpgsql;