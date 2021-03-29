import * as mobileNav from "./mobile-nav.js";
import * as scrolling from "./scrolling.js";
import * as accordian from "./accordian.js";
import * as droppable from "./droppable.js";
import * as select   from "./select.js";


const submitForm = (e, form) => 
{
    e.preventDefault();

    let xhr = new XMLHttpRequest();
    let data = new FormData(form); 

    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader("Content-type", "multipart/form-data");

    xhr.onload = function() {
        console.log(this.responseText); // whatever the server returns
    }
    
    xhr.send(data);
    
}


const assignFormEvent = () =>
{
    let form = document.querySelector("#job-form");

    form.addEventListener("submit", (e) => submitForm(e, form));
}


window.onload = (e) =>{

    mobileNav.mobileNavigationMenuSetup();
    scrolling.navigationChangeColorOnScrollSetup();
    accordian.accordianSetup();
    droppable.fileDroppableSetup();
    select.selectSetup();

    assignFormEvent();

}