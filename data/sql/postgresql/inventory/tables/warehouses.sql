create table warehouses (
    id bigserial,
    active boolean not null default true,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id bigint not null,
    name varchar(100) not null,
    constraint pk_warehouses primary key (id),
    constraint u_warehouses_1 unique (client_id, name),
    constraint fk_warehouses_1 foreign key (client_id) references clients.clients(id) on delete restrict on update restrict
);