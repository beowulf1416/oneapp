import { Injectable } from '@angular/core';
// import { State } from '../classes/state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { MessageActions, MessageTypes } from '../classes/reducers/messages';

import { State } from '../classes/reducers/messages';
import * as messageActions from '../classes/actions/messages';
import { Message, MessageType } from '../classes/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  public messages$: Observable<Array<Message>>;

  constructor(
    private s: Store<State>
  ) {
    this.messages$ = s.pipe(
      select((state: State) => state.messages)
    );
  }

  generate_id() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(1, 8);
  }

  info(msg: string) {
    // this.s.dispatch({
    //   type: MessageActions.ADD_MESSAGE,
    //   payload: {
    //     id: this.generate_id(),
    //     message: msg,
    //     type: MessageTypes.INFO
    //   }
    // });
    this.s.dispatch(new messageActions.MessageAdd(new Message(
      this.generate_id(),
      msg,
      MessageType.INFO
    )));
  }

  error(msg: string) {
    // this.s.dispatch({
    //   type: MessageActions.ADD_MESSAGE,
    //   payload: {
    //     id: this.generate_id(),
    //     message: msg,
    //     type: MessageTypes.ERROR
    //   }
    // });
    this.s.dispatch(new messageActions.MessageAdd(new Message(
      this.generate_id(),
      msg,
      MessageType.ERROR
    )));
  }

  // add(msg: string, type: MessageTypes) {
  //   this.s.dispatch({
  //     type: MessageActions.ADD_MESSAGE,
  //     payload: {
  //       id: this.generate_id(),
  //       message: msg,
  //       type: type
  //     }
  //   });
  // }

  remove(id: string) {
    // this.s.dispatch({
    //   type: MessageActions.REMOVE_MESSAGE,
    //   payload: {
    //     id: id
    //   }
    // });
    this.s.dispatch(new messageActions.MessageRemove(id));
  }
}
