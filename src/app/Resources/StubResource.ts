import {Observable} from "rxjs/Observable";
import {IResource} from "./IResource";

export class StubResource<T> implements IResource<T> {
  protected stubs:T[] = [];
  protected isAuthRequired:boolean = false;

  protected applyToken() {
    console.log("Here should be auth called but it was ignored as stub mode is enabled");
}

  mockOne(id:number, delay:number = 500):Observable<T> {
    if(!this.stubs) {
      throw new Error("You should define stubs property to mock");
    }

    if(!this.stubs[id]) {
      throw new Error("Row not found");
    }

    if(this.isAuthRequired) {
      this.applyToken();
    }

    return Observable.of(this.stubs[id])
      .delay(delay);
  }

  mock(delay:number = 500):Observable<T[]> {
    if(!this.stubs) {
      throw new Error("You should define stubs property to mock");
    }

    if(this.isAuthRequired) {
      this.applyToken();
    }

    return Observable.of(this.stubs)
      .delay(delay);
  }

  withAuth() {
    this.isAuthRequired = true;
    return this;
  }

  perform(method: string, url: string): Observable<T> {
    return this.mockOne(Math.random());
  }
}
