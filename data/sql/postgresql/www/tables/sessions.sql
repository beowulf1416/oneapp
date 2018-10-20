create table sessions (
    id varchar(100),
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    user_id bigint not null,
    constraint pk_sessions primary key (id),
    constraint fk_session_1 foreign key (user_id) references security.users(id) on delete restrict
);