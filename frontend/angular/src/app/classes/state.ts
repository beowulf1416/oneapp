// import { User } from './user';
// import { Session } from './session';
// import { Message } from './message';

// export interface State {
//     session: Session;
//     user: User;
//     messages: Array<Message>;
// }

// export const initialState: State = {
//     session: new Session('', ''),
//     user: new User('', ''),
//     messages: new Array<Message>()
// };

import * as fromUser from './reducers/user';
import * as fromMessages from './reducers/messages';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
    user: fromUser.State;
    messages: fromMessages.State;
}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.reducer,
    messages: fromMessages.reducer
};
