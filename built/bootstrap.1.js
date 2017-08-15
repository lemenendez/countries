"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
// import { bootstrap } from 'angular2/platform/browser';
//import { bootstrap } from 'angular2/platform-browser-dynamic';
// import { HTTP_PROVIDERS } from 'angular2/http';
// import { AppComponent } from './countries.component';
//import { AppModule } from './countries.component';
var app_module_1 = require("./app.module");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .then(function (success) { return console.log("Bootstrap success"); })
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=bootstrap.1.js.map