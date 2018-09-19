create or replace function get_user_by_email (
    p_email security.users.email%type
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
    where u.email = p_email;
end;
$$
language plpgsql;