create or replace function update_signin_token (
    p_user_id security.tokens.user_id%type,
    p_token security.tokens.token%type
)
returns void
as $$
begin
    insert into security.tokens (
        user_id,
        token
    ) values (
        p_user_id,
        p_token
    )
    on conflict (user_id) do update set
        token = p_token
    where security.tokens.user_id = p_user_id; 
end;
$$
language plpgsql;