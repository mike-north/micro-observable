import { Observer, PartialObserver } from '../types';
import { NOOP } from './constants';

/**
 * @hidden
 */
export function departializeObserver<T>(pobs: PartialObserver<T>): Observer<T> {
  let po = typeof pobs === 'function' ? { next: pobs } : pobs;
  return {
    complete: po.complete || NOOP,
    next: po.next || NOOP,
    error: po.error || NOOP
  };
}
