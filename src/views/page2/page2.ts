// Created by baihuibo on 16/8/30.

import {Controller, Route} from "../../common/annotation";
import "./components/childs1/childs1";
import "./components/childs2/childs2";

@Route({
    url: '/page2',
    state: 'page2',
    controllerAs: 'page2',
    template: require('./page2.html')
})
@Controller
export class Page2Ctrl {
    constructor(public $scope, public $state) {
        "ngInject";

        $scope.$on('$stateChangeSuccess', function () {
            let {state} = $state.current;
            if (state && state.indexOf('childs') == -1) {
                $state.go('page2.childs1', {contactId: 1});
            }
        });
    }
}
