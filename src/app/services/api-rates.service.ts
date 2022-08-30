import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse } from "@angular/common/http";
import { tap, catchError, delay, retry} from 'rxjs/operators';
import {Observable, throwError} from "rxjs";
import {ErrorService} from "./error.service";
import {APIRateType} from "../models/APIRateType";




@Injectable({
  providedIn: 'root'
})
export class ApiRatesService {
  cache!: APIRateType;

  constructor(private http: HttpClient, private errorService: ErrorService) {
  }


  public getByObservable(country1: string, country2: string, amount: number): Observable<APIRateType> {
    let url = `https://api.exchangerate.host/convert?from=${country1}&to=${country2}&amount=${amount}`
    return this.http.get<APIRateType>(url).pipe(
      delay(200),
      retry(2),
      tap(cache => this.cache = cache),
    catchError(this.errorHandler.bind(this))
    )
}
  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }

}
