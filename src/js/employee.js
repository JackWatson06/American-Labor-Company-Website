
const jquery = requrie('jquery');
const select2 = require('select2');

import * as mobileNav from "./mobile-nav.js";
import * as scrolling from "./scrolling.js";
import * as droppable from "./droppable.js";
import * as inputMask from "./input-mask.js";
import * as select    from "./select.js";
import * as form      from "./form.js";


const createJobFormInputs = () => 
{

    // Options for the form input.
    // Key is the name of the field we need on the server.
    // Input - stands for input from field,
    // Dependent - stands for depending on result from previous request.
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const trade = document.querySelector("#trade").value;
    const info = document.querySelector("#info").value;
    const resume = document.querySelector("#resume").files[0];

    let postData = {
        "user_name"    : name,
        "user_email"   : email,
        "user_phone"   : phone,
        "user_trade"   : trade,
        "user_role_id" : 2
    }

    if(info != "" && info != null) postData["user_info"] = info;
    if(resume != "" && resume != null)
    {
        postData["document_file"] = resume;
        postData["document_document_usage_id"] = 1;
    } 

    return postData;
}

window.onload = (e) =>{

    mobileNav.mobileNavigationMenuSetup();
    scrolling.navigationChangeColorOnScrollSetup();
    droppable.fileDroppableSetup();
    select.selectSetup();
    inputMask.inputMaskSetup();
    form.formSetup("job-form", createJobFormInputs, "api/worker");

}