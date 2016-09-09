// Created by baihuibo on 16/8/30.
import {module} from "angular";

export const mod = module('directives', []);

mod.directive("testDirective", function () {
    return function (scope, el, attr) {
        el.text('hello directive');
    }
});