/**
 * initialize client data
 */

create or replace function init()
returns void
as $$
declare 
    client_id bigint;
begin
    select clients.client_create('default', 'default client') into client_id;
end;
$$
language plpgsql;

select init();
drop function init;