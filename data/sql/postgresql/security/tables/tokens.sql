create table tokens (
    user_id bigint not null,
    token text not null,
    constraint pk_tokens primary key (user_id),
    constraint fk_tokens_1 foreign key (user_id) references users(id)
);