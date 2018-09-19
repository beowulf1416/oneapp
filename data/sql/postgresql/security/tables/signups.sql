create table signups (
    email public.email_address,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    token varchar(200) not null,
    verified_ts timestamp without time zone,
    constraint pk_signups primary key (email)
);