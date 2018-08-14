import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Category} from "../../../../../app/Models/Category";
import {CategoryResource} from "../../../../../app/Resources/Models/Goods/CategoryResource";
import {ItemResource} from "../../../../../app/Resources/Models/Goods/ItemResource";
import {Observable} from "rxjs/Observable";
import {Item} from "../../../../../app/Models/Item/Item";
import {Loading, LoadingController} from "ionic-angular";

type ActiveItemFilter = "fresh" | "seasonal" | "trending";

@Component({
  selector: "item-catalog",
  templateUrl: "./template.html"
})
export class ItemCatalogComponent implements OnInit {
  @Input() public selectable:boolean = false;
  @Output() onSelect:EventEmitter<Item[]> = new EventEmitter<Item[]>();

  public loading:Loading;
  public activeCategory:Category;
  public activeFilter:ActiveItemFilter = "fresh";
  public itemCount:number = 0;

  public categories: Observable<Category[]>;
  public slice: Observable<Item[]>;

  public cols = [
    {header: "Item"},
    {header: "Pack/Case Qty"},
    {header: "Category"},
    {header: "Quality Options"},
    {header: "Est Live Price"},
    {header: "Add to Cart or List"}
  ];

  constructor(private categoryService:CategoryResource,
              private itemService:ItemResource,
              loadingCtrl:LoadingController) {
    this.loading = loadingCtrl.create({content: "Please wait..."});
  }

  ngOnInit(): void {
    this.loading.present();
    this.categories = this.categoryService.withAuth()
      .all();

    this.slice = this.itemService.all();

    Observable.forkJoin(this.categories, this.slice)
      .subscribe((data) => {
        console.log(data);
        this.loading.dismiss();
      });
  }

  isFilterActive(id:number) {
    if(!this.activeCategory) {
      return false;
    }

    return this.activeCategory.id == id;
  }

  setActiveFilter(category:Category) {
    // this.loading.present();
    this.activeCategory = category;
    this.slice = this.itemService.allForCategory(category.id);

    this.slice
      .subscribe((slice:Item[]) => {
        this.itemCount = slice.length;
        this.loading.dismiss();
      });

    return this;
  }

  getCategoryString() {
    if(!this.activeCategory) {
      return "All Items";
    }

    return this.activeCategory.name;
  }

  getDisplayFilterString() {
    return this.activeFilter;
  }

  getCounterString() {
    return `Viewing ${this.itemCount} items`
  }
}
