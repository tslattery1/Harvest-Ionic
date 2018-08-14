import { Observable } from "rxjs/Observable";
import { RemoteResource } from "../../RemoteResource";
import { DeviceIsAuthenticatedError } from "./Exceptions/DeviceIsAuthenticatedError";
import { DeviceAuthenticationError } from "./Exceptions/DeviceAuthenticationError";
import { Location } from "../../../Models/Location";

export class DeviceAuthenticationResource extends RemoteResource<Object> {
    /**
     * Forces a device to run a complete server auth verification
     * @returns {Observable<boolean>}
     */
    private forceAuthenticationCheck():Observable<boolean> {
        return Observable.fromPromise(this.cache.itemExists("device_key"))
            .flatMap(isAuthenticated => {
                if(isAuthenticated) {
                    return Observable.fromPromise(this.cache.getItem("device_key"));
                }

                return Observable.of(null);
            })
            .flatMap((deviceKey:string) => {
                if(deviceKey) {
                    return this.perform("GET", "authenticated/location", {}, {"device_key": deviceKey});
                }

                return Observable.of(null);
            })
            .map((location:Location) => {
                if(location) {
                    this.cache.saveItem("device_key_checked", true, "auth", 1800);
                    return true;
                }

                return false;
            });
    }

    /**
     * Mild device auth check
     * @returns {Observable<boolean>}
     */
    isAuthenticated(force:boolean = false):Observable<boolean> {
        if(force) {
            return this.forceAuthenticationCheck();
        }

        return Observable.fromPromise(this.cache.itemExists("device_key_checked"))
            .flatMap((keyWasChecked) => {
                if(keyWasChecked) {
                    return Observable.of(true);
                }

                return this.forceAuthenticationCheck();
            })
            .map(isAuthenticated => {
                return isAuthenticated;
            })
    }

    /**
     * Loads current authenticated location
     * @returns {Observable<Location>}
     */
    getActiveLocation():Observable<Location> {
        return this.getToken()
            .flatMap(token => {
                if(token) {
                    return this.perform("GET", "/authenticated/location", {}, {device_key: token});
                }

                return Observable.of(null);
            });
    }

    /**
     * Loads current authenticated location
     * @returns {Observable<string>}
     */
    getToken():Observable<string> {
        return this.isAuthenticated()
            .flatMap(isAuthenticated => {
                if(!isAuthenticated) {
                    throw new DeviceAuthenticationError;
                }

                return Observable.fromPromise(this.cache.getItem("device_key"));
            });
    }

    /**
     * Resend app auth code
     * @returns {Observable<string>}
     */
    resendCode():Observable<string> {
        return this.withCacheEnabled(false)
            .perform("GET", "/authenticated/location/resend_code")
            .map(response => {
                return response["success"];
            });
    }

    authenticate(code:string):Observable<boolean> {
        // TODO: Not sure about this part
        code = code.replace(" ", "-");

        return this.isAuthenticated()
            .flatMap(isAuthenticated => {
                if(isAuthenticated) {
                    throw new DeviceIsAuthenticatedError;
                }

                return this.withCacheEnabled(false)
                    .perform(
                        "POST", 
                        "authenticated/location", 
                        {
                            tablet_authentication_code: code
                        }
                    )
            })
            .map((location:Location) => {
                this.cache.saveItem("device_key", code, "auth", 31536000);
                this.cache.saveItem("device_key_checked", true, "auth", 1800);
                this.cache.saveItem("device", location, "device", 31536000);

                return true;
            });
    }
}