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

  getdasboardStat(){
    return this.http.get('https://coronavirus-tracker-api.herokuapp.com/v2/locations');
  }

}
