export class User {
    constructor(
        public id: string,
        public email: string,
    ) {}

    get is_signed_in(): boolean {
        return this.id !== '';
        // return true;
    }
}
