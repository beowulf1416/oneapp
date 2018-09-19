import { User } from './user';
import { Session } from './session';
import { Message } from './message';

export interface State {
    session: Session;
    user: User;
    messages: Array<Message>;
}

export const initialState: State = {
    session: new Session('', ''),
    user: new User('', ''),
    messages: new Array<Message>()
};
