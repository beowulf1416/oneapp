import { URLS } from '../../../classes/urls';

export class ModuleURLS {
    // public static base = 'https://api.app.local';
    // public static base = 'https://app.local/api';

    public static api_admin_security_permissions = URLS.base + '/admin/security/permissions/all';
    public static api_admin_security_permissions_create = URLS.base + '/admin/security/permissions/create';
    public static api_admin_security_permissions_get = URLS.base + '/admin/security/permissions/get';

    public static api_admin_security_roles = URLS.base + '/admin/security/roles/all';
    public static api_admin_security_roles_create = URLS.base + '/admin/security/roles/create';
    public static api_admin_security_roles_get = URLS.base + '/admin/security/roles/get';

    public static api_admin_security_users = URLS.base + '/admin/security/users/all';
    public static api_admin_security_users_get = URLS.base + '/admin/security/users/get';
    public static api_admin_security_users_create = URLS.base + '/admin/security/users/create';
}
