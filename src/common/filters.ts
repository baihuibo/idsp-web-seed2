// Created by baihuibo on 16/8/30.
import {module} from "angular";

export const mod = module('filters', []);

mod.filter("myFilter", function () {
    return function (input) {
        return '!!' + input;
    }
});