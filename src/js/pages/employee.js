
const css = require("../../css/employee.css");
const select2 = require('select2');

import * as mobileNav from "../components/mobile-nav.js";
import * as scrolling from "../components/scrolling.js";
import * as droppable from "../components/droppable.js";
import * as inputMask from "../components/input-mask.js";
import * as select    from "../components/select.js";
import * as form      from "../components/form.js";


window.onload = (e) =>{

    mobileNav.mobileNavigationMenuSetup();
    scrolling.navigationChangeColorOnScrollSetup();
    droppable.fileDroppableSetup();
    select.selectSetup();
    inputMask.inputMaskSetup();
    form.formSetup("job-form", "api/worker_leads");

}