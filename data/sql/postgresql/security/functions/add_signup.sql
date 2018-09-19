create or replace function add_signup (
    p_email security.signups.email%type,
    p_token security.signups.token%type
)
returns void
as $$
begin
    insert into security.signups (
        email,
        token
    ) values (
        p_email,
        p_token
    );
end;
$$
language plpgsql;