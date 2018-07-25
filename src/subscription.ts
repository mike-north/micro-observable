import { Unsubscribe } from './types';

export default class Subscription {
  constructor(public unsubscribe: Unsubscribe) {}
}
