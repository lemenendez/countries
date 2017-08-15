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
var LocationComponent = (function () {
    function LocationComponent(httpService, route) {
        this.httpService = httpService;
        this.route = route;
        this.location = [{
                Name: '',
                Code: ''
            }];
        console.log('country location started');
    }
    LocationComponent.prototype.update = function () {
        var _this = this;
        if (this.isNew) {
            this.httpService.createLocation(this.CountryId, this.location[0])
                .subscribe(function (data) { return _this.result = data; }, function (error) { return console.log(error); }, function () {
                console.log('Finish create location');
                _this.message = _this.result.desc;
                _this.LocationId = _this.result.rowid;
                _this.loadLocation();
            });
        }
        else {
            this.httpService.updateLocation(this.CountryId, this.LocationId, this.location[0])
                .subscribe(function (data) { return _this.result = data; }, function (error) { return console.log(error); }, function () {
                console.log('Finish update location');
                if (_this.result && _this.result.status == "ok") {
                    _this.message = _this.result.desc;
                }
            });
        }
    };
    LocationComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("ngOnInit()...calling");
        this.sub = this.route.params.subscribe(function (params) {
            console.log("coutry id param:" + params['countryid']);
            console.log("location id param:" + params['location']);
            _this.CountryId = params['countryid'];
            if (params['locationid'] == 'N') {
                _this.isNew = true;
            }
            else {
                _this.LocationId = params['locationid'];
                _this.loadLocation();
                _this.isNew = false;
            }
        });
    };
    LocationComponent.prototype.ngOnDestroy = function () {
        console.log("ngOnDestroy()...calling");
        this.sub.unsubscribe();
    };
    LocationComponent.prototype.loadLocation = function () {
        var _this = this;
        console.log("Location Id:" + this.LocationId);
        this.httpService.getLocation(this.CountryId, this.LocationId)
            .subscribe(function (data) { return _this.location = data; }, function (error) { return console.log(error); }, function () { return console.log('Finish load location'); });
    };
    LocationComponent = __decorate([
        core_1.Component({
            selector: 'location-edit',
            template: "\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <form>\n        <div class=\"form-group\">\n          <label for=\"Name\">Name</label>\n          <input type=\"text\" class=\"form-control\" id=\"name\" required\n            [(ngModel)]=\"location[0].Name\" name=\"name\">\n        </div>\n        <div class=\"form-group\">\n          <label for=\"code\">Code</label>\n          <input type=\"text\" class=\"form-control\" id=\"code\" required minlength=\"3\" maxlength=\"3\" pattern=\"[A-Z]+\"\n            [(ngModel)]=\"location[0].Code\" name=\"code\">\n        </div>        \n        <button type=\"submit\" (click)=\"update()\" class=\"btn btn-success\">Update</button>\n        <label>{{message}}</label>\n      </form>      \n    </div>\n  </div>   \n  ",
            styleUrls: [
                '/public/stylessheets/bootstrap.min.css',
                '/public/stylessheets/style.css'
            ],
            providers: [countries_api_service_1.CountriesApiService]
        }),
        __metadata("design:paramtypes", [countries_api_service_1.CountriesApiService, router_1.ActivatedRoute])
    ], LocationComponent);
    return LocationComponent;
}());
exports.LocationComponent = LocationComponent;
//# sourceMappingURL=location.component.js.map