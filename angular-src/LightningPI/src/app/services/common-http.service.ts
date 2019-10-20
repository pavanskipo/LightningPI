import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  private endpoint = 'http://192.168.0.7:8000/api/';
  private debug = true;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { 
    if(!this.debug) {
      this.endpoint = location.protocol + '//' + window.location.host + '/api/';
    }
  }

  public getBaseUrl(){
    return this.endpoint.replace('api/', '');
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getJson(url, queryParamsObject): Observable<any> {
    let query = '';
    if(queryParamsObject) {
      for(let queryData in queryParamsObject) {
        query += ('&' + queryData + '=' + queryParamsObject[queryData])
      }
      query = '?' + query.substr(1);
    }
    return this.http.get(this.endpoint + url + query).pipe(
      map(this.extractData));
  }

  getSuggestionsJson(url) {
    return this.http.jsonp(url, 'callback')
  }

  postJson(url, bodyObject): Observable<any> {
    return this.http.post(this.endpoint + url, bodyObject).pipe(
      map(this.extractData));
  }

  postFormData(url, bodyObject): Observable<any> {
    const formData = new FormData();
    for(let data in bodyObject) {
      formData.set(data, bodyObject[data])
    }
    return this.http.post(this.endpoint + url, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(this.extractData),
      catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}