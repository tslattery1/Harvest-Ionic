import {Pipe, PipeTransform} from "@angular/core";
import * as moment from "moment";

@Pipe({name: 'moment'})
export class MomentFormatPipe implements PipeTransform {
  transform(date:Date, format: string = 'dddd, MMMM Do YYYY') {
    if(!date) {
      return "";
    }

    return moment(date).format(format);
  }
}
