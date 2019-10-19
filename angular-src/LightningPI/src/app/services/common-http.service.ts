import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  private endpoint = 'http://192.168.0.8:8000/api/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

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

}
