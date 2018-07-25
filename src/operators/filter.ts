import { Observable } from '../observable';

export function filter<A>(conditionFn: (val: A) => boolean) {
  return (inn: Observable<A>): Observable<A> => {
    const out = Observable.create<A>(function subscribe(out) {
      const inObserver = {
        next: (x: A) => {
          let passed;
          try {
            passed = conditionFn(x);
          } catch (e) {
            out.error(e);
            return;
          }
          if (passed) {
            out.next(x);
          }
        },
        error: (e: any) => {
          out.error(e);
        },
        complete: () => {
          out.complete();
        }
      };
      return inn.subscribe(inObserver);
    });
    return out;
  };
}
