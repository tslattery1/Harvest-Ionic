import {Component} from "@angular/core";

@Component({
  selector: "settings",
  templateUrl: "./template.html"
})
export class SettingsComponent {
  public filter:string = "main";

  isFilterActive(id:string) {
    return this.filter === id;
  }

  setFilter(id:string) {
    this.filter = id;
    return this;
  }
}
