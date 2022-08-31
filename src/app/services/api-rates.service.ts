import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse } from "@angular/common/http";
import { tap, catchError, delay, retry} from 'rxjs/operators';
import {Observable, Subject, throwError} from "rxjs";
import {ErrorService} from "./error.service";
import {APIRateType} from "../models/APIRateType";




@Injectable({
  providedIn: 'root'
})


export class ApiRatesService {
  cache!: APIRateType;
  private _loading!: boolean;
  private loadingStatus: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private errorService: ErrorService) {
  }



  public getByObservable(country1: string, country2: string, amount: number): Observable<APIRateType> {
    this.startLoading()
    let url = `https://api.exchangerate.host/convert?from=${country1}&to=${country2}&amount=${amount}`
    return this.http.get<APIRateType>(url).pipe(
      retry(2),
      tap(cache => this.cache = cache),
    catchError(this.errorHandler.bind(this))
    )
}
  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  getLoadingStatus() {
    return this.loadingStatus.asObservable();
  }

}
