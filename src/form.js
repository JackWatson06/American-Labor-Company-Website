const endpoint = "./php/proxy.php";
let returnedData = {};

let formElements = {
    formSuccess       : document.querySelector("#form-success"),
    formError         : document.querySelector("#form-error"),
    formSuccessHide   : document.querySelector("#form-success-hide"),
}



const loading = () => 
{
    formElements.formLoading.classList.remove("display-none");
    formElements.formButton.classList.add("display-none");
};



const error = (message) => 
{
    formElements.formLoading.classList.add("display-none");
    formElements.formButton.classList.remove("display-none");

    formElements.formError.classList.remove("display-none");
    formElements.formError.querySelector('span').innerHTML = message;
};



const success = () => 
{
    formElements.formLoading.classList.add("display-none");
    formElements.formSuccessHide.classList.add("display-none");

    formElements.formSuccess.classList.remove("display-none");
};



const resetVisibility = () => {
    formElements.formLoading.classList.add("display-none");
    formElements.formError.classList.add("display-none");
    formElements.formSuccess.classList.add("display-none");
}



const submitForm = (e, inputs) => 
{
    e.preventDefault(); // Turn off default form behavior
    resetVisibility();

    if(formElements.form.checkValidity())
    {
        loading();
        sendPostData(inputs);
    }
    else
    {
        formElements.form.reportValidity();
    }

};



const sendPostData = async (inputs) => 
{
    for (const [resource, inputValues] of Object.entries(inputs)) {

        if(isResourceInvalid(resource)) continue;

        const postData = postResource(inputValues);  

        try
        {
            await postToProxy(resource.split(',')[0], postData);
        }
        catch(err)
        {
            error(err);
            return;
        }
    }

    success();
};



const isResourceInvalid = (resource) => {

    let resourceNameSplit = resource.split(",");

    console.log(resourceNameSplit);

    if(resourceNameSplit.length > 1)
    {
        console.log(getValueFromRule(resourceNameSplit[1]));
        if(getValueFromRule(resourceNameSplit[1]))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    return false;
}



const postResource = (inputValues) =>
{
    let postData = {};
    for (const [input, rule] of Object.entries(inputValues)) {
        postData[input] = getValueFromRule(rule);
    }

    return postData;
};



const getValueFromRule = (rule) =>
{
    let valueSplit = String(rule).split('|');

    if(valueSplit.length > 1)
    {
        let inputName = valueSplit[valueSplit.length - 1];

        switch(valueSplit[0])
        {
            case "input":
                return getValueFromInput(inputName);
            case "file":
                return getFileFromInput(inputName);
            case "dependent":
                return getValueFromDependent(inputName);
            default:
                return null;
        }
    }

    return rule;
};



const getValueFromInput = (id) => 
{
    let inputValue = document.querySelector("#" + id).value;
    return inputValue === null ? "" : inputValue;
};



const getFileFromInput = (id) => 
{
    let file = document.querySelector("#" + id).files[0];
    return file === null ? "" : file;
};



const getValueFromDependent = (dependent) =>
{
    let dependentSplit = dependent.split('.');
    let returnValue = returnedData;

    for(let i = 0; i < dependentSplit.length; i++)
    {
        let objectValue = dependentSplit[i];
        returnValue = returnValue[objectValue];
    }

    return returnValue;
};



const postToProxy = (mode, postData) => {
    
    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();
        const data = createFormData(postData);

        xhr.open("POST", `${endpoint}?mode=${mode}`, true);
    
        xhr.onloadend = function() 
        {
            if(xhr.status >= 400)
            {
                reject("Server down.");
            }
            else
            {
                returnedData[mode] = JSON.parse(this.responseText); 
                resolve();
            }
        }
    
        xhr.onerror = function() {
            reject();
        }

        xhr.send(data);

    });
};



const createFormData = (postData) =>
{
    const data = new FormData();

    for (let key in postData) {
        data.append(key, postData[key]);
    }

    return data;
};



const setFormElements = (form) => 
{
    formElements.form = form;
    formElements.formButton = form.querySelector(".form-button");
    formElements.formLoading = form.querySelector(".form-loading");
};


const formSetup = (formId, formInputs) => 
{
    let form = document.querySelector(`#${formId}`);
    setFormElements(form);

    form.addEventListener("submit", (e) => submitForm(e, formInputs));
};


export { formSetup };