export class User {
    constructor(
        public email: string,
        public authenticated: boolean,
        public permissions: Array<string>
    ) {}

    get is_signed_in(): boolean {
        // console.log('authenticated', this.authenticated);
        return this.authenticated;
        // return true;
    }

    public has_permission(permission: string): boolean {
        // console.log('has_permission', this.permissions);
        // console.log('has_permission', this.permissions.indexOf(permission));
        return this.permissions.indexOf(permission) !== -1;
    }
}
