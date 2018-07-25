declare module 'qunit' {
  import { Observable } from 'micro-observable';
  global {
    interface Assert {
      step(message: string): void;
      verifySteps(steps: string[], message?: string): void;
      emits<T>(o: Observable<T>, sequence: T[], message?: string): void;
    }
  }
}