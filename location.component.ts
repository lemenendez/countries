import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { CountriesApiService} from "./countries-api.service"
 
@Component({
  selector: 'location-edit',
  template:`
  <div class="row">
    <div class="col-md-4">
      <form>
        <div class="form-group">
          <label for="Name">Name</label>
          <input type="text" class="form-control" id="name" required
            [(ngModel)]="location[0].Name" name="name">
        </div>
        <div class="form-group">
          <label for="code">Code</label>
          <input type="text" class="form-control" id="code" required minlength="3" maxlength="3" pattern="[A-Z]+"
            [(ngModel)]="location[0].Code" name="code">
        </div>        
        <button type="submit" (click)="update()" class="btn btn-success">Update</button>
        <label>{{message}}</label>
      </form>      
    </div>
  </div>   
  `,
  styleUrls: [
    '/public/stylessheets/bootstrap.min.css',
    '/public/stylessheets/style.css'
    ],
  providers: [CountriesApiService]
})

export class LocationComponent implements OnInit, OnDestroy 
{   
  public location : any;
  public LocationId: number;
  public CountryId: number;
  // public locs:any;
  private sub: any;
  private isNew: boolean;
  private result: any;
  public message:string;
  
  constructor (private httpService: CountriesApiService, private route:ActivatedRoute) 
  {
    this.location = [{
      Name:'',
      Code:''  
    }];
    console.log('country location started');
  }

  update() 
  {
    if(this.isNew) {
      this.httpService.createLocation(this.CountryId, this.location[0])
        .subscribe(
          data => this.result = data,
          error => console.log(error),
          () => {
              console.log('Finish create location');
              this.message = this.result.desc;
              this.LocationId = this.result.rowid;
              this.loadLocation();
          }
        );
    }
    else 
    {
      this.httpService.updateLocation(this.CountryId, this.LocationId, this.location[0])
        .subscribe(
          data => this.result = data,
          error => console.log(error),
          () => { 
            console.log('Finish update location');
            if(this.result && this.result.status=="ok") {
              this.message = this.result.desc;              
            }
          }
        );
    }    
  }  

  ngOnInit() 
  {
    console.log("ngOnInit()...calling");
    this.sub = this.route.params.subscribe(params => {
      console.log("coutry id param:"+ params['countryid']);
      console.log("location id param:"+ params['location']);
      this.CountryId = params['countryid'];
      if(params['locationid']=='N') 
      {
        this.isNew = true;
      }
      else 
      {        
        this.LocationId = params['locationid'];
        this.loadLocation();        
        this.isNew = false;
      }
    });
  }

  ngOnDestroy() 
  {
    console.log("ngOnDestroy()...calling");
    this.sub.unsubscribe();
  }

  loadLocation() 
  {
    console.log("Location Id:"+this.LocationId);
    this.httpService.getLocation(this.CountryId, this.LocationId)
      .subscribe(
        data => this.location = data,
        error => console.log(error),
        () => console.log('Finish load location')
      );    
  }  

}