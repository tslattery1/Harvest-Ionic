import {Component} from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import moment from "moment";

@Component({
  selector: "intelligence",
  templateUrl: "./template.html"
})
export class IntelligenceComponent {
  public filter:string = "savings_metrics";

  public customRule = [
    {
      "name": "Germany",
      "value": 18.6
    }
  ];

  public efficiency = [
    {
      "name": "1",
      "value": 1300
    },

    {
      "name": "2",
      "value": 1150
    },

    {
      "name": "3",
      "value": 990
    }
  ];

  public report = [
    {
      "name": "with_saving",
      "series": [
        {
          "name": new Date(1, 1, 2010),
          "value": 1000
        },
        {
          "name": new Date(1, 1, 2011),
          "value": 2350
        },
        {
          "name": new Date(1, 1, 2012),
          "value": 3134
        },
        {
          "name": new Date(1, 1, 2013),
          "value": 4513
        },
        {
          "name": new Date(1, 1, 2014),
          "value": 5145
        },
        {
          "name": new Date(1, 1, 2015),
          "value": 5654
        }
      ]
    },
    {
      "name": "without_saving",
      "series": [
        {
          "name": new Date(1, 1, 2010),
          "value": 5000
        },
        {
          "name": new Date(1, 1, 2011),
          "value": 5350
        },
        {
          "name": new Date(1, 1, 2012),
          "value": 6134
        },
        {
          "name": new Date(1, 1, 2013),
          "value": 6513
        },
        {
          "name": new Date(1, 1, 2014),
          "value": 7145
        },
        {
          "name": new Date(1, 1, 2015),
          "value": 7654
        }
      ]
    }
  ];

  private currencyFormatter:CurrencyPipe;

  public chartStyles = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  getViewTitle() {
    return this.filter;
  }

  isFilterActive(id:string) {
    return this.filter == id;
  }

  setFilter(id:string) {
    this.filter = id;
    return this;
  }

  formatMoneyValue(value) {
    if(!this.currencyFormatter) {
      this.currencyFormatter = new CurrencyPipe("en-GB");
    }

    return this.currencyFormatter.transform(value);
  }

  formatDateValue(value:Date) {
    let startDate = moment(value),
      endDate = moment(value)
        .add(1, 'month')
        .add(1, 'day');

    return `${startDate.format("M/DD")} - ${endDate.format("M/DD")}`;
  }
}
