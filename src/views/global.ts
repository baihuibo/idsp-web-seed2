// Created by baihuibo on 16/8/30.
import {BeforeRun} from "../common/annotation";
import {values} from "lodash";

@BeforeRun
export class Global {
    constructor($rootScope, $state) {
        $rootScope.$state = $state;
    }
}
