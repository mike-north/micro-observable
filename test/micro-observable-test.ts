import hello from 'micro-observable';

QUnit.module('micro-observable tests');

QUnit.test('hello', assert => {
  assert.equal(hello(), 'Hello from micro-observable');
});
