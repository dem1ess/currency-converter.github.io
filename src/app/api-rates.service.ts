import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiRatesService {

  constructor(private http: HttpClient) {
  }

  getCurrencyRates(country1: string, country2: string, amount: number) {
    let url = `https://api.exchangerate.host/convert?from=${country1}&to=${country2}&amount=${amount}`
    return this.http.get(url)
  }

//TODO передалеть что бы было только одно обращение к API
}
