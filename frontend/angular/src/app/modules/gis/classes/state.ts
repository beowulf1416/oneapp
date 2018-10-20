import * as fromViewport from './reducers/viewport';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
    viewport: fromViewport.State;
}

export const reducers: ActionReducerMap<State> = {
    viewport: fromViewport.reducer
};

export class State {
}
