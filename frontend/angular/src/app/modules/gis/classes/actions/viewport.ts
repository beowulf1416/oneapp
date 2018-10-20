import { Action } from '@ngrx/store';
import { Viewport } from '../viewport';

export enum ViewportActionTypes {
    UPDATE = 'viewport.update'
}

export class Update implements Action {
    readonly type = ViewportActionTypes.UPDATE;

    constructor(
        public payload: Viewport
    ) {}
}

export type ViewportActionsUnion = Update;
