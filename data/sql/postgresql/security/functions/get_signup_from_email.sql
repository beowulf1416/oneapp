create or replace function get_signup_from_email (
    p_email security.signups.email%type
)
returns table (
    email security.signups.email%type,
    token security.signups.token%type,
    created_ts security.signups.created_ts%type,
    verified_ts security.signups.verified_ts%type
)
as $$
begin
    return query
    select
        s.email,
        s.token,
        s.created_ts,
        s.verified_ts
    from security.signups s
    where s.email = p_email;
end;
$$
language plpgsql;