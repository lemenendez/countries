"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var CountriesApiService = (function () {
    function CountriesApiService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    CountriesApiService.prototype.getCountries = function () {
        return this.http.get('/api/api-v1/countries', null)
            .map(function (res) { return res.json(); });
    };
    CountriesApiService.prototype.getCountry = function (CountryId) {
        return this.http.get('/api/api-v1/countries/' + CountryId)
            .map(function (resp) { return resp.json(); });
    };
    CountriesApiService.prototype.getLocationsByCountryId = function (CountryId) {
        return this.http.get('/api/api-v1/countries/' + CountryId + '/locs')
            .map(function (resp) { return resp.json(); });
    };
    CountriesApiService.prototype.createCountry = function (Country) {
        return this.http.post('/api/api-v1/countries', JSON.stringify(Country), { headers: this.headers })
            .map(function (resp) { return resp.json(); });
    };
    CountriesApiService.prototype.updateCountry = function (Country) {
        return this.http.post('/api/api-v1/countries/' + Country.CountryId, JSON.stringify(Country), { headers: this.headers })
            .map(function (resp) { return resp.json(); });
    };
    CountriesApiService.prototype.deleteCountry = function (CountryId) {
        return this.http.delete('/api/api-v1/countries/' + CountryId, { headers: this.headers })
            .map(function (resp) { return resp.json(); });
    };
    CountriesApiService.prototype.getLocation = function (CountryId, LocationId) {
        return this.http.get('/api/api-v1/countries/' + CountryId + "/locs/" + LocationId)
            .map(function (resp) { return resp.json(); });
    };
    CountriesApiService.prototype.createLocation = function (CountryId, Location) {
        return this.http.post('/api/api-v1/countries/' + CountryId + "/locs", JSON.stringify(Location), { headers: this.headers })
            .map(function (resp) { return resp.json(); });
    };
    CountriesApiService.prototype.updateLocation = function (CountryId, LocationId, Location) {
        return this.http.post('/api/api-v1/countries/' + CountryId + "/locs/" + LocationId, JSON.stringify(Location), { headers: this.headers })
            .map(function (resp) { return resp.json(); });
    };
    CountriesApiService.prototype.deleteLocation = function (LocationId) {
    };
    CountriesApiService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CountriesApiService);
    return CountriesApiService;
}());
exports.CountriesApiService = CountriesApiService;
//# sourceMappingURL=countries-api.service.js.map