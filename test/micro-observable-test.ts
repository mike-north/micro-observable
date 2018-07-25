import { Observable } from 'micro-observable';
import { suite, test } from 'qunit-decorators';

@suite('micro-observable tests')
export class PublicApiTests {

  @test('public API')
  observableExport(assert: Assert) {
    assert.ok(Observable, 'Observable named export exists');
  }

  @test('sequence')
  sequence(assert: Assert) {
    let o = Observable.create<string>(s => {
      s.next('1');
      s.next('2');
      s.next('3');
    });
    o.subscribe(x => {
      assert.step(x);
    });
    assert.verifySteps(['1', '2', '3']);
  }
}
