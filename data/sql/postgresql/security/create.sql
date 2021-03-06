create schema security;
set schema 'security';

-- tables
\ir tables/signups.sql
\ir tables/users.sql
\ir tables/permissions.sql
\ir tables/roles.sql
\ir tables/tokens.sql

\ir tables/user_roles.sql
\ir tables/role_permissions.sql

\ir tables/user_clients.sql

-- functions
\ir functions/add_signup.sql
\ir functions/get_signup_from_email.sql
\ir functions/get_signup_from_token.sql
\ir functions/update_signup_token.sql
/* \ir functions/verify_signup.sql */
\ir functions/update_verify_signup.sql

\ir functions/get_user_by_email.sql
\ir functions/authenticate.sql
\ir functions/update_signin_token.sql
\ir functions/get_user_from_token.sql
\ir functions/is_user_allowed.sql

/* permissions */
\ir functions/permission_create.sql
\ir functions/permission_get.sql
\ir functions/permissions_get.sql

/* roles */
\ir functions/role_create.sql
\ir functions/role_get.sql
\ir functions/roles_get.sql
\ir functions/roles_permissions_get.sql

/* users */
\ir functions/user_create.sql
\ir functions/users_get.sql
\ir functions/user_get.sql
\ir functions/add_user_to_client.sql
\ir functions/remove_user_from_clients.sql
\ir functions/user_get_permissions.sql


\ir functions/add_permission_to_role.sql
\ir functions/add_role_to_user.sql