import {Injectable} from "@angular/core";
import { Observable } from "rxjs";
import {User} from "../../../Models/User";
import {TokenAwareRemoteResource} from "../../TokenAwareRemoteResource";
import { Md5 } from 'ts-md5';
import { Location } from "../../../Models/Location";
import { HttpResponse } from "@angular/common/http";

@Injectable()
export class UserResource extends TokenAwareRemoteResource<User> {
  all():Observable<User[]> {
    return this.withDeviceKey()
      .perform<User[]>("GET", "/authenticated/users");
  }

  logout() {
    return Observable.fromPromise(this.cache.itemExists("user_token"))
      .map(exists => {
        if(exists) {
          this.cache.removeItem("user_token"), 
          this.cache.removeItem("user")
        }

        return true;
      });
  }

  authenticate(user:User, pin:string) {
    let hash = new Md5().start();

    hash.appendStr(pin);

    return this.deviceSvc.getActiveLocation()
      .flatMap((device:Location) => {
        if(device) {
          hash.appendStr(device.address_id.toString());

          return this.deviceSvc.getToken();
        }

        return Observable.of(null);
      })
      .flatMap(token => {
        return this.withCacheEnabled(false)
          .blueprint(
            "POST",
            this.formUrlWith("/authenticated/user"),
            {
              "user_id": user.id,
              "user_pin_hashed": hash.end()
            },
            {
              device_key: token
            },
            "response"
          );
      })
      .map((response:HttpResponse<User>) => {
        if(response.ok) {
          this.cache.saveItem("user", response.body, "auth", 3600);
          this.cache.saveItem("user_token", "user jwt token string", "auth", 3600);
          // this.cache.saveItem("user_token", response.headers.get("Authorization"));
        }

        return response.ok;
      });
  }

  getActive():Observable<User> {
    return this.withAuth()
      .perform("GET", "/authenticated/user");
  }
}
