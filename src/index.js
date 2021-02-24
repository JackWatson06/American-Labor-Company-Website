window.onload = (e) => {

    let bound = 10;
    let navigationBar = document.querySelector("#mobile-nav-container");

    handleNavigation = (e) => {
        const window = e.currentTarget;
        applyClassBasedOnScrollBounds(window);
    };

    applyClassBasedOnScrollBounds = (window) => {
        if(window.scrollY <= bound){
            navigationBar.classList.remove("nav-bar-scrolling");
        }else{
            navigationBar.classList.add("nav-bar-scrolling");
        }
    }


    window.addEventListener('scroll', e => this.handleNavigation(e));
    applyClassBasedOnScrollBounds(window);
    
}