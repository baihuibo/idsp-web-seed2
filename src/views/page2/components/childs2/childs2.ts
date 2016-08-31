// Created by baihuibo on 16/8/30.
import {Controller, Route} from "../../../../common/annotation";

@Route({
    url: '/childs2',
    state: 'page2.childs2',
    controllerAs: 'Child2',
    template: require('./childs2.html')
})
@Controller
export class Page2Child2Ctrl {

}