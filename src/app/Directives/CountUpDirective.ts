import {AfterViewInit, Directive, ElementRef, Input} from "@angular/core";
import * as CountUp from "countup.js";

@Directive({
  selector: "[count-up]"
})
export class CountUpDirective implements AfterViewInit {
  @Input() decimals:number = 0;

  constructor(private element:ElementRef) {}

  ngAfterViewInit(): void {
    let value = (this.decimals) ?
      parseFloat(this.element.nativeElement.innerText) :
      parseInt(this.element.nativeElement.innerText);

    let count = new CountUp(
      this.element.nativeElement,
      0,
      value,
      this.decimals ? this.decimals : 0,
      2.5,
      {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
      }
    );

    count.start();
  }
}
