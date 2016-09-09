// Created by baihuibo on 16/8/30.
import {module} from "angular";
import uiRouter = require('angular-ui-router');
import ngSanitize = require('angular-sanitize');
import "./base";
import "./filters";
import "./services";
import "./directives/directives";

export const app = module('app', ['base', 'filters', 'services', 'directives',
    ngSanitize, String(uiRouter)]);