import {RemoteResource} from "../../RemoteResource";
import {Token} from "../../../Models/Token";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Config} from "ionic-angular";
import {CacheService} from "ionic-cache";
import {HttpClient} from "@angular/common/http";
import { DeviceAuthenticationResource } from "./DeviceAuthenticationResource";
import { UserAuthenticationError } from "./Exceptions/UserAuthenticationError";

@Injectable()
export class TokenResource extends RemoteResource<Token> {
  constructor(http:HttpClient, cache:CacheService, config:Config,
    private deviceAuthSvc:DeviceAuthenticationResource) 
  {
    super(http, cache, config);
  }

  isAuthenticated():Observable<boolean> {
    return Observable.fromPromise(this.cache.itemExists("user_token"))
      .map(keyExists => {
        return !!keyExists;
      })
  }

  /**
   * Get key helper facade
   * @returns {Observable<Token>}
   */
  getToken():Observable<Token> {
    return this.deviceAuthSvc.isAuthenticated()
      .flatMap(isLinked => {
        if(!isLinked) {
          throw new UserAuthenticationError();
        }

        return this.isKeyValid();
      })
      .flatMap((isValid) => {
        if(!isValid) {
          return this.refreshKey();
        }

        return Observable.fromPromise(this.cache.getItem("user_token"));
      });
  }

  /**
   * Init key refresh sequence
   * @returns {Observable<Token>}
   */
  refreshKey():Observable<Token> {
    return this.deviceAuthSvc.isAuthenticated()
      .flatMap(isLInked => {
        if(!isLInked) {
          throw new UserAuthenticationError();
        }

        return Observable.fromPromise(this.cache.getItem("user_token"));
      })
      .flatMap((token:Token) => {
        return this.perform(
          "POST",
          "auth/refresh",
          {app_key: token.access_token},
          {}
        );
      })
      .map((token:Token) => {
        this.cache.saveItem("user_token", token, "auth", token.expires_in);
        return token;
      });
  }

  /**
   * Checks if token exists and haven't been expired yet
   * @returns {Observable<boolean>}
   */
  isKeyValid():Observable<boolean> {
    // let helper = new JwtHelper();

    return this.deviceAuthSvc.isAuthenticated()
      .flatMap(isAuthenticated => {
        if(isAuthenticated) {
          return Observable.fromPromise(this.cache.itemExists("user_token"));
        }

        return Observable.of(false);
      })
      .flatMap((isAuthenticated) => {
        if(isAuthenticated) {
          return Observable.fromPromise(this.cache.getItem("user_token"));
        }

        return Observable.of(false);
      })
      .map((key:Token) => {
        if(!key) {
          return false;
        }

        // return !helper.isTokenExpired(key.access_token);
        return true;
      });
  }
}
