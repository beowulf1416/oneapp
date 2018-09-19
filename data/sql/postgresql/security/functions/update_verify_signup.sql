create or replace function update_verify_signup (
    p_token security.signups.token%type,
    p_pw security.users.pw%type
)
returns security.users.id%type
as $$
declare
    tmp security.users.id%type;
    p_email security.users.email%type := 'email@email.com';
begin
    update security.signups set
        verified_ts = now()
    where token = p_token
        and verified_ts is null;
    if not found then
        raise exception 'Token is already verified. Cannot reuse token.';
    end if;

    select
        s.email
        into
        p_email
    from security.signups s
    where s.token = p_token
        and s.verified_ts is not null;

    begin
        insert into security.users (
            email,
            pw
        ) values (
            p_email,
            public.crypt(p_pw, public.gen_salt('md5'))
        )
        returning currval(pg_get_serial_sequence('security.users', 'id')) into tmp;
    exception
        when unique_violation then
            raise exception 'Email address % already exists.', p_email;
    end;

    return tmp;
end;
$$
language plpgsql;