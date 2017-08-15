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
var countries_api_service_1 = require("./countries-api.service");
var CountriesComponent = (function () {
    function CountriesComponent(httpService) {
        this.httpService = httpService;
        this.name = 'World';
        console.log('countries module started');
        this.loadContries();
    }
    CountriesComponent.prototype.loadContries = function () {
        var _this = this;
        this.httpService.getCountries()
            .subscribe(function (data) { return _this.countries = data; }, function (error) { return alert(error); }, function () { return console.log('Finish load countries'); });
    };
    CountriesComponent = __decorate([
        core_1.Component({
            selector: 'country-main',
            template: "\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n          <a [routerLink]=\"['show/N']\" routerLinkActive=\"active\">New Country</a>          \n        </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-4\">Name</div>\n      <div class=\"col-md-2\">Code 2 Letter</div>\n      <div class=\"col-md-2\">Code 3 Letter</div>\n      <div class=\"col-md-2\">Code numeric</div>\n      <div class=\"col-md-2\">&nbsp;</div>\n    </div>    \n    <div class=\"row\" *ngFor=\"let country of countries\">\n      <div class=\"col-md-4\">{{ country.Name }}</div>\n      <div class=\"col-md-2\">{{ country.ISO2LET }}</div>\n      <div class=\"col-md-2\">{{ country.ISO3LET }}</div>\n      <div class=\"col-md-2\">{{ country.ISONum }}</div>\n      <div class=\"col-md-2\">      \n            <a [routerLink]=\"['show/',country.CountryId]\" routerLinkActive=\"active\">Edit</a>\n      </div>      \n    </div>    \n  ",
            styleUrls: [
                '/public/stylessheets/bootstrap.min.css',
                '/public/stylessheets/style.css'
            ],
            providers: [countries_api_service_1.CountriesApiService]
        }),
        __metadata("design:paramtypes", [countries_api_service_1.CountriesApiService])
    ], CountriesComponent);
    return CountriesComponent;
}());
exports.CountriesComponent = CountriesComponent;
//# sourceMappingURL=countries.component.1.js.map