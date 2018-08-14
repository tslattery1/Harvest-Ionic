import {Observable} from "rxjs/Observable";

export interface IResource<T> {
  perform(method:string, url:string):Observable<T>
}
