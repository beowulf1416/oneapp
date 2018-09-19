create or replace function get_user_from_token (
    p_token security.tokens.token%type
)
returns table (
    id security.users.id%type,
    active security.users.active%type,
    created_ts security.users.created_ts%type,
    email security.users.email%type,
    last_signed_ts security.users.last_signed_ts%type
)
as $$
begin
    return query
    select
        u.id,
        u.active,
        u.created_ts,
        u.email,
        u.last_signed_ts
    from security.users u
    where u.id in (
        select
            t.user_id
        from security.tokens t
        where t.token = p_token
    );
end;
$$
language plpgsql;