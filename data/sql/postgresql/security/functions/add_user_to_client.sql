create or replace function add_user_to_client (
    p_user_id security.user_clients.user_id%type,
    p_client_id security.user_clients.client_id%type
)
returns void
as $$
begin
    insert into security.user_clients (
        user_id,
        client_id
    ) values (
        p_user_id,
        p_client_id
    );
exception
    when unique_violation then
        -- do nothing
end;
$$
language plpgsql;