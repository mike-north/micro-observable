import Observable from './observable';
import Subscription from './subscription';

export interface Observer<T> {
  next(val?: T): void;
  error(e?: any): void;
  complete(): void;
}
export interface ErrorObserver<T> {
  next?(val?: T): void;
  error(e?: any): void;
  complete?(): void;
}
export interface NextObserver<T> {
  next(val?: T): void;
  error?(e?: any): void;
  complete?(): void;
}
export interface CompleteObserver<T> {
  next?(val?: T): void;
  error?(e?: any): void;
  complete(): void;
}
export type NextFunction<T> = (val: T) => void;

export type PartialObserver<T> = ErrorObserver<T> | NextObserver<T> | CompleteObserver<T> | NextFunction<T>;

export type Unsubscribe = () => void;
export type Subscribe<T, O extends PartialObserver<T> = Observer<T>> = (obs: O) => Subscription | (() => void) | void;
export type UnaryFunction<T, R> = (source: T) => R;
export interface OperatorFunction<T, R> extends UnaryFunction<Observable<T>, Observable<R>> {}
export interface MonoTypeOperatorFunction<T> extends OperatorFunction<T, T> {}
