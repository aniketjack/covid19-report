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
  
  latestFigures;
  dashboardData;
  globalData;
  graphData: GraphData;
  modalRef: BsModalRef; 
  searchText;
  isloaded: boolean = false;
  @ViewChild('analysis_summary') analysisSummary: ElementRef;


  constructor(
    private apiService: ApiService,
    private watingLoaderService: WaitingLoaderService,
    private router:Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.watingLoaderService.display(true);
    this.apiService.getdasboardStat().subscribe(resp=>{
      this.latestFigures = resp['latest'];
      this.dashboardData = resp['locations'];
      this.apiService.getCovid19Data().subscribe(res=>{
        this.globalData = Object.entries(res);
        //console.log("Covid 19 data >>> ", this.globalData);
        this.watingLoaderService.display(false);
        this.isloaded = true;
     })

    })
    
  }

  showGraph(data){
     // extract data
     this.graphData = new GraphData();
     this.graphData.countryName = data['country'];
     let filtered = this.globalData.filter(obj => {
         return obj[0] === data['country'];
     });
     this.graphData.data = filtered[0][1].slice(Math.max(filtered[0][1].length - 14, 0));

     this.modalRef = this.modalService.show(this.analysisSummary, {class: 'modal-lg', backdrop: true, ignoreBackdropClick: true});
     //this.router.navigateByUrl('/time-series');
  }

}

export class GraphData{
   countryName: string;
   data: Array<any>;
}
