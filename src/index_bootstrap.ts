// Created by baihuibo on 16/8/29.

import {bootstrap} from "angular";
import {BeforeConfig} from "./common/annotation";
import "./views/views";
import "./views/global";
import "bootstrap/dist/css/bootstrap.min.css";
import "angular-material/layouts/angular-material.layout-attributes.min.css"; // layout布局文件
import "./styles/index.less";// 样式文件

// 运行前配置
@BeforeConfig
class Config {
    constructor($urlRouterProvider) {
        //$urlRouterProvider.when(whenPath, toPath);
        //$urlRouterProvider.otherwise(path);
    }
}

// 启动程序
bootstrap(document, ['app']);