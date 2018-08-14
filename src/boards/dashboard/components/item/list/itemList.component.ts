import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {List} from "../../../../../app/Models/List/List";
import * as _ from "lodash";
import {Loading, LoadingController} from "ionic-angular";
import { ListResource } from "../../../../../app/Resources/Models/Goods/ListResource";
import { ListItem } from "../../../../../app/Models/List/ListItem";
import { Observable } from "rxjs";

@Component({
  selector: "item-list",
  templateUrl: "./template.html"
})
export class ItemListComponent implements OnInit {
  @Input() public selectable:boolean = false;
  @Output() onSelect:EventEmitter<ListItem[]> = new EventEmitter<ListItem[]>();

  public loading:Loading;
  public categories:List[];
  public items:Observable<ListItem[]>;

  public itemCount:number = 0;
  public activeCategory:List;

  public cols = [
    { field: 'name', header: 'Item' },
    { field: 'increment_unit', header: 'Pack/Unit' },
    { field: 'list_category_safe_name', header: 'Category' },
    { field: 'quality_indicator', header: 'Quality Options' },
    { field: 'live_price', header: 'Est Live Price' }
  ];

  constructor(private listSvc:ListResource,
              private loadingCtl:LoadingController) {
    this.loading = this.loadingCtl.create({content: "Please wait."});
  }

  ngOnInit(): void {
    this.loading.present();

    this.listSvc.all()
      .subscribe((lists) => {
        this.categories = lists;
        this.setActiveFilter(_.first(lists));
        this.loading.dismiss();
    });
  }

  isFilterActive(id:number) {
    if(!this.activeCategory) {
      return false;
    }

    return this.activeCategory.id == id;
  }

  setActiveFilter(category:List) {
    // this.loading.present();

    this.activeCategory = category;
    this.items = this.listSvc.itemsInList(category.id);

    this.items.subscribe((items) => {
      this.itemCount = items.length;
    })

    return this;
  }

  getViewTitle() {
    if(!this.activeCategory) {
      return `${this.itemCount} Items`;
    }

    return `${this.itemCount} Items in the list "<b>${this.activeCategory.name}</b>"`;
  }
}
