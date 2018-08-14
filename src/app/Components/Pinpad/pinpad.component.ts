import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";

@Component({
  selector: "pinpad",
  templateUrl: "./template.html"
})
export class PinpadComponent implements OnChanges {
  private value = "";

  @Input() color:string = "calm";
  @Input() disabled:boolean = false;
  @Input() pincode:string;
  @Output() pincodeChange = new EventEmitter();

  private reset() {
    this.value = "";
    this.pincodeChange.next(this.value);
    return this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.hasOwnProperty("pincode")) {
      this.value = changes["pincode"].currentValue;
    }
  }

  doClickDigit(digit:number) {
    if(this.value.length+1 > 4) {
      this.reset();
    }

    this.value += digit.toString();
    this.pincodeChange.next(this.value);

    return this;
  }

  doClickReset() {
    this.reset();
    return this;
  }
}
