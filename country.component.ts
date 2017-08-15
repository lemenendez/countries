import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { CountriesApiService} from "./countries-api.service"
 
@Component({
  selector: 'country-edit',
  template:`
  <div class="row">
    <div class="col-md-4">
      <form>
        <div class="form-group">
          <label for="Name">Name</label>
          <input type="text" class="form-control" id="name" required
            [(ngModel)]="country[0].Name" name="name">
        </div>
        <div class="form-group">
          <label for="iso2let">Code two letters</label>
          <input type="text" class="form-control" id="iso2let" required minlength="2" maxlength="2" pattern="[A-Z]+"
            [(ngModel)]="country[0].ISO2LET" name="iso2let">
        </div>
        <div class="form-group">
          <label for="code3let">Code three letters</label>
          <input type="text" class="form-control" id="code3let" required minlength="3" maxlength="3" pattern="[A-Z]+"
            [(ngModel)]="country[0].ISO3LET" name="iso3let">
        </div>
        <div class="form-group">
          <label for="isonum">Code numeric</label>
          <input type="text" class="form-control" id="isonum" required minlength="0" maxlength="5" pattern="[0-9]+"
            [(ngModel)]="country[0].ISONum" name="isonum">
        </div>
        <button type="submit" (click)="update()" class="btn btn-success">Update</button>
        <label>{{message}}</label>
      </form>      
    </div>
    <div class="col-md-8">
      <div class="row">
        <h3>Locations</h3>
        <div class="col-md-6">
          <a [routerLink]="['locs/N']" routerLinkActive="active">New Location</a>        
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">Name</div>
        <div class="col-md-4">Code</div>
        <div class="col-md-4">&nbsp;</div>
      </div>
      <div class="row" *ngFor="let loc of locs">
        <div class="col-md-4">{{ loc.Name }}</div>
        <div class="col-md-4">{{ loc.Code }}</div>
        <div class="col-md-4">  
            <a [routerLink]="['locs/',loc.LocationId]" routerLinkActive="active">Edit Location</a>
        </div>
      </div>
    </div>
  </div>   
  `,
  styleUrls: [
    '/public/stylessheets/bootstrap.min.css',
    '/public/stylessheets/style.css'
    ],
  providers: [CountriesApiService]
})

export class CountryComponent implements OnInit, OnDestroy 
{   
  public country : any;
  public CountryId: number;
  public locs:any;
  private sub: any;
  private isNew: boolean;
  private result: any;
  public message:string;
  
  constructor (private httpService: CountriesApiService, private route:ActivatedRoute) 
  {
    this.country = [{
      Name:'',
      ISO2LET:'',
      ISO3LET:'',
      ISONUM:''  
    }];
    console.log('country module started');
  }

  update() 
  {
    if(this.isNew) {
      this.httpService.createCountry(this.country[0])
        .subscribe(
          data => this.result = data,
          error => console.log(error),
          () => { 
            console.log('Finish create new country');
            if(this.result && this.result.status=="ok") {
              this.message = this.result.desc;
              this.CountryId = this.result.rowid;
              this.loadContry();
            }
          }
        );
    }
    else 
    {
      this.httpService.updateCountry(this.country[0])
        .subscribe(
          data => this.result = data,
          error => console.log(error),
          () => { 
            console.log('Finish update country');
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
      console.log("country id param:"+ params['countryid']);
      if(params['countryid']=='N') 
      {
        this.isNew = true;
      }
      else 
      {
        this.CountryId = params['countryid'];
        this.loadContry();
        this.loadLocations();
        this.isNew = false;
      }
    });
  }

  ngOnDestroy() 
  {
    console.log("ngOnDestroy()...calling");
    this.sub.unsubscribe();
  }

  loadContry() 
  {
    console.log("Country Id:"+this.CountryId);
    this.httpService.getCountry(this.CountryId)
      .subscribe(
        data => this.country = data,
        error => console.log(error),
        () => console.log('Finish load country')
      );    
  }

  loadLocations() 
  {  
    this.httpService.getLocationsByCountryId(this.CountryId)
      .subscribe(
        data => this.locs = data,
        error => console.log(error),
        () => console.log('Finish load locations')
      );
  }

}