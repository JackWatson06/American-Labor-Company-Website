
const css = require("../../css/index.css");

import * as mobileNav from "../components/mobile-nav.js";
import * as scrolling from "../components/scrolling.js";

window.onload = (e) =>{

    mobileNav.mobileNavigationMenuSetup();
    scrolling.navigationChangeColorOnScrollSetup();

}