

const accordianElements = {
    accordianClass        : "accordian-container",
    accordianHiddenElement    : "accordian-hidden-element",
    accordianTriggerClass : "accordian-trigger",
    accordianOpenClass    : "accordian-open"
}

const accordianSetup = (e) => {

    let accordian = document.querySelectorAll("." + accordianElements.accordianClass);

    for(let i = 0; i < accordian.length; i++){

        let accordianTriggers = accordian[i].querySelectorAll("." + accordianElements.accordianTriggerClass);

        for(let j = 0; j < accordianTriggers.length; j++){
            accordianTriggers[j].addEventListener('click', (e) => toggleAccordian(e));
        }

    }

} 

const toggleAccordian = (e) => {

    let eventItem = e.srcElement;
    let targetListItem = getClosest(eventItem, 'li');
    let targetAccordian = getClosest(targetListItem, "." + accordianElements.accordianClass);

    if(accordianIsOpen(targetListItem))
    {
        closeAccordian(targetListItem);
    }
    else
    {
        openAccordian(targetAccordian, targetListItem);
    }
    

}

const accordianIsOpen = (targetListItem) =>
{
    return targetListItem.classList.contains(accordianElements.accordianOpenClass);
}

const closeAccordian = (targetListItem) =>
{
    targetListItem.classList.remove(accordianElements.accordianOpenClass);
}

const openAccordian = (accordian, targetListItem) =>
{
    closeOpenAccordians(accordian);

    targetListItem.classList.add(accordianElements.accordianOpenClass);

}

const closeOpenAccordians = (accordian) => {

    let openAccordians = accordian.querySelectorAll("li");
    
    for(let i = 0; i < openAccordians.length; i++)
    {
        closeAccordian(openAccordians[i]);
    }

}

const getClosest = function (elem, selector) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
	    Element.prototype.matches =
	        Element.prototype.matchesSelector ||
	        Element.prototype.mozMatchesSelector ||
	        Element.prototype.msMatchesSelector ||
	        Element.prototype.oMatchesSelector ||
	        Element.prototype.webkitMatchesSelector ||
	        function(s) {
	            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
	                i = matches.length;
	            while (--i >= 0 && matches.item(i) !== this) {}
	            return i > -1;
	        };
	}

	// Get the closest matching element
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}
	return null;

};


export { accordianSetup };