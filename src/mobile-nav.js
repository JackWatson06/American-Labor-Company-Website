/*

    Author: Jack Watson
    Date Created: 2/25/2021
    Purpose: Provide javascript code for the ALC website.

*/
(function() {
    const init = () =>{

        mobileNavigationMenuSetup();

    }

    const mobileNavigationMenuSetup = () => 
    {
        const navElements =  getMobileNavigationElements();
        navElements.mobileNavContainer.addEventListener('click', e => toggleNav(e, navElements));
    }

    const toggleNav = (e, navElements) => 
    {
        navIsOpen = !navIsOpen;
        if(navIsOpen)
        {
            showNav(e, navElements);
        }
        else
        {
            hideNav(e, navElements);
        }
    }

    const hideNav = (e, navElements) => 
    {
        navElements.mobileNavMenuContainer.style.transform = "translateY(-100%)"
        navElements.mobileNavContainer.style.top = `0px`;

        navElements.hamburgerIcon.classList.remove("display-none");
        navElements.chevronIcon.classList.add("display-none");
    }

    const showNav = (e, navElements) => 
    {
        navElements.mobileNavMenuContainer.style.transform = "translateY(0%)"
        navElements.mobileNavContainer.style.top = `${navElements.mobileNavMenuContainer.offsetHeight}px`;

        navElements.mobileNavContainer.classList.add("nav-bar-scrolling");
        navElements.hamburgerIcon.classList.add("display-none");
        navElements.chevronIcon.classList.remove("display-none");
    }


    window.onload = (e) => {

        init();

    }
})();