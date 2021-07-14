
const droppableElements = {
    dropArea          : "drop-area",
    dropHighlight     : "drop-highlight",
    dropInput         : "drop-input",
    dropFileContainer : "drop-file-container",
    dropText          : "drop-text",
    dropGallary       : "drop-gallery",
    dropButton        : "drop-button",
    dropFile          : "drop-file",
    dropUsage         : "drop-usage",
    dropRemove        : "drop-remove"
}

const validFiles = 
[
    "text/csv", //csv
    "text/plain", //txt
    "application/vnd.ms-excel", //xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", //xlsx
    "application/pdf", //pdf
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", //docx
    "application/msword" //doc
]


const fileDroppableSetup = () => 
{
    const dropArea = document.querySelector("." + droppableElements.dropArea);
    const removeFile = document.querySelector("." + droppableElements.dropRemove);
    const fileInput = document.querySelector("." + droppableElements.dropInput);

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
    fileInput.addEventListener('change', fileButtonUpload);
    removeFile.addEventListener('click', removeFileFromGallary);
}

const preventDefaults = (e) => 
{
    e.preventDefault();
    e.stopPropagation();
}

const highlightDrop = (e) => 
{
    document.querySelector("." + droppableElements.dropHighlight).classList.add('drop-highlighted');
}

const unHighlightDrop = (e) => 
{
    document.querySelector("." + droppableElements.dropHighlight).classList.remove('drop-highlighted');
}

const fileButtonUpload = (e) => 
{
    handleFiles(e.target.files);
}

const handleDrop = (e) => 
{

    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files)
}

const handleFiles = (files) => 
{

    // Make sure we do not upload more than a single file
    if(files.length > 1)
    {
        alert("Please just upload a single file.");
        return;
    }

    // Make sure the file is a specific type
    if(!validFiles.includes(files[0].type))
    {
        alert("Invalid file format. Only Mircosoft Word, Excel, Text, or PDF files are allowed.");
        return;
    }

    // Set the input field of the document selector
    let inputField = document.querySelector("." + droppableElements.dropInput);
    let usageField = document.querySelector("." + droppableElements.dropUsage);
    inputField.files = files;
    inputField.setAttribute("name", "document[file]");
    usageField.setAttribute("name", "document[document_usage_id]");

    showGallaryFromFile(inputField.files[0]);
    hideText();

}

const showGallaryFromFile = (file) => 
{
    showGallary();
    hideText();

    document.querySelector("." + droppableElements.dropFile).innerHTML = file.name;
}

const removeFileFromGallary = (file) => 
{
    hideGallary();
    showText();

    // Set the input fields for the document upload to be invalid
    let inputField = document.querySelector("." + droppableElements.dropInput);
    let usageField = document.querySelector("." + droppableElements.dropUsage);

    inputField.value = null;
    inputField.removeAttribute('name');
    usageField.removeAttribute('name');
}

const hideGallary = () => 
{
    document.querySelector("." + droppableElements.dropGallary).classList.add("display-none");
}

const showGallary = () => 
{
    document.querySelector("." + droppableElements.dropGallary).classList.remove("display-none");
}

const hideText = () => 
{
    document.querySelector("." + droppableElements.dropText).classList.add("display-none");
}

const showText = () => 
{
    document.querySelector("." + droppableElements.dropText).classList.remove("display-none");
}

export { fileDroppableSetup };