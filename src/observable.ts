import Subscriber from './subscriber';
import Subscription from './subscription';
import { OperatorFunction, PartialObserver, Subscribe } from './types';
import { departializeObserver } from './utils/observer';
import { pipeFromArray } from './utils/pipe';

/**
 * An Observable thing
 *
 * @example
 * ```ts
 *
 * import { Observable } from 'micro-observable';
 * ```
 *
 * @param T type this observable emits
 * @external
 */
export default class Observable<T> {
  /**
   * Create a new observable
   * @param T value type this observable emits
   * @param subscribe initializer
   *
   * @example
   * ```ts
   *
   * // Create an observable
   * const myObs = Observable.create(observer => {
   *   let x = 0;
   *   const y = setInterval(() => {
   *     // that emits incrementing values
   *     observer.next(x++);
   *   }, 1000); // each second
   *   return function cleanup() {
   *     // and cleans up after its self
   *     clearInterval(y);
   *   }
   * });
   * ```
   */
  static create<T>(subscribe: Subscribe<T>) {
    return new Observable<T>(function internalSubscribe(observer: PartialObserver<T>) {
      const subscriber = new Subscriber(departializeObserver(observer));
      const subscription = subscribe(subscriber);
      subscriber.unsubscribe =
        subscription &&
        (typeof subscription === 'function'
          ? subscription.bind(subscription)
          : subscription.unsubscribe.bind(subscription));
      return subscription;
    });
  }
  protected constructor(private subs: Subscribe<T, PartialObserver<T>>) {}

  /**
   * Subscribe to this observable
   *
   * @param obs observer to subscribe to the observable
   * @param O type of observer
   *
   * @example
   *
   * ```ts
   *
   * // Create a subscription
   * const s = myObs.subscribe(x => {
   *  console.log(x);
   * });
   *
   * s.unsubscribe(); // unsubscribe
   * ```
   */
  subscribe<O extends PartialObserver<T>>(obs: O): Subscription {
    let cleanup = this.subs(obs);
    return {
      unsubscribe() {
        if (cleanup) {
          (typeof cleanup === 'function' ? cleanup : cleanup.unsubscribe)();
        }
      }
    };
  }
  /**
   * Create an operator pipeline that operates on this observable
   * @returns a new observable
   * @example
   * ```ts
   *
   * import { map, filter } from 'micr-observable';
   *
   * myObs.pipe(
   *   map(x => x * x), // square each member
   *   filter(x => x % 3 === 0) // keep only multiples of 3
   * ).subscribe(x => {
   *   console.log(x);
   * });;
   * ```
   */
  pipe(): Observable<T>;
  pipe<A>(op1: OperatorFunction<T, A>): Observable<A>;
  pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Observable<B>;
  pipe<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): Observable<C>;
  pipe<A, B, C, D>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>
  ): Observable<D>;
  pipe<A, B, C, D, E>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>
  ): Observable<E>;
  pipe<A, B, C, D, E, F>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>
  ): Observable<F>;
  pipe<A, B, C, D, E, F, G>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>
  ): Observable<G>;
  pipe<A, B, C, D, E, F, G, H>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>,
    op8: OperatorFunction<G, H>
  ): Observable<H>;
  pipe<A, B, C, D, E, F, G, H, I>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>,
    op8: OperatorFunction<G, H>,
    op9: OperatorFunction<H, I>
  ): Observable<I>;
  pipe<R>(...operations: Array<OperatorFunction<any, any>>): Observable<R>;
  pipe<R>(...operations: Array<OperatorFunction<T, R>>): Observable<R> {
    if (operations.length === 0) {
      return this as any;
    }

    return pipeFromArray(operations)(this);
  }
}
