import {StubResource} from "../../StubResource";
import {Item} from "../../../Models/Item/Item";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ItemResource extends StubResource<Item> {
  all():Observable<Item[]> {
    return this.mock(1500);
  }

  get(id:number):Observable<Item> {
    return this.mockOne(0, 2500);
  }

  allForCategory(categoryId:number) {
    return this.mock(500);
  }
}
