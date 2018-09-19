create table users (
    id bigserial,
    active boolean not null default true,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    email public.email_address,
    pw text not null,
    last_signed_ts timestamp without time zone,
    constraint pk_users primary key (id),
    constraint u_users_1 unique (email)
);