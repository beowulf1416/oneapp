create or replace function item_add (
    p_client_id clients.clients.id%type,
    p_name inventory.items.name%type,
    p_desc inventory.items.description%type,
    p_brand inventory.items.brand%type,
    p_model inventory.items.model%type,
    p_upc_ean inventory.items.upc_ean%type,
    p_sku inventory.items.sku%type,
    p_perishable inventory.items.perishable%type
)
returns inventory.items.id%type
as $$
declare
    tmp inventory.items.id%type;
begin
    insert into inventory.items (
        client_id,
        name,
        description,
        brand,
        model,
        upc_ean,
        sku,
        perishable
    ) values (
        p_client_id,
        p_name,
        p_desc,
        p_brand,
        p_model,
        p_upc_ean,
        p_sku,
        p_perishable
    )
    returning currval(pg_get_serial_sequence('inventory.items', 'id')) into tmp;

    return tmp;
end;
$$
language plpgsql;