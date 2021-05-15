const getMobileNavigationElements = () =>
{
    const navigationElements = {
        navContainer : document.querySelector("#nav-container"),
        mobileNavContainer : document.querySelector("#mobile-nav-container"),
        mobileNavMenuContainer : document.querySelector("#mobile-nav-menu-container"),
        hamburgerIcon : document.querySelector("#hamburger-icon"),
        chevronIcon : document.querySelector("#chevron-icon")
    };

    return navigationElements;
}

export { getMobileNavigationElements }