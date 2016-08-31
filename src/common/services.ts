// Created by baihuibo on 16/8/30.

import {module} from "angular";
import "./base";

export const mod = module('services', ['base']);

mod.factory("TestServer", function (resource) {
    return resource('resource/test.json');
});
