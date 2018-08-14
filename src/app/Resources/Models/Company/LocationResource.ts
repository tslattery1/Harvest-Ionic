import {Injectable} from "@angular/core";
import {TokenAwareRemoteResource} from "../../TokenAwareRemoteResource";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LocationResource extends TokenAwareRemoteResource<Location> {
  all():Observable<Location[]> {
    return this.withAuth()
      .perform<Location[]>("GET", "/locations");
  }

  get(id:number):Observable<Location> {
    return this.withAuth()
      .perform<Location>("GET", `/locations/${id}`);
  }
}
