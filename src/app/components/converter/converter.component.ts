import { Component } from '@angular/core';
import {ApiRatesService} from "../../services/api-rates.service";
import {Country} from "../../models/country";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {
  inp1: number = 0
  inp2: number = 0
  rate: number = 0
  countries: Country[] = [
    {value: 'UAH', viewValue: 'UAH',},
    {value: 'USD', viewValue: 'USD'},
    {value: 'EUR', viewValue: 'EUR'},
    //TODO Добавить больше валют
  ];
  title = 'CurrencyConverter';

  constructor(private ratesService: ApiRatesService) {
  }



  country1: string = this.countries[0].value
  country2: string = this.countries[1].value



  changeCountry1(a: string) {
    this.country1 = a
    console.log(this.country1)
  }

  changeCountry2(b: string) {
    this.country2 = b
    console.log(this.country2)
  }

  convert() {
    this.ratesService.getByObservable(this.country1, this.country2, this.inp1).subscribe(data => {
      this.rate = data.info.rate
      this.inp2 = this.inp1 * this.rate
    })
  }

  onInputTo() {
    this.inp2 = this.inp1 * this.rate
  }

  onInputFrom() {
    this.inp1 = this.inp2 / this.rate
  }


}
