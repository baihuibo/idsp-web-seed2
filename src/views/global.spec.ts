// Created by baihuibo on 16/8/31.
import {Global} from "./global";
import {expect} from "chai";

describe("Test BeforeRun Global class", ()=> {
    beforeEach(angular.mock.module('app')); // 在运行每一个 it 时,初始化 app 模块

    it('Global is a class', ()=> {
        expect(Global).to.be.a('function');
    });

    it('$rootScope.$state is defined', angular.mock.inject(function ($rootScope, $state) {
        // 手动调用注入器
        new Global($rootScope, $state);
        expect($rootScope.$state).to.be.a('object'); // 判断是否成功将 $state 赋值给 $rootScope
    }));
});