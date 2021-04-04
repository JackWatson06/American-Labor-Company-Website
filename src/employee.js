import * as mobileNav from "./mobile-nav.js";
import * as scrolling from "./scrolling.js";
import * as accordian from "./accordian.js";
import * as droppable from "./droppable.js";
import * as select    from "./select.js";
import * as form      from "./form.js";


const createJobFormInputs = () => 
{
    const userValues = {
        "name"    : "input|name",
        "email"   : "input|email",
        "phone"   : "input|phone",
        "trade"   : "input|trade",
        "info"    : "input|info",
        'role_id' : 2
    }

    const documentValues = {
        "file"                : "file|resume",
        "user_id"             : "dependent|user.id",
        "document_usage_id"   : 1,
    }

    return  { 
        "user" : userValues, 
        "document" : documentValues,
    };

}

window.onload = (e) =>{

    mobileNav.mobileNavigationMenuSetup();
    scrolling.navigationChangeColorOnScrollSetup();
    accordian.accordianSetup();
    droppable.fileDroppableSetup();
    select.selectSetup();
    form.formSetup("job-form", createJobFormInputs());

}