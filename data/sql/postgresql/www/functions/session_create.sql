create or replace function session_create (
    p_session_id www.sessions.id%type,
    p_user_id www.sessions.user_id%type
)
returns void
as $$
begin
    insert into www.sessions (
        id,
        user_id
    ) values (
        p_session_id,
        p_user_id
    );
end;
$$
language plpgsql;