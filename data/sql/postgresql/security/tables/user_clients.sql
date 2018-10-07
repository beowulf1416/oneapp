create table user_clients (
    user_id bigint not null,
    client_id bigint not null,
    constraint pk_user_clients primary key (user_id, client_id),
    constraint fk_user_clients_1 foreign key (user_id) references security.users(id) on delete restrict,
    constraint fk_user_clients_2 foreign key (client_id) references clients.clients(id) on delete restrict
);