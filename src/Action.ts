export interface Action<T> {
  type: T;
  [payload: string]: any;
  meta?: any;
  errors?: any;
}