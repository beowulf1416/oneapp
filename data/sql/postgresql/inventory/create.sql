create schema inventory;
set schema 'inventory';

-- tables
\ir tables/items.sql
\ir tables/item_balances.sql

\ir tables/warehouses.sql

-- functions
\ir functions/items_get.sql
\ir functions/item_add.sql
