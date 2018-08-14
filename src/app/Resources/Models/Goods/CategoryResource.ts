import {StubResource} from "../../StubResource";
import {Injectable} from "@angular/core";
import {Category} from "../../../Models/Category";
import {Observable} from "rxjs/Observable";

@Injectable()
export class  CategoryResource extends StubResource<Category> {
  
  all():Observable<Category[]> {
    return this.mock(1000);
  }

  get(id:number):Observable<Category> {
    return this.mockOne(id, 1000);
  }
}
