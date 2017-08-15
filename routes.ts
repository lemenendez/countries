import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CountriesComponent } from './countries.component';
import { CountryComponent } from './country.component';
import { LocationComponent } from './location.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'countries/show/:countryid', component: CountryComponent },
  { path: 'countries/show/:countryid/locs/:locationid', component: LocationComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes,  { enableTracing: true } );
