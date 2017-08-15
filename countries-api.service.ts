import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CountriesApiService 
{
    constructor (private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});

    getCountries() {
        return this.http.get('/api/api-v1/countries', null)
            .map(res => res.json());
    }

    getCountry(CountryId) {
        return this.http.get('/api/api-v1/countries/'+CountryId)
            .map(resp => resp.json());
    }

    getLocationsByCountryId(CountryId) {
        return this.http.get('/api/api-v1/countries/'+CountryId+'/locs')
            .map(resp => resp.json());
    }

    createCountry(Country) {
        return this.http.post('/api/api-v1/countries',
                JSON.stringify(Country), 
                {headers:this.headers})
            .map(resp => resp.json());
    }

    updateCountry(Country) {
        return this.http.post('/api/api-v1/countries/'+Country.CountryId,
                JSON.stringify(Country), 
                {headers:this.headers})
            .map(resp => resp.json());
    }

    deleteCountry(CountryId) {
        return this.http.delete('/api/api-v1/countries/'+CountryId,                 
                {headers:this.headers})
            .map(resp => resp.json());
    }

    getLocation(CountryId, LocationId) {
        return this.http.get('/api/api-v1/countries/'+CountryId+"/locs/"+LocationId)
            .map(resp => resp.json());
    }

    createLocation(CountryId, Location) {
        return this.http.post('/api/api-v1/countries/'+CountryId+"/locs",
                JSON.stringify(Location), 
                {headers:this.headers})
            .map(resp => resp.json());
    }

    updateLocation(CountryId, LocationId, Location) {
        return this.http.post('/api/api-v1/countries/'+CountryId+"/locs/"+LocationId,
                JSON.stringify(Location), 
                {headers:this.headers})
            .map(resp => resp.json());
    }

    deleteLocation(LocationId) {

    }

} 