create or replace function role_create (
    p_name security.roles.name%type,
    p_description security.roles.description%type
)
returns security.roles.id%type
as $$
declare
    tmp security.roles.id%type;
begin
    insert into security.roles (
        name,
        description
    ) values (
        p_name,
        p_description
    )
    returning currval(pg_get_serial_sequence('security.roles', 'id')) into tmp;

    return tmp;
end;
$$
language plpgsql;