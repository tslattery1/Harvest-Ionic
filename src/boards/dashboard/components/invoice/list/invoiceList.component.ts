import {Component} from "@angular/core";
import * as _ from "lodash";
import {Loading, LoadingController} from "ionic-angular";

@Component({
  selector: "invoice-list",
  templateUrl: "./template.html"
})
export class InvoiceListComponent {
  public activeFilter:string = "active";
  public loading: Loading;

  public slice = [];
  public invoices = [];

  public cols = [
    { header: 'Billing Date' },
    { field: 'id', header: 'Invoice ID' },
    { header: 'Order' },
    { header: 'Payment Account' },
    { header: 'Status' },
    { header: 'Total' }
  ];

  constructor(loadingCtrl:LoadingController) {
    this.loading = loadingCtrl.create({content: "Please wait..."});
  }

  isFilterActive(type:string) {
    return (this.activeFilter == type);
  }

  setFilter(type:string) {
    switch(type) {
      default:
      case "payed":
        this.slice = this.invoices;
        break;

      case "active":
        this.slice = _.filter(this.invoices, ((invoice) => (_.first(invoice.status) !== "complete")));
        break;
    }

    this.activeFilter = type;
    // this.resetTable();
  }

  screenTitle() {
    return `Shoving ${this.activeFilter} invoices ${this.slice.length} of ${this.invoices.length} total from last month`;
  }
}
