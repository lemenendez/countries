"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../node_modules/angular2/typings/browser.d.ts" />
var browser_1 = require("angular2/platform/browser");
var http_1 = require("angular2/http");
var country_component_1 = require("./country.component");
browser_1.bootstrap(country_component_1.AppComponent, [http_1.HTTP_PROVIDERS])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=bootstrap-country.js.map