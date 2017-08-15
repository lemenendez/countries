"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var cat_list_component_1 = require("./cats/cat-list.component");
var dog_list_component_1 = require("./dogs/dog-list.component");
exports.routes = [
    { path: 'cats', component: cat_list_component_1.CatListComponent },
    { path: 'dogs', component: dog_list_component_1.DogListComponent }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=routs.js.map