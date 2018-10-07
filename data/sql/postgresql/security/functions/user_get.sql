create or replace function user_get (
    p_id security.users.id%type
)
returns table (
    id security.users.id%type,
    active security.users.active%type,
    created security.users.created_ts%type,
    email security.users.email%type
)
as $$
begin
    return query
    select
        u.id,
        u.active,
        u.created_ts,
        u.email
    from security.users u
    where u.id = p_id;
end;
$$
language plpgsql;