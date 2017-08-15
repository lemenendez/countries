import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent} from './app.component';
import { CountriesComponent } from './countries.component';
import { CountryComponent } from './country.component';
import { LocationComponent } from './location.component';
import { routing } from './routes';
import { CountriesApiService } from './countries-api.service';

// Decorator
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    CountriesComponent,
    CountryComponent,
    LocationComponent   
  ],
  providers: [CountriesApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
    // Module class
}