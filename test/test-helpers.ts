import { Observable } from 'micro-observable';

// tslint:disable-next-line:no-namespace
declare global {
  interface Assert {
    emits(...args: any[]): any;
  }
}

QUnit.assert.emits = <T>(o: Observable<T>, sequence: T[], message?: string) => {
  let values: T[] = [];
  let s = o.subscribe(v => {
    values.push(v);
  });
  QUnit.assert.deepEqual(values, sequence, message);
  s.unsubscribe();
};
