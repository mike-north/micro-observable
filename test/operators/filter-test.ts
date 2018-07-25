import { Observable, filter } from 'micro-observable';
import { suite, test } from 'qunit-decorators';
import '../test-helpers';
@suite
export class FilterTests {
  @test
  itExists(a: Assert) {
    a.ok(filter);
    a.equal(typeof filter, 'function', 'is a function');
  }
  @test
  isAnOperator(a: Assert) {
    let in1 = Observable.create<number>(s => {
      s.next(0);
      s.next(1);
      s.next(2);
      s.next(3);
      s.next(4);
      s.next(5);
    });
    a.equal(typeof filter, 'function', 'is a function');
    let op = filter<number>(x => x % 2 === 0);
    a.equal(typeof op, 'function', 'returns a function');
    a.equal(op.length, 1, 'arity of 1');
    let out1 = op(in1);
    a.equal(typeof out1, 'object', 'operator returns an object');
    a.equal(typeof out1.subscribe, 'function', 'operator returns an observable');
    a.equal(typeof out1.pipe, 'function', 'operator returns an observable');
    a.emits(out1, [0, 2, 4], 'emits values to subscribers');
  }
}
