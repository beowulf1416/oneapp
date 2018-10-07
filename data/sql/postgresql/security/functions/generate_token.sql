create or replace function generate_token (
    p_len integer
)
returns varchar
as $$
declare
    tmp varchar(100);
begin
    select
        string_agg(
            substr(characters, (random()*length(characters)+1)::integer, 1)
        , '')
        into
        tmp
    from (values('abcdefghijklmnopqrstuvwxyz1234567890')) as symbols(characters)
    join generate_series(, p_len) on 1 = 1;

    return tmp;
end;
$$
language plpgsql;