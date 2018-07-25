import { Unsubscribe } from './types';

export class Subscription {
  constructor(public unsubscribe: Unsubscribe) {}
}
