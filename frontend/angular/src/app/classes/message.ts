export enum MessageType {
    ERROR = 'message.error',
    INFO = 'message.info'
}

export class Message {
    constructor(
        public id: string,
        public message: string,
        public type: MessageType
    ) {}
}
