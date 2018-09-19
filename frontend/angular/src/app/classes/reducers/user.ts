import { User } from '../user';

export class UserActions {
    public static USER_SIGNED_IN = 'user.signed_in';
    public static USER_SIGNED_OUT = 'user.signed_out';
}

export const user = (state: any = new User('', ''), action) => {
    const payload = action.payload;
    switch (action.type) {
        case UserActions.USER_SIGNED_IN: {
            return Object.assign({}, state, payload);
        }
        case UserActions.USER_SIGNED_OUT: {
            return Object.assign({}, state, payload);
        }
        default: {
            return state;
        }
    }
};
