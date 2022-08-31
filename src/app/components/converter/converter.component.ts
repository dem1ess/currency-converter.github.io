import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiRatesService} from "../../services/api-rates.service";
import {Country} from "../../models/country";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnDestroy{

  countries: Country[] = [
    {value: 'UAH', viewValue: 'UAH',},
    {value: 'USD', viewValue: 'USD'},
    {value: 'EUR', viewValue: 'EUR'},
    //TODO Добавить больше валют
  ];

  private subscription!: Subscription;

  isLoading = false;

  inp1: number = 0

  inp2: number = 0

  rate: number = 0
  country1: string = this.countries[0].value

  country2: string = this.countries[1].value
  title = 'CurrencyConverter';

  constructor(private ratesService: ApiRatesService) {
  }


  changeCountry1(a: string) {
    this.country1 = a
  }

  changeCountry2(b: string) {
    this.country2 = b
  }

  convert() {
    this.ratesService.getByObservable(this.country1, this.country2, this.inp1).subscribe(data => {
        this.rate = data.info.rate
        this.inp2 = this.inp1 * this.rate
        this.ratesService.stopLoading()
      }
    )
  }

  onInputTo() {
    this.inp2 = this.inp1 * this.rate
  }

  onInputFrom() {
    this.inp1 = this.inp2 / this.rate
  }

  ngOnInit(): void {
    this.subscription = this.ratesService
      .getLoadingStatus()
      .subscribe(isLoading => {
        this.isLoading = isLoading;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
