// Created by baihuibo on 16/8/30.
import {app} from "../app";

app.directive("testDirective", function () {
    return function (scope, el, attr) {
        el.text('hello directive');
    }
});