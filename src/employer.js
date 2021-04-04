import * as mobileNav from "./mobile-nav.js";
import * as scrolling from "./scrolling.js";
import * as accordian from "./accordian.js";
import * as form      from "./form.js";

const createJobFormInputs = () => 
{
    const companyValues = {
        "name"    : "input|company-name",
        "industry": "input|industry",
        "size"    : "input|company-size",
        "info"    : "input|info",
    }

    const userValues = {
        "name"    : "input|name",
        "email"   : "input|email",
        "phone"   : "input|phone",
        'role_id' : 3
    }

    const employeeValues = {
        "company_id"          : "dependent|company.id",
        "user_id"             : "dependent|user.id",

    }

    return  { 
        "user"     : userValues,
        "company"  : companyValues, 
        "employee" : employeeValues
    };

}

window.onload = (e) =>{

    mobileNav.mobileNavigationMenuSetup();
    scrolling.navigationChangeColorOnScrollSetup();
    accordian.accordianSetup();
    form.formSetup("employee-form", createJobFormInputs());

}