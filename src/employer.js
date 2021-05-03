import * as mobileNav from "./mobile-nav.js";
import * as scrolling from "./scrolling.js";
import * as inputMask from "./input-mask.js";
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
    const companyName = document.querySelector("#company-name").value;
    const industry = document.querySelector("#industry").value;
    const companySize = document.querySelector("#company-size").value;
    const info = document.querySelector("#info").value;

    let postData = {
        "user_name"        : name,
        "user_email"       : email,
        "user_phone"       : phone,
        "company_name"     : companyName,
        "company_industry" : industry,
        "user_role_id"     : 3
    }

    if(info != "" && info != null) postData["company_info"] = info;
    if(companySize != "" && companySize != null) postData["company_size"] = companySize;

    return postData;
}

window.onload = (e) =>{

    mobileNav.mobileNavigationMenuSetup();
    scrolling.navigationChangeColorOnScrollSetup();
    inputMask.inputMaskSetup();
    form.formSetup("employee-form", createJobFormInputs, "api/employer");

}