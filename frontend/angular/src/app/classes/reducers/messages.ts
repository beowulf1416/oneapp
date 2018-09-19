import { Message } from '../message';

export class MessageActions {
    public static ADD_MESSAGE = 'messages.add';
    public static REMOVE_MESSAGE = 'messages.remove';
}

export class MessageTypes {
    public static INFO = 'message.info';
    public static ERROR = 'message.error';
}

export const messages = (state: any = new Array<Message>(), action) => {
    const payload = action.payload;
    switch (action.type) {
        case MessageActions.ADD_MESSAGE: {
            const msgs = state;
            msgs.push(payload);
            // return Object.assign({}, state, msgs);
            // console.log(msgs);
            return msgs;
        }
        case MessageActions.REMOVE_MESSAGE: {
            const msgs = state.messages;
            const id = payload.id;
            let copy = {};
            msgs.forEach(element => {
                if (element.id === id) {
                    copy = element;
                }
            });
            msgs.remove(copy);
            return Object.assign({}, state, { messages: msgs });
        }
        default: {
            return state;
        }
    }
};
