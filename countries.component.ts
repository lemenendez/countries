import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CountriesApiService} from "./countries-api.service"
 
@Component({
  selector: 'country-main',
  template:`
    <div class="row">
        <div class="col-md-4">
          <a [routerLink]="['show/N']" routerLinkActive="active">New Country</a>          
        </div>
    </div>
    <div class="row">
      <div class="col-md-4">Name</div>
      <div class="col-md-2">Code 2 Letter</div>
      <div class="col-md-2">Code 3 Letter</div>
      <div class="col-md-2">Code numeric</div>
      <div class="col-md-2">&nbsp;</div>
    </div>    
    <div class="row" *ngFor="let country of countries">
      <div class="col-md-4">{{ country.Name }}</div>
      <div class="col-md-2">{{ country.ISO2LET }}</div>
      <div class="col-md-2">{{ country.ISO3LET }}</div>
      <div class="col-md-2">{{ country.ISONum }}</div>
      <div class="col-md-2">      
            <a [routerLink]="['show/',country.CountryId]" routerLinkActive="active">Edit</a>
      </div>      
    </div>    
  `,
  styleUrls: [
    '/public/stylessheets/bootstrap.min.css',
    '/public/stylessheets/style.css'
    ],
  providers: [CountriesApiService]
})


export class CountriesComponent 
{ 
  
  countries : {};

  constructor (private httpService: CountriesApiService) {
    console.log('countries module started');
    this.loadContries();
  }

  loadContries() {
    this.httpService.getCountries()
      .subscribe(
        data => this.countries = data,
        error => alert(error),
        () => console.log('Finish load countries')
      );    
  }
}