import { Subject } from 'rxjs';

export class DialogRef {
  constructor() {}
  private readonly _afterClosed = new Subject<any>();
  public afterClosed = this._afterClosed.asObservable();
  public close(result?: any) {
    this._afterClosed.next(result);
  }
}
