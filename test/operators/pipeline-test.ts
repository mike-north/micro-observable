import { Observable, filter, map } from 'micro-observable';
import { suite, test } from 'qunit-decorators';

@suite
export class PipelineTest {
  @test
  itExists(a: Assert) {
    a.ok(filter);
    a.equal(typeof Observable.prototype.pipe, 'function', 'is a function');
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
    let out1 = in1.pipe(map(x => x * 2), filter(y => y % 3 === 0));
    a.emits(out1, [0, 6], 'emits correct values');
  }
}
