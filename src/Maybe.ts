type Just<T> = (val: T) => T;
type Nothing = () => void;

const Nothing = () => { };
Nothing.prototype.isJust = () => false;
Nothing.prototype.isNothing = () => true;

const Just = (val: any) => {
  this.val = val;
  return this;
};
Just.prototype.isJust = () => true;
Just.prototype.isNothing = () => false;

interface Maybe<T> {
  val: T;
  _evaluate: () => Nothing | Just<T>;
}

class Maybe<T> implements Maybe<T> {
  constructor(val: T) {
    if (val instanceof Maybe) return val;
    if (this instanceof Maybe) {
      this.val = val;
    } else {
      return new Maybe<T>(val);
    }
  }

  public evaluate():Nothing | Just<T> {
    const value = typeof this.val === 'function' ?  (this as any).val() : this.val;

    return (value === undefined || value === null)
      ? value
      : value instanceof Nothing || value instanceof Just
        ? Nothing()
        : Just(value);
  }

  public value():Nothing | Just<T> | T {
    const maybe = this.evaluate();
    if (maybe instanceof Nothing) {
      return maybe;
    } else if (maybe instanceof Just) {
      return (maybe as any).value;
    } else {
      return maybe;
    }
  }

  public memoize() {
    this._evaluate = this.evaluate;
    this.evaluate = function () {
      return this.memoVal || (this.memoVal = this._evaluate());
    }.bind(this);
  }

  public isJust():boolean {
    return (this.evaluate() as any).isJust();
  }

  public isNothing():boolean {
    return (this.evaluate() as any).isNothing();
  }
}