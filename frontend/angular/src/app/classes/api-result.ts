export class ApiResult {
    constructor(
        public status: boolean,
        public data: any,
        public messages: string[],
        public errors: string[]
    ) {}
}
