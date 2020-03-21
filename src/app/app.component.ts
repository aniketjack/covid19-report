import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { WaitingLoaderService } from './utilities/waiting-loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'covid19-app';
    showLoader: boolean;
    
    constructor(
      private waitingLoaderService: WaitingLoaderService
    ){}

    ngOnInit(){
        this.waitingLoaderService.status.subscribe((val: boolean) => {
           this.showLoader = val;
        })
    }
  
}
