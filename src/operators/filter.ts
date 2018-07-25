import Observable from '../observable';

export default function filter<A>(conditionFn: (val: A) => boolean) {
  return (inn: Observable<A>): Observable<A> => {
    return Observable.create<A>(function subscribe(o) {
      const inObserver = {
        next: (x: A) => {
          let passed;
          try {
            passed = conditionFn(x);
          } catch (e) {
            o.error(e);
            return;
          }
          if (passed) {
            o.next(x);
          }
        },
        error: (e: any) => {
          o.error(e);
        },
        complete: () => {
          o.complete();
        }
      };
      return inn.subscribe(inObserver);
    });
  };
}
