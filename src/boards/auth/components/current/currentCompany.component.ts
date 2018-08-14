import {Component, OnInit} from "@angular/core";
import {TokenResource} from "../../../../app/Resources/Models/Auth/TokenResource";
import { Observable } from "rxjs/Observable";
import { DeviceAuthenticationResource } from "../../../../app/Resources/Models/Auth/DeviceAuthenticationResource";
import { Location } from "../../../../app/Models/Location";

@Component({
  selector: "current-company",
  templateUrl: "./template.html",
  // styleUrls: [
  //   "./styles.scss"
  // ]
})
export class CurrentCompanyComponent implements OnInit {
  // shouldRetry:boolean = true;
  company:Location = null;

  constructor(private deviceSvc:DeviceAuthenticationResource, private tokenSvc:TokenResource) {}

  ngOnInit() {
    try {
      this.tokenSvc.isKeyValid()
        .flatMap((isValid) => {
          if(isValid) {
            return this.deviceSvc.getActiveLocation()
          }

          return Observable.of(null);
        })
        .subscribe((data:Location) => {
          if(data) {
            this.company = data;
          }
        });
    } catch (e) {
      console.log("Test", e);
    }

    // let company = new Observable<Company>((observer:Observer<Company>) => {
    //   let interval = setInterval(
    //     () => {
    //       if(!this.shouldRetry) {
    //         return clearInterval(interval);
    //       }
    //
    //
    //         let company = ;
    //       });
    //     },
    //     5000
    //   );
    // });
  }

  orderTitle(state:number):string {
    switch(state) {
      case 0:
        return "No order placed today";

      case 1:
        return 'Order submitted';

      case 2:
        return 'Order is Processing';

      default:
        break;
    }
  }
}
