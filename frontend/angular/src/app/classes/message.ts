import { MessageTypes } from './reducers/messages';

export class Message {
    constructor(
        public id: string,
        public message: string,
        public type: MessageTypes
    ) {}
}
