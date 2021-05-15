
import * as mobileNav from "./mobile-nav.js";
import * as scrolling from "./scrolling.js";

window.onload = (e) =>{

    mobileNav.mobileNavigationMenuSetup();
    scrolling.navigationChangeColorOnScrollSetup();

}