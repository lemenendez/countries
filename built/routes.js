"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var countries_component_1 = require("./countries.component");
var country_component_1 = require("./country.component");
var location_component_1 = require("./location.component");
exports.routes = [
    { path: '', component: app_component_1.AppComponent },
    { path: 'countries', component: countries_component_1.CountriesComponent },
    { path: 'countries/show/:countryid', component: country_component_1.CountryComponent },
    { path: 'countries/show/:countryid/locs/:locationid', component: location_component_1.LocationComponent }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes, { enableTracing: true });
//# sourceMappingURL=routes.js.map