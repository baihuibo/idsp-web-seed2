// Created by baihuibo on 16/8/30.
import {Controller, Route} from "../../../../common/annotation";

@Route({
    url: '/childs1',
    state: 'page2.childs1',
    controllerAs: 'Child1',
    template: require('./childs1.html')
})
@Controller
export class Page2Child1Ctrl {
    static $inject = ['$stateParams'];
    constructor($stateParams ) {

    }
}