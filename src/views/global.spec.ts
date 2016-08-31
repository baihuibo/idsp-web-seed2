// Created by baihuibo on 16/8/31.
import {Global} from "./global";
import {expect} from "chai";

describe("Test Global Ctrl", ()=> {
    it('Global is a function', ()=> {
        expect(Global).to.be.a('function');
    });
});