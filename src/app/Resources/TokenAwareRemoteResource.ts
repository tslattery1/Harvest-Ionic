import {RemoteResource} from "./RemoteResource";
import {Observable} from "rxjs/Observable";
import {CacheService} from "ionic-cache";
import {Config} from "ionic-angular";
import {TokenResource} from "./Models/Auth/TokenResource";
import {HttpClient} from "@angular/common/http";
import { DeviceAuthenticationResource } from "./Models/Auth/DeviceAuthenticationResource";
import { Injectable } from "@angular/core";
import { DeviceAuthenticationError } from "./Models/Auth/Exceptions/DeviceAuthenticationError";
import { UserAuthenticationError } from "./Models/Auth/Exceptions/UserAuthenticationError";

@Injectable()
export class TokenAwareRemoteResource<T> extends RemoteResource<T> {
  private _isAuthRequired:boolean = false;
  private _isDeviceKeyRequired:boolean = false;
  private _isApiRequest:boolean = true;

  constructor(http:HttpClient, cache:CacheService, config:Config,
              protected tokenSvc:TokenResource,
              protected deviceSvc:DeviceAuthenticationResource) {
    super(http, cache, config);
  }

  /**
   * Sets next request as global
   * @param {boolean} value
   * @returns {RemoteResource<T>}
   */
  isApiRequest(value:boolean = true) {
      this._isApiRequest = value;
      return this;
  }

  /**
   * Configure auth politics
   * @param {boolean} value
   * @returns {RemoteResource<T>}
   */
  withAuth(value:boolean = true) {
    this._isAuthRequired = value;
    return this;
  }

  /**
   * Configure auth politics
   * @param {boolean} value
   * @returns {RemoteResource<T>}
   */
  withDeviceKey(value:boolean = true) {
      this._isDeviceKeyRequired = value;
      return this;
  }

  perform<S>(method:string, url:string, data:{[key:string]: any} = {}, headers:{[key:string]: string} = {}): Observable<S> {
    if(this._isApiRequest) {
      url = this.formUrlWith(url);
    }

    if(this._isAuthRequired) {
      this.tokenSvc.isAuthenticated()
        .flatMap(isAuthenticated => {
          if(!isAuthenticated) {
            throw new UserAuthenticationError();
          }

          return this.tokenSvc.getToken();
        })
        .subscribe((token) => {
          if(token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
        })
    } 
    
    if(this._isDeviceKeyRequired) {
      this.deviceSvc.isAuthenticated()
        .flatMap(isAuthenticated => {
          if(!isAuthenticated) {
            throw new DeviceAuthenticationError();
          }

          return this.deviceSvc.getToken();
        })
        .subscribe((token) => {
          if(token) {
            headers["device_key"] = token;
          }
        })
    }

    let observable:Observable<any> = this.blueprint(method, url, data, headers);

    return observable;
  }
}
