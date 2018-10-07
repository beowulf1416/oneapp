import { Action } from '@ngrx/store';
import { Message } from '../message';

export enum MessagesActionTypes {
    MESSAGE_ADD = 'message.add',
    MESSAGE_REMOVE = 'message.remove'
}

export class MessageAdd implements Action {
    readonly type = MessagesActionTypes.MESSAGE_ADD;

    constructor(
        public payload: Message
    ) {}
}

export class MessageRemove implements Action {
    readonly type = MessagesActionTypes.MESSAGE_REMOVE;

    constructor(
        public payload: string
    ) {}
}

export type MessagesActionsUnion = MessageAdd | MessageRemove;
