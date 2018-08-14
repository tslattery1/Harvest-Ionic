import {Component, OnInit, ViewChild} from "@angular/core";
import {Order} from "../../../../../app/Models/Order/Order";
import {OrderResource} from "../../../../../app/Resources/Models/Order/OrderResource";
import * as _ from "lodash";
import {Table} from "primeng/table";
import {Loading, LoadingController} from "ionic-angular";
import {OrderViewComponent} from "../view/orderView.component";
import * as moment from "moment";
import { LayoutViewService } from "../../../../../app/Services/LayoutView/LayoutView.service";

@Component({
  selector: "order-list",
  templateUrl: "./template.html"
})
export class OrderListComponent implements OnInit {
  // State variables
  public activeFilter:string;
  public loading:Loading;

  // Data variables
  public orders:Order[] = [];
  public slice:Order[] = [];

  // Sub component configurations
  public cols = [
    { field: 'order_token', header: 'Order' },
    { field: 'items_count', header: 'Items' },
    { field: 'created_by', header: 'Created By' },
    { field: 'last_update_at', header: 'Updated At' },
    { field: 'status', header: 'Status' },
    { field: 'price', header: 'Total' }
  ];
  public datePickerOptions = {
    ranges: {
      "Today": [
        moment().toDate(),
        moment().toDate(),
      ],
      "Yesterday": [
        moment().subtract(1, "day").toDate(),
        moment().subtract(1, "day").toDate(),
      ],
      "Last 7 Days": [
        moment().subtract(7, "day").toDate(),
        moment().toDate(),
      ],
      "Last 30 Days": [
        moment().subtract(30, "day").toDate(),
        moment().toDate(),
      ],
      "This Month": [
        moment().startOf('month').toDate(),
        moment().endOf('month').toDate(),
      ],
      "Last Month": [
        moment().subtract(1, "month")
          .startOf('month')
          .toDate(),
        moment().subtract(1, "month")
          .endOf('month')
          .toDate(),
      ]
    },
    alwaysShowCalendars: true,
    autoApply: true
  };

  @ViewChild("table") table:Table;

  constructor(private orderService:OrderResource,
              private loadingCtl:LoadingController,
              private viewSvc:LayoutViewService) {
    this.activeFilter = "active";
    this.loading = this.loadingCtl.create({content: "Please wait..."});
  }

  ngOnInit(): void {
    this.loading.present();

    this.orderService.all()
      .subscribe((orders) => {
        this.orders = orders;
        this.setFilter("active");
        this.loading.dismiss();
      });
  }

  resetTable() {
    this.table.value = this.slice;
  }

  isFilterActive(type:string) {
    return (this.activeFilter == type);
  }

  setFilter(type:string) {
    switch(type) {
      case "all":
        this.slice = this.orders;
        break;

      case "active":
        this.slice = _.filter(this.orders, ((order:Order) => (_.first(order.status.name) !== "complete")));
        break;
    }

    this.activeFilter = type;
    this.resetTable();
  }

  getViewTitle() {
    return `Showing orders ${this.slice.length} of ${this.orders.length} in the last month"`;
  }

  getRowClass(row) {
    return `order_${_.toLower(_.snakeCase(_.first(_.values(row['status']))))}`;
  }

  doViewOrderClick(id: number) {
    this.viewSvc.pushView(OrderViewComponent, {id: id});
  }
}
