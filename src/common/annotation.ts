// Created by baihuibo on 16/8/30.
import {app} from "./app";
import {isString, isFunction} from "angular";

export function Controller(target): any {
    if (isString(target)) {
        return function (fn) {
            app.controller(target, fn);
        }
    } else if (isFunction(target)) {
        app.controller(target.name, target);
    } else {
        throw "@Controller 必须标注在 Function or Class 上";
    }
}

/**
 * @prop {string} option.state 路由状态
 * @prop {string} option.url 路由地址
 * @prop {string} option.templateUrl 模板路径
 * @prop {string|function} option.controller 控制器名称,可选,如果不填,默认读取标注的class的名字
 * @prop {string} option.controllerAs 控制器别名,可选
 */

export function Route(option) {
    return function (target) {
        if (!option) {
            return;
        }
        let controller = option.controller;
        if (!controller) {
            controller = target.name;
        }
        if (option.views === true) {
            option.views = {
                '@': {
                    template: option.template,
                    controllerAs: option.controllerAs,
                    controller
                }
            };
            delete option.controllerAs;
            delete option.controller;
            delete option.template;
        } else {
            option.controller = controller;
        }
        app.config(function ($stateProvider) {
            $stateProvider.state(option.state, option);
        });
    }
}

export function BeforeRun(target) {
    app.run(target);
}

export function BeforeConfig(target) {
    app.config(target);
}