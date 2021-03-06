import { URLS } from '../../../classes/urls';

export class ModuleURLS {
    // public static base = 'https://api.app.local';
    // public static base = 'https://app.local/api';

    public static api_sign_up = URLS.base + '/user/signup';
    public static api_email_from_token = URLS.base + '/user/token/email';
    public static api_verify_token = URLS.base + '/user/verify/token';
}
