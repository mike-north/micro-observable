// tslint:disable:ban-types
import Observable from './observable';
import { Subscription } from './subscription';
export interface NodeStyleEventEmitter {
  addListener: (eventName: string | symbol, handler: NodeEventHandler) => this;
  removeListener: (eventName: string | symbol, handler: NodeEventHandler) => this;
}

export type NodeEventHandler = (...args: any[]) => void;

// For APIs that implement `addListener` and `removeListener` methods that may
// not use the same arguments or return EventEmitter values
// such as React Native
export interface NodeCompatibleEventEmitter {
  addListener: (eventName: string, handler: NodeEventHandler) => void | {};
  removeListener: (eventName: string, handler: NodeEventHandler) => void | {};
}

export interface JQueryStyleEventEmitter {
  on: (eventName: string, handler: Function) => void;
  off: (eventName: string, handler: Function) => void;
}

export interface HasEventTargetAddRemove<K extends keyof WindowEventMap, E = WindowEventMap[K]> {
  addEventListener(type: K, listener: ((evt: E) => void) | null, options?: boolean | AddEventListenerOptions): void;
  removeEventListener(type: K, listener?: ((evt: E) => void) | null, options?: EventListenerOptions | boolean): void;
}

export type EventTargetLike<K extends keyof WindowEventMap> = HasEventTargetAddRemove<K>;

export default function fromEvent<K extends keyof WindowEventMap, E = WindowEventMap[K]>(eventTarget: EventTargetLike<K>, eventType: K): Observable<WindowEventMap[K]> {
  return Observable.create<WindowEventMap[K]>(function subscribe(observer) {
    eventTarget.addEventListener(eventType, observer.next);
    return new Subscription(function unsubscribe() {
      eventTarget.removeEventListener(eventType, observer.next);
    });
  });
}
