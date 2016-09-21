// Created by baihuibo on 16/8/30.
import {bootstrap, module} from "angular";
import "./common/base";
import "./common/services";

import "bootstrap/dist/css/bootstrap.min.css";
import "angular-material/layouts/angular-material.layout-attributes.min.css"; // layout布局文件
import "./styles/login.less";

const app = module('app', ['base', 'services']);

app.run(class {
    constructor($rootScope) {


        $rootScope.name = 'login.boot';
    }
});

bootstrap(document, ['app']);