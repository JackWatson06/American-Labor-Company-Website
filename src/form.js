const endpoint = "./php/proxy.php";
let returnedData = {};

const submitForm = (e, form, inputs) => 
{
    e.preventDefault(); // Turn off default form behavior

    if(form.checkValidity())
    {
        sendPostData(inputs);
    }
    else
    {
        form.reportValidity();
    }

}

const sendPostData = async (inputs) => 
{
    for (const [resource, inputValues] of Object.entries(inputs)) {

        const postData = postResource(inputValues);  
        const proxyPromise = postToProxy(resource, postData);

        await proxyPromise;
    }
}

const postResource = (inputValues) =>
{
    let postData = {};
    for (const [input, rule] of Object.entries(inputValues)) {
        postData[input] = getValueFromRule(rule);
    }

    return postData;
}

const getValueFromRule = (rule) =>
{
    let valueSplit = String(rule).split('|');

    if(valueSplit.length > 1)
    {
        switch(valueSplit[0])
        {
            case "input":
                return getValueFromInput(valueSplit[1]);
            case "file":
                return getFileFromInput(valueSplit[1]);
            case "dependent":
                return getValueFromDependent(valueSplit[1]);
            default:
                return null;
        }
    }

    return rule;
}

const getValueFromInput = (id) => 
{
    let inputValue = document.querySelector("#" + id).value;
    return inputValue === null ? "" : inputValue;
}


const getFileFromInput = (id) => 
{
    let file = document.querySelector("#" + id).files[0];
    return file === null ? "" : file;
}

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
}

const postToProxy = (mode, postData) => {
    
    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();
        const data = createFormData(postData);

        xhr.open("POST", `${endpoint}?mode=${mode}`, true);
    
        xhr.onload = function() {
            console.log(this.responseText);
            returnedData[mode] = JSON.parse(this.responseText); 
            resolve();
        }
    
        xhr.onerror = function() {
            reject();
        }

        xhr.send(data);

    });
}

const createFormData = (postData) =>
{
    const data = new FormData();

    for (let key in postData) {
        data.append(key, postData[key]);
    }

    return data;
}


const formSetup = (formId, formInputs) => {
    let form = document.querySelector(`#${formId}`);

    form.addEventListener("submit", (e) => submitForm(e, form, formInputs));
}


export { formSetup };