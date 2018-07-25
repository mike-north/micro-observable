# micro-observable

RxJS6-style observables in less than 1kb, with code taken from RxJS, [toy-rx](https://github.com/staltz/toy-rx) and more.

[![Build Status](https://travis-ci.org/mike-north/micro-observable.svg?branch=master)](https://travis-ci.org/mike-north/micro-observable)
[![Version](https://img.shields.io/npm/v/micro-observable.svg)](http://npmjs.com/package/micro-observable)

## Setup

```sh
npm install -D micro-observable
```

## Use

```ts
import { Observable, map, filter } from 'micro-observable';

let myObs = Observable.create(observer => { // Create an observable
  let x = 0;
  let y = setInterval(() => {
    observer.next(x++); // that emits incrementing values
  }, 1000); // each second
  return function cleanup() {
    clearInterval(y); // and cleans up after its self
  }
}).pipe(
  map(x => x * x), // square each member
  filter(x => x % 3 === 0) // keep only those that are multiples of 3
);

let s = myObs.subscribe(x => {
  console.log(x);
});

setTimeout(() => {
  s.unsubscribe(); // unsubscribe
}, 10000); // after 10s
```

## Is this equivalent to RxJS?

Absolutely not. There are tons of edge and corner cases that this library doesn't aim to handle. `micro-observable` is great for simple producers and consumers, where a full-blown FRP library would be overkill.

---
(c) 2018