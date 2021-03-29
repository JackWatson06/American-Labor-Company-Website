
const droppableElements = {
    dropArea          : "drop-area",
    dropHighlight     : "drop-highlight",
    dropInput         : "drop-input",
    dropFileContainer : "drop-file-container",
    dropText          : "drop-text",
    dropGallary       : "drop-gallery",
    dropButton        : "drop-button",
    dropFile          : "drop-file",
    dropRemove        : "drop-remove"
}


const fileDroppableSetup = () => {

    const dropArea = document.querySelector("." + droppableElements.dropArea);
    const removeFile = document.querySelector("." + droppableElements.dropRemove);

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });


    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlightDrop, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unHighlightDrop, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);
    removeFile.addEventListener('click', removeFileFromGallary);

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

const handleDrop = (e) => {

    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files)
}


const handleFiles = (files) => {

    if(files.length > 1)
    {
        alert("Please just upload a single file.");
        return;
    }

    let inputField = document.querySelector("." + droppableElements.dropInput);

    inputField.files = files;

    showGallaryFromFile(inputField.files[0]);
    hideText();

}

const showGallaryFromFile = (file) => {

    showGallary();
    hideText();

    document.querySelector("." + droppableElements.dropFile).innerHTML = file.name;
}

const removeFileFromGallary = (file) => {

    hideGallary();
    showText();

    let inputField = document.querySelector("." + droppableElements.dropInput);
    inputField.value = null;

}

const hideGallary = () => {
    document.querySelector("." + droppableElements.dropGallary).classList.add("display-none");
}

const showGallary = () => {
    document.querySelector("." + droppableElements.dropGallary).classList.remove("display-none");
}

const hideText = () => {
    document.querySelector("." + droppableElements.dropText).classList.add("display-none");
}

const showText = () => {
    document.querySelector("." + droppableElements.dropText).classList.remove("display-none");
}

export { fileDroppableSetup };