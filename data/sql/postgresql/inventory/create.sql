create schema inventory;
set schema 'inventory';

-- tables
\ir tables/items.sql
\ir tables/item_balances.sql

-- functions
\ir functions/items_get.sql
\ir functions/item_add.sql
