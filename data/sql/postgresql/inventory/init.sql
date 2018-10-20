/**
 * initialize inventory data
 */

create or replace function init()
returns void
as $$
declare 
    client_id bigint;
begin
    select c.id into client_id
    from clients.clients c
    where c.id = 1;

    perform inventory.item_add(
        client_id, 
        'test 1', 
        'test 1 description',
        'test 1 brand',
        'test 1 model',
        'upc1',
        'sku1',
        false
    );
    perform inventory.item_add(
        client_id, 
        'test 2', 
        'test 2 description',
        'test 2 brand',
        'test 2 model',
        'upc2',
        'sku2',
        false
    );
    perform inventory.item_add(
        client_id, 
        'test 3', 
        'test 3 description',
        'test 3 brand',
        'test 3 model',
        'upc3',
        'sku3',
        false
    );
end;
$$
language plpgsql;

select init();
drop function init;