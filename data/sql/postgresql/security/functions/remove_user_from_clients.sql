create or replace function remove_user_from_clients (
    p_user_id security.user_clients.user_id%type
)
returns void
as $$
begin
    delete from security.user_clients
    where user_id = p_user_id;
end;
$$
language plpgsql;