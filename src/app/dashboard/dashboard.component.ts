import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { WaitingLoaderService } from '../utilities/waiting-loader.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  globalData;
  graphData: GraphData;
  modalRef: BsModalRef; 
  searchText;
  @ViewChild('analysis_summary') analysisSummary: ElementRef;


  constructor(
    private apiService: ApiService,
    private watingLoaderService: WaitingLoaderService,
    private router:Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.apiService.getCovid19Data().subscribe(res=>{
       this.watingLoaderService.display(true);
       this.globalData = Object.entries(res);
       console.log("Covid 19 data >>> ", this.globalData);
       this.watingLoaderService.display(false);
    })
  }

  showGraph(data){
     this.graphData = new GraphData();
     this.graphData.countryName = data[0];
     this.graphData.data = data[1].slice(Math.max(data[1].length - 14, 0));

     this.modalRef = this.modalService.show(this.analysisSummary, {class: 'modal-lg', backdrop: true, ignoreBackdropClick: true});
     //this.router.navigateByUrl('/time-series');
  }

}

export class GraphData{
   countryName: string;
   data: Array<any>;
}
