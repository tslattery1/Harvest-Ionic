import {Component, Input, OnInit} from "@angular/core";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: "dynamic-title",
  templateUrl: "./template.html",
  animations: [
    trigger('change', [
      transition('void => *', [
        style({ opacity: 1, transform: "scale(1, 1)" })
      ]),
      transition('* => *', [
        style({ opacity: 0, transform: "scale(1.05, 1.05)" }),
        animate(500, style({ opacity: 1, transform: "scale(1, 1)" }))
      ])
    ])
  ]
})
export class DynamicTitleComponent implements OnInit {
  @Input() public title:string;
  @Input() public icon:string;
  @Input() public color:string = "";

  public classes = {};

  ngOnInit() {
    if(this.color) {
      this.classes[`title_${this.color}`] = true;
    }
  }
}
