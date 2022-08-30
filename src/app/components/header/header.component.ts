import { Component, OnInit } from '@angular/core';
import {ApiRatesService} from "../../services/api-rates.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  date!: string
  euro = {
    country1: 'EUR',
    country2: 'UAH',
    amount: 1
  }
  dollar = {
    country1: 'EUR',
    country2: 'UAH',
    amount: 1
  }
  constructor(private ratesService: ApiRatesService) { }

  ngOnInit(): void {
    this.getCurrHeader()
  }

  getCurrHeader() {
    this.ratesService.getByObservable('USD', 'UAH', 1).subscribe(data => {
      this.dollar.amount = data.result
      this.date = data.date
    })
    this.ratesService.getByObservable(this.euro.country1, this.euro.country2, this.euro.amount).subscribe(basse => {
      this.euro.amount = basse.result
      console.log(this.euro.amount.toFixed(3))
    })
  }

}
