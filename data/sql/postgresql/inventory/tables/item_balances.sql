create table item_balances (
    item_id bigint not null,
    balance numeric(12,6) not null,
    constraint fk_item_balances_1 foreign key (item_id) references items(id) on delete restrict on update restrict
);