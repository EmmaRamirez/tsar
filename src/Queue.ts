export interface Queue<T> {
  list: T[];
  size: number;
}

export class Queue<T> implements Queue<T> {
  constructor(public list: T[], public size: number = Infinity) {
    this.list = list;
    this.size = size;
  }

  public enqueu(item: T):void {
    if (this.full()) {
      throw new Error('Queue is full.');
    }
    this.list.push(item);
  }

  public dequeue():T | undefined {
    const dequeued = this.list.shift();
    return dequeued;
  }

  public empty():boolean {
    return this.list.length > 0 ? false : true;
  }

  public full():boolean {
    return this.list.length > this.size ? true : false;
  }
}