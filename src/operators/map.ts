import Observable from '../observable';

export default function map<A, B>(transformFn: (val: A) => B) {
  return (inn: Observable<A>): Observable<B> => {
    const out = Observable.create<B>(function subscribe(outObserver) {
      const inObserver = {
        next: (x: A) => {
          let y;
          try {
            y = transformFn(x);
          } catch (e) {
            outObserver.error(e);
            return;
          }
          outObserver.next(y);
        },
        error: (e: any) => {
          outObserver.error(e);
        },
        complete: () => {
          outObserver.complete();
        }
      };
      return inn.subscribe(inObserver);
    });
    return out;
  };
}
