import { ViewportActionTypes, ViewportActionsUnion } from '../actions/viewport';
import { Viewport } from '../viewport';
import { Point } from '../point';

export interface State {
    viewport: Viewport;
}

export const initialState: State = {
    viewport: new Viewport(
        new Point(0, 0),
        new Point(0, 0)
    )
};

export function reducer(state: State = initialState, action: ViewportActionsUnion): State {
    switch (action.type) {
        case ViewportActionTypes.UPDATE: {
            return { ...state, viewport: action.payload };
        }
        default: {
            console.log(state);
            return state;
        }
    }
}
