create or replace function user_create (
    p_email security.users.email%type,
    p_pw security.users.pw%type
)
returns security.users.id%type
as $$
declare
    tmp security.users.id%type;
begin
    insert into security.users (
        email,
        pw
    ) values (
        p_email,
        public.crypt(p_pw, public.gen_salt('md5'))
    )
    returning currval(pg_get_serial_sequence('security.users', 'id')) into tmp;

    return tmp;
end;
$$
language plpgsql;