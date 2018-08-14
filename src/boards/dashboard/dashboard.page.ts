import { Component } from "@angular/core";
import {HomeComponent} from "./components/home/home.component";
import {MenuController} from "ionic-angular";
import {OrderListComponent} from "./components/orders/list/orderList.component";
import {ItemListComponent} from "./components/item/list/itemList.component";
import {ItemCatalogComponent} from "./components/item/catalog/itemCatalog.component";
import {InvoiceListComponent} from "./components/invoice/list/invoiceList.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {IntelligenceComponent} from "./components/intelligence/Intelligence.component";
import {animate, style, transition, trigger} from "@angular/animations";
import { LayoutViewService } from "../../app/Services/LayoutView/LayoutView.service";
import { BasicLayout } from "../../app/Support/Layout/BasicLayout";

@Component({
  selector: "dashboard-page",
  templateUrl: "./template.html",
  animations: [
    trigger('change', [
      transition('* => *', [
        style({ opacity: 1 }),
        animate(450, style({ opacity: 0, transform: "translateX(-150px)" }))
      ]),
      transition('* => finished', [
        style({ opacity: 0, transform: "translateX(150px)" }),
        animate(450, style({ opacity: 1, transform: "translateX(0)" }))
      ]),
    ])
  ]
})
export class DashboardPage extends BasicLayout
{
  constructor(viewSvc:LayoutViewService, private menuCtrl:MenuController) {
    super(viewSvc); 
  }

  ionViewDidLoad() {
    this.resetState();
    super.ionViewDidLoad();

    this.doGoHome();
    this.menuCtrl.get("left").open();
  }

  doGoHome() {
    this.switchView(HomeComponent);
  }

  doNavigateTo(section:string) {
    switch(section) {
      case "main.orders":
        this.switchView(OrderListComponent);
        break;

      case "main.lists":
        this.switchView(ItemListComponent);
        break;

      case "main.catalog":
        this.switchView(ItemCatalogComponent);
        break;

      case "main.invoices":
        this.switchView(InvoiceListComponent);
        break;

      case "main.intelligence":
        this.switchView(IntelligenceComponent);
        break;

      case "main.settings":
        this.switchView(SettingsComponent);
        break;
    }
  }

  doSwitchComponent(component) {
    // if(this.component.current) {
      // this.component.state = "disappear";
      // this.component.current.destroy();
    // }

    // this.component.name = component.name;
    // this.component.current = this.container.createComponent(component);

    // this.component.state = "ready";
  }

  getCurrentState() {
    return this.activeView ? this.activeView.name : "void";
  }
}
