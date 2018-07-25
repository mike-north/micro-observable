import { Observable } from 'micro-observable';

QUnit.assert.emits = <T>(o: Observable<T>, sequence: T[], message?: string) => {
  let values: T[] = [];
  let s = o.subscribe(v => {
    values.push(v);
  });
  QUnit.assert.deepEqual(values, sequence, message);
  s.unsubscribe();
};
