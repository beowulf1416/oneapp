create or replace function authenticate (
    p_email security.users.email%type,
    p_pw security.users.pw%type
)
returns boolean
as $$
declare
    authentic boolean;
begin
    select
        pw = public.crypt(p_pw, pw)
        into
        authentic
    from security.users
    where email = p_email
        and active = true;

    if authentic then
        update security.users set
            last_signed_ts = now()
        where email = p_email;
    end if;

    return authentic;
end;
$$
language plpgsql;