import { Session } from '../session';

export const session = (state:any = new Session('', ''), action) => {
    const payload = action.payload;
    return state;
};
