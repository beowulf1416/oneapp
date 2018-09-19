create or replace function update_signup_token (
    p_email security.signups.email%type,
    p_token security.signups.token%type
)
returns void
as $$
begin
    update security.signups set
        token = p_token
    where email = p_email;
end;
$$
language plpgsql;