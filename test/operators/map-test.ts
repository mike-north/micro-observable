import { Observable, map } from 'micro-observable';
import { suite, test } from 'qunit-decorators';

@suite
export class MapTests {
  @test
  itExists(a: Assert) {
    a.ok(map);
    a.equal(typeof map, 'function', 'is a function');
  }
  @test
  isAnOperator(a: Assert) {
    let in1 = Observable.create<number>(s => {
      s.next(44);
    });
    a.equal(typeof map, 'function', 'is a function');
    let op = map<number, string>(x => `${x}`);
    a.equal(typeof op, 'function', 'returns a function');
    a.equal(op.length, 1, 'arity of 1');
    let out1 = op(in1);
    a.equal(typeof out1, 'object', 'operator returns an object');
    a.equal(typeof out1.subscribe, 'function', 'operator returns an observable');
    a.equal(typeof out1.pipe, 'function', 'operator returns an observable');
    a.emits(out1, ['44'], 'emits values to subscribers');
  }
}
