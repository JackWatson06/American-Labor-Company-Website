
const droppableElements = {

    dropArea          : "drop-area",
    dropHighlight     : "drop-highlight",
    dropInput         : "drop-input",
    dropFileContainer : "drop-file-container"

}


const fileDroppableSetup = () => {

    const dropArea = document.querySelector("." + droppableElements.dropArea);

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });


    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlightDrop, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unHighlightDrop, false);
    });
}

const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
}

const highlightDrop = (e) => {
    document.querySelector("." + droppableElements.dropHighlight).classList.add('drop-highlighted');
}

const unHighlightDrop = (e) => {
    document.querySelector("." + droppableElements.dropHighlight).classList.remove('drop-highlighted');
}

export { fileDroppableSetup };