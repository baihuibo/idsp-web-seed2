// Created by baihuibo on 16/8/30.

import {Controller, Route} from "../../common/annotation";

@Route({
    url: '/page1',
    state: 'page1',
    controllerAs: 'Page1Ctrl',
    template: require('./page1.html')
})
@Controller
export class Page1Ctrl {
    constructor($scope , TestServer) {


    }

    fn() {
        console.log('page1.fn1');
    }
}