import {Injectable} from "@angular/core";
import {TokenAwareRemoteResource} from "../../TokenAwareRemoteResource";

@Injectable()
export class CompanyResource extends TokenAwareRemoteResource<any> {
}
