import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getCovid19Data(){
     return this.http.get('https://pomber.github.io/covid19/timeseries.json');
  }

}
