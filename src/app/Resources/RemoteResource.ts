import {CacheService} from "ionic-cache";
import {IResource} from "./IResource";
import {Observable} from "rxjs/Observable";
import {Config} from "ionic-angular";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

type ObserveOnType = 'body' | 'events' | 'response';

@Injectable()
export abstract class RemoteResource<T> implements IResource<T> {
  protected _isCacheEnabled:boolean = false;
  protected _isRetryEnabled:boolean = false;
  protected _cacheTtl:number = 60;
  protected _retryCount:number = 5;
  protected _retryDelay:number = 1500;

  constructor(protected http:HttpClient, protected cache:CacheService, protected config:Config) {
    this.cache.setDefaultTTL(3600);
    this.cache.setOfflineInvalidate(false);
    this.cache.clearExpired();
  }

  /**
   * Makes a merged url with config params and provided relative path
   * @param {string} relativePath
   * @returns {string}
   */
  protected formUrlWith(relativePath:string) {
    let url = "";

    if(this.config.get('apiProtocol')) {
      url += this.config.get('apiProtocol') + "://";
    }

    url += this.config.get('apiUrl');

    if(this.config.get('apiPort')) {
      url += `:${this.config.get('apiPort')}`;
    }

    if(relativePath.charAt(0) == "/") {
      relativePath = relativePath.slice(1, relativePath.length);
    }

    url += `/${relativePath}`;

    return url;
  }

  /**
   * Mocks a native request observable
   * @param {string} method
   * @param {string} url
   * @param {Object.<string, any>} data
   * @param {Object.<string, string>} headers
   * @returns {Observable<HttpResponse<T>>}
   */
   protected blueprint(method:string = "", url:string = "", data:{[key:string]: any} = {}, headers:{[key:string]: string}, observe:ObserveOnType = "body"):Observable<Object> {
    // let promise:Promise<HttpResponse<T>> = [method.toLocaleLowerCase()].call();
    let observable:Observable<Object>, 
      params: Object = {
        headers: headers,
        observe: observe
      };

    switch(method.toLowerCase()) {
      case "get":
        params["params"] = data;
        observable = this.http.get(url, params);
        break;

      case "post":
        observable = this.http.post(url, data, params);
        break;

      case "delete":
        params["params"] = data;
        observable = this.http.delete(url, params);
        break;

      case "put":
        observable = this.http.put(url, data, params);
        break;
    }

    observable.retryWhen((error) => {
        if(this._isRetryEnabled) {
          error.scan(
            ( count, err ) => {
              if( count < this._retryCount ) {
                return error.delay(this._retryDelay);
              }
            },
            0
          );
        }

        throw error;
      })
      .map((data:T) => {
        return data;
      });

    // if(this.isCacheEnabled) {
    //   let key = `${method}_${url}`.replace("/", "_");
    //   return this.cache.loadFromObservable(key, observable, self.name, this.cacheTtl);
    // }

    return observable;
  }

  /**
   * Configure retry politics
   * @param {boolean} value
   * @param {number} amount
   * @param {number} delay
   * @returns {RemoteResource<T>}
   */
  withRetry(value:boolean, amount:number = null, delay:number = null) {
    this._isRetryEnabled = value;

    if(this._isRetryEnabled) {
      if(amount && amount > 0) {
        this._retryCount = amount;
      }

      if(delay && delay > 0) {
        this._retryDelay = delay;
      }
    }

    return this;
  }

  /**
   * Configure cache politics
   * @param {boolean} value
   * @param {number} ttl
   * @returns {RemoteResource<T>}
   */
  withCacheEnabled(value: boolean = true, ttl:number = 60) {
    this._isCacheEnabled = value;
    this._cacheTtl = (this._isCacheEnabled) ? ttl : 0;
    return this;
  }

  /**
   * Send a request
   * @param {string} method
   * @param {string} url
   * @param {Object.<string, any>} data
   * @param {Object.<string, string>} headers
   * @returns {Observable<T>}
   */
  perform(method:string, url:string, data:{[key:string]: any} = {}, headers:{[key:string]: string} = {}): Observable<T> {
    headers["X-Requested-With"] = "harvest_tablet_app";

    let observable = this.blueprint(method, this.formUrlWith(url), data, headers);

    if(this._isCacheEnabled) {
      return this.cache.loadFromObservable(
        `${method}_${url.replace("/", "_")}`,
        observable,
        "request",
        this._cacheTtl || 60
      );
    }

    return observable.map((data:T) => {
        return data;
      });
  }
}
