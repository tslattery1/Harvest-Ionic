import {Injectable} from "@angular/core";
import {TokenAwareRemoteResource} from "../../TokenAwareRemoteResource";
import {Customer} from "../../../Models/Customer";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CustomerResource extends TokenAwareRemoteResource<Customer> {
  all():Observable<Customer[]> {
    return this.withAuth()
      .perform<Customer[]>("GET", "/customers");
  }

  get(id:number):Observable<Customer> {
    return this.withAuth()
      .perform<Customer>("GET", `/customers/${id}`);
  }


}
