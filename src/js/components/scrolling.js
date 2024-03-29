/*

    Author: Jack Watson
    Date Created: 2/25/2021
    Purpose: Provide javascript code for the ALC website.

*/

import * as navigationHelper from "./navigation-helper.js";

const navigationChangeColorOnScrollSetup = () => {
    const navElements = navigationHelper.getMobileNavigationElements();    

    window.addEventListener('scroll', e => handleNavigation(e, navElements));
    applyClassBasedOnScrollBounds(window, navElements);
}

const handleNavigation = (e, navElements) => {
    const window = e.currentTarget;
    applyClassBasedOnScrollBounds(window, navElements);
};

const applyClassBasedOnScrollBounds = (window, navElements) => {
    const minPixelThresholdForScroll = 10;

    if(window.scrollY <= minPixelThresholdForScroll){
        navElements.mobileNavContainer.classList.remove("nav-bar-scrolling");
        navElements.navContainer.classList.remove("nav-bar-scrolling");
    }else{
        navElements.mobileNavContainer.classList.add("nav-bar-scrolling");
        navElements.navContainer.classList.add("nav-bar-scrolling");
    }
}

export { navigationChangeColorOnScrollSetup }
