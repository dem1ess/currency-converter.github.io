import {Component, OnInit} from '@angular/core';
import {ApiRatesService} from "./api-rates.service";


interface Country {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  to = 1
  from = 1
  countries: Country[] = [
    {value: 'UAH', viewValue: 'UAH',},
    {value: 'USD', viewValue: 'USD'},
    {value: 'EUR', viewValue: 'EUR'},
    //TODO Добавить больше валют
  ];
  title = 'CurrencyConverter';
  currjson: any = []

  constructor(private currency: ApiRatesService) {
  }

  ngOnInit(): void {
    this.getCurrHeader()
  }

  date!: number
  euro: number = 1
  dollar: number = 1

  country1: string = this.countries[0].value
  country2: string = this.countries[1].value

  getCurrHeader() {
    this.currency.getCurrencyRates('USD', 'UAH', 1).subscribe(data => {
      this.currjson = JSON.stringify(data)
      this.currjson = JSON.parse(this.currjson)
      console.log(this.currjson)
      this.dollar = this.currjson.result
      this.date = this.currjson.date
      console.log(this.dollar.toFixed(3))
    })
    this.currency.getCurrencyRates('EUR', 'UAH', 1).subscribe(basse => {
      this.currjson = JSON.stringify(basse)
      this.currjson = JSON.parse(this.currjson)
      this.euro = this.currjson.result
      console.log(this.euro.toFixed(3))
    })
  }

  changeCountry1(a: string) {
    this.country1 = a
    console.log(this.country1)
  }

  changeCountry2(b: string) {
    this.country2 = b
    console.log(this.country2)
  }

  convert() {
    this.currency.getCurrencyRates(this.country1, this.country2, this.to).subscribe(data => {
      this.currjson = JSON.stringify(data)
      this.currjson = JSON.parse(this.currjson)
      this.from = this.to * this.currjson.info.rate
    })
  }

  onInputTo() {
    this.from = this.to * this.currjson.info.rate
  }

  onInputFrom() {
    this.to = this.from / this.currjson.info.rate

  }
}
