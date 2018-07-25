import { Subscription } from './subscription';
import { Observer } from './types';

export default class Subscriber<T> extends Subscription {
  constructor(private observer: Observer<T>) {
    // tslint:disable-next-line:no-empty
    super(function unsubscribe() { });
  }

  next(x: T) {
    this.observer.next(x);
  }

  error(e: any) {
    this.observer.error(e);
    this.unsubscribe();
  }

  complete() {
    this.observer.complete();
    this.unsubscribe();
  }
}
