// Created by baihuibo on 16/8/30.
import {module, toJson, fromJson, extend, isFunction, isString} from "angular";
import ngResource = require('angular-resource');

const base = module('base', [ngResource]);

// http请求配置,支持传统ajax
base.config(function ($httpProvider, $resourceProvider) {
    var {defaults} = $httpProvider,
        {headers} = defaults,
        key, value;
    defaults.transformRequest = function (data) {
        if (data === void 0) {
            return data;
        } else {
            var param = $.param(fromJson(toJson(data)));
            return param.replace(/%5B%5D=/g, '='); //去掉数组的 []
        }
    };
    value = 'application/x-www-form-urlencoded; charset=UTF-8';
    key = 'Content-Type';
    headers.post[key] = value;
    headers.put[key] = value;
    headers.patch[key] = value;

    // $resource配置,新增方法put,post,queryList
    var {actions} = $resourceProvider.defaults;
    actions['queryList'] = {method: 'GET', isArray: true};
    actions['put'] = {method: 'PUT'};
    actions['post'] = {method: 'POST'};
});

//指令递归帮手,用来优化递归
base.factory('RecursionHelper', function ($compile) {
    return function () {
        return function (element, link) {
            // Normalize the link parameter
            if (isFunction(link)) {
                link = {post: link};
            }

            // Break the recursion loop by removing the contents
            var contents = element.contents().remove();
            var compiledContents;
            return {
                pre: (link && link.pre) ? link.pre : null,
                /**
                 * Compiles and re-adds the contents
                 */
                post: function (...args) {
                    var [scope, element] = args;
                    // Compile the contents
                    if (!compiledContents) {
                        compiledContents = $compile(contents);
                    }
                    // Re-add the compiled contents to the element
                    compiledContents(scope, (clone) => {
                        element.append(clone);
                    });

                    // Call the post-linking function, if any
                    if (link && link.post) {
                        link.post(...args);
                    }
                }
            };
        }
    };
});

// 优化resource
base.factory('resource', function ($resource) {
    var ref = ['get', 'query', 'queryList', 'delete', 'remove'];
    var ref_body = ['post', 'save', 'patch', 'put'];
    return function resourceFactory(url, defaultParams, actions, options) {
        var instance = $resource(url, defaultParams, actions, options);

        function merge(m, d?) {
            if (isString(m)) {
                m = {[m]: true};
            }
            return extend({}, m, d);
        }

        ref.forEach(function (name) {
            if (instance[name]) {
                instance[name] = transformFactory(instance[name], false);
            }
        });

        ref_body.forEach(function (name) {
            if (instance[name]) {
                instance[name] = transformFactory(instance[name], true);
            }
        });

        function transformFactory(fn, isBody) {
            return function handle(a1, a2, a3, a4) {
                var params, data, success, error;
                if (!arguments.length) {
                    return fn.call(this);
                }
                switch (arguments.length) {
                    case 4:
                        error = a4;
                        success = a3;
                    case 3:
                    case 2:
                        if (isFunction(a2)) {
                            if (isFunction(a1)) {
                                success = a1;
                                error = a2;
                                break;
                            }
                            success = a2;
                            error = a3;
                        } else {
                            params = a1;
                            data = a2;
                            success = a3;
                        }
                        break;
                    case 1:
                        if (isFunction(a1)) {
                            success = a1
                        } else if (isString(a1)) {// 调用接口参数
                            params = a1;
                        } else {
                            data = a1
                        }
                        break;
                }

                if (isBody) {
                    return fn.call(this, merge(params), data, success, error);
                }
                return fn.call(this, merge(params, data), success, error);
            }
        }

        return instance;
    }
});