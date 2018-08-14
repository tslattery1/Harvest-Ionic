import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AppComponent } from './app.component';
import { AuthPage } from "../boards/auth/auth.page";
import {MomentFormatPipe} from "./Pipes/MomentFormat/MomentFormat.pipe";
import {CurrentCompanyComponent} from "../boards/auth/components/current/currentCompany.component";
import {DynamicTitleComponent} from "./Components/DynamicTitle/dynamicTitle.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserResource} from "./Resources/Models/Users/UserResource";
import {IdentifyComponent} from '../boards/auth/components/identify/IdentifyComponent';
import {ReactiveFormsModule} from "@angular/forms";
import {CompanyResource} from "./Resources/Models/Company/CompanyResource";
import {IonicStorageModule} from '@ionic/storage';
import {UserSelectComponent} from "../boards/auth/components/login/UserSelectComponent";
import {PinpadComponent} from "./Components/Pinpad/pinpad.component";
import {DashboardPage} from "../boards/dashboard/dashboard.page";
import {CurrentUserComponent} from "../boards/dashboard/components/current-user/CurrentUser.component";
import {HomeComponent} from '../boards/dashboard/components/home/home.component';
import {CartPreviewComponent} from "../boards/dashboard/components/cart/preview/cartPreview.component";
import {CreateCartComponent} from '../boards/dashboard/components/cart/create/createCart.component';
import {OrderListComponent} from "../boards/dashboard/components/orders/list/orderList.component";
import {ItemListComponent} from "../boards/dashboard/components/item/list/itemList.component";
import {ItemCatalogComponent} from "../boards/dashboard/components/item/catalog/itemCatalog.component";
import {InvoiceListComponent} from '../boards/dashboard/components/invoice/list/invoiceList.component';
import {SettingsComponent} from '../boards/dashboard/components/settings/settings.component';
import {ItemResource} from "./Resources/Models/Goods/ItemResource";
import {CategoryResource} from "./Resources/Models/Goods/CategoryResource";
import {OrderResource} from "./Resources/Models/Order/OrderResource";
import {IntelligenceComponent} from '../boards/dashboard/components/intelligence/Intelligence.component';
import {RegexpInputValidationDirective} from "./Directives/RegexpInputValidationDirective";
import {TableModule} from 'primeng/components/table/table';
import {OrderStatusComponent} from "../boards/dashboard/components/orders/status/orderStatus.component";
import {CartWizardHostService} from "../boards/dashboard/components/cart/wizard/cartWizardHost.service";
import {CartWizardComponent} from '../boards/dashboard/components/cart/wizard/cartWizard.component';
import {OrderViewComponent} from "../boards/dashboard/components/orders/view/orderView.component";
import {CountUpDirective} from "./Directives/CountUpDirective";
import {CartFillComponent} from "../boards/dashboard/components/cart/fill/cartFill.component";
import {HelpComponent} from "../boards/dashboard/components/help/help.component";
import {DeliveryStatusComponent} from "../boards/dashboard/components/delivery/status/DeliveryStatus.component";
import { DeliveryListComponent } from '../boards/dashboard/components/delivery/list/DeliveryList.component';
import { DeliveryMapComponent } from '../boards/dashboard/components/delivery/map/DeliveryMap.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {ToggleWithLabelsComponent} from "./Components/ToggleWithTextLabels/toggleWithLabels.component";
import {Daterangepicker} from "ng2-daterangepicker";
import {PinResetComponent} from '../boards/auth/components/reset/pinReset.component';
import {CacheModule} from "ionic-cache";
import {HttpClientModule} from "@angular/common/http";
import {TokenResource} from "./Resources/Models/Auth/TokenResource";
import {ListResource} from "./Resources/Models/Goods/ListResource";
import {CartResource} from "./Resources/Models/Order/CartResource";
import { DeviceAuthenticationResource } from './Resources/Models/Auth/DeviceAuthenticationResource';
import { LoadingComponent } from './Components/Loading/Loading.component';
import { LayoutViewService } from './Services/LayoutView/LayoutView.service';
import { SubmitedItemListComponent } from '../boards/dashboard/components/item/submited/SubmitedItemList.component';
import { CartLatestOverviewComponent } from '../boards/dashboard/components/cart/latest/overview/CartLatestOverview.component';
import { CartStatusComponent } from '../boards/dashboard/components/cart/status/CartStatus.component';
import { CartDetailsComponent } from '../boards/dashboard/components/cart/details/CartDetailsComponent';
import { BasicLayout } from './Support/Layout/BasicLayout';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    AuthPage,
    DashboardPage,
    IdentifyComponent,
    DynamicTitleComponent,
    PinResetComponent,
    CurrentCompanyComponent,
    UserSelectComponent,
    PinpadComponent,
    HomeComponent,
    CurrentUserComponent,
    CartPreviewComponent,
    CreateCartComponent,
    OrderListComponent,
    OrderViewComponent,
    ItemListComponent,
    DeliveryListComponent,
    DeliveryMapComponent,
    ItemCatalogComponent,
    SubmitedItemListComponent,
    CartLatestOverviewComponent,
    CartStatusComponent,
    InvoiceListComponent,
    SettingsComponent,
    IntelligenceComponent,
    OrderStatusComponent,
    CartWizardComponent,
    CartFillComponent,
    CartDetailsComponent,
    BasicLayout,
    HelpComponent,
    DeliveryStatusComponent,
    ToggleWithLabelsComponent,
    MomentFormatPipe,
    CountUpDirective,
    RegexpInputValidationDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    Daterangepicker,
    TableModule,
    NgxChartsModule,
    HttpClientModule,
    IonicModule.forRoot(AppComponent, {
      "environment": "development",
      "apiProtocol": "http",
      "apiUrl": "private-80e000-ruslangataullin.apiary-mock.com",
      "apiPort": ""
    }),
    IonicStorageModule.forRoot(),
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    AuthPage,
    DashboardPage,
    PinResetComponent,
    HomeComponent,
    OrderListComponent,
    ItemListComponent,
    IdentifyComponent,
    ItemCatalogComponent,
    SettingsComponent,
    InvoiceListComponent,
    UserSelectComponent,
    IntelligenceComponent,
    CartWizardComponent,
    OrderViewComponent,
    CartFillComponent,
    CreateCartComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserResource,
    CompanyResource,
    LayoutViewService,
    ItemResource,
    CategoryResource,
    OrderResource,
    DeviceAuthenticationResource,
    TokenResource,
    ListResource,
    OrderResource,
    CartResource,
    CartWizardHostService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
