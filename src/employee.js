import * as mobileNav from "./mobile-nav.js";
import * as scrolling from "./scrolling.js";
import * as accordian from "./accordian.js";
import * as droppable from "./droppable.js";

window.onload = (e) =>{

    mobileNav.mobileNavigationMenuSetup();
    scrolling.navigationChangeColorOnScrollSetup();
    accordian.accordianSetup();
    droppable.fileDroppableSetup();

}