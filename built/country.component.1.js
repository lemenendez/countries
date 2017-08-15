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
var router_1 = require("@angular/router");
var countries_api_service_1 = require("./countries-api.service");
var CountryComponent = (function () {
    function CountryComponent(httpService, route) {
        this.httpService = httpService;
        this.route = route;
        this.country = [{
                Name: '',
                ISO2LET: '',
                ISO3LET: '',
                ISONUM: ''
            }];
        console.log('country module started');
    }
    CountryComponent.prototype.update = function () {
        var _this = this;
        if (this.isNew) {
            this.httpService.createCountry(this.country[0])
                .subscribe(function (data) { return _this.result = data; }, function (error) { return console.log(error); }, function () { return console.log('Finish create new country'); });
        }
        else {
            this.httpService.updateCountry(this.country[0])
                .subscribe(function (data) { return _this.result = data; }, function (error) { return console.log(error); }, function () {
                console.log('Finish update country');
                if (_this.result && _this.result.status == "ok") {
                    _this.message = _this.result.desc;
                }
            });
        }
    };
    CountryComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("ngOnInit()...calling");
        this.sub = this.route.params.subscribe(function (params) {
            console.log("country id param:" + params['countryid']);
            if (params['countryid'] == 'N') {
                _this.isNew = true;
            }
            else {
                _this.CountryId = params['countryid'];
                _this.loadContry();
                _this.loadLocations();
                _this.isNew = false;
            }
        });
    };
    CountryComponent.prototype.ngOnDestroy = function () {
        console.log("ngOnDestroy()...calling");
        this.sub.unsubscribe();
    };
    CountryComponent.prototype.loadContry = function () {
        var _this = this;
        console.log("Country Id:" + this.CountryId);
        this.httpService.getCountry(this.CountryId)
            .subscribe(function (data) { return _this.country = data; }, function (error) { return console.log(error); }, function () { return console.log('Finish load country'); });
    };
    CountryComponent.prototype.loadLocations = function () {
        var _this = this;
        this.httpService.getLocationsByCountryId(this.CountryId)
            .subscribe(function (data) { return _this.locs = data; }, function (error) { return console.log(error); }, function () { return console.log('Finish load locations'); });
    };
    CountryComponent = __decorate([
        core_1.Component({
            selector: 'country-edit',
            template: "\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <form>\n        <div class=\"form-group\">\n          <label for=\"Name\">Name</label>\n          <input type=\"text\" class=\"form-control\" id=\"name\" required\n            [(ngModel)]=\"country[0].Name\" name=\"name\">\n        </div>\n        <div class=\"form-group\">\n          <label for=\"iso2let\">Code two letters</label>\n          <input type=\"text\" class=\"form-control\" id=\"iso2let\" required minlength=\"2\" maxlength=\"2\" pattern=\"[A-Z]+\"\n            [(ngModel)]=\"country[0].ISO2LET\" name=\"iso2let\">\n        </div>\n        <div class=\"form-group\">\n          <label for=\"code3let\">Code three letters</label>\n          <input type=\"text\" class=\"form-control\" id=\"code3let\" required minlength=\"3\" maxlength=\"3\" pattern=\"[A-Z]+\"\n            [(ngModel)]=\"country[0].ISO3LET\" name=\"iso3let\">\n        </div>\n        <div class=\"form-group\">\n          <label for=\"isonum\">Code numeric</label>\n          <input type=\"text\" class=\"form-control\" id=\"isonum\" required minlength=\"0\" maxlength=\"5\" pattern=\"[0-9]+\"\n            [(ngModel)]=\"country[0].ISONum\" name=\"isonum\">\n        </div>\n        <button type=\"submit\" (click)=\"update()\" class=\"btn btn-success\">Update</button>\n        <label>{{message}}</label>\n      </form>      \n    </div>\n    <div class=\"col-md-8\">\n      <div class=\"row\">\n        <h3>Locations</h3>\n        <div class=\"col-md-6\">New Location</div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-6\">Name</div>\n        <div class=\"col-md-6\">Code</div>\n      </div>\n      <div class=\"row\" *ngFor=\"let loc of locs\">\n        <div class=\"col-md-4\">{{ loc.Name }}</div>\n        <div class=\"col-md-4\">{{ loc.Code }}</div>\n      </div>\n    </div>\n  </div>   \n  ",
            styleUrls: [
                '/public/stylessheets/bootstrap.min.css',
                '/public/stylessheets/style.css'
            ],
            providers: [countries_api_service_1.CountriesApiService]
        }),
        __metadata("design:paramtypes", [countries_api_service_1.CountriesApiService, router_1.ActivatedRoute])
    ], CountryComponent);
    return CountryComponent;
}());
exports.CountryComponent = CountryComponent;
//# sourceMappingURL=country.component.1.js.map