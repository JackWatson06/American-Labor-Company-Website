import * as mobileNav from "./mobile-nav.js";
import * as scrolling from "./scrolling.js";
import * as accordian from "./accordian.js";
import * as droppable from "./droppable.js";
import * as select    from "./select.js";
import * as form      from "./form.js";


const createJobFormInputs = () => 
{

    // Options for the form input.
    // Key is the name of the field we need on the server.
    // Input - stands for input from field,
    // Dependent - stands for depending on result from previous request.

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

    // This specifies two requests, one for user endpoint, one for document enpoint.

    return  { 
        "user" : userValues, 
        "document,file|resume" : documentValues,
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