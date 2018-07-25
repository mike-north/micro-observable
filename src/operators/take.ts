import Observable from '../observable';

export default function take<A>(max: number) {
  return (inn: Observable<A>): Observable<A> => Observable.create<A>(out => {
    let taken = 0;
    return inn.subscribe({
      next(x) {
        taken += 1;
        if (taken < max) {
          out.next(x);
        } else if (taken === max) {
          out.next(x);
          out.complete();
        }
      },
      error(e) {
        out.error(e);
      },
      complete: () => {
        out.complete();
      }
    });
  });
}
