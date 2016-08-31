// Created by baihuibo on 16/8/30.
import {BeforeRun} from "../common/annotation";

@BeforeRun
export class Global {
    constructor($rootScope, $state) {
        "ngInject";
        $rootScope.$state = $state;
    }
}
