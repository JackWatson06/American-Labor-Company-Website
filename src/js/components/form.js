
let formElements = {
    formSuccess       : document.querySelector(".js-form-success"),
    formError         : document.querySelector(".js-form-error"),
    formSuccessHide   : document.querySelector(".js-form-success-hide"),
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



const submitForm = (e, postDataCallback, endpoint) => 
{
    e.preventDefault(); // Turn off default form behavior
    resetVisibility();

    if(formElements.form.checkValidity())
    {
        loading();
        sendPostData(postDataCallback(), endpoint);
    }
    else
    {
        formElements.form.reportValidity();
    }

};



const sendPostData = (postData, endpoint) => 
{
    // Post data to server here.
    const data = createFormData(postData);
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `https://voca.americanlaborcompany.com/${endpoint}`, true);

    xhr.setRequestHeader('Accept', 'application/json'); 

    xhr.onloadend = function() 
    {
        if(xhr.status >= 400)
        {
            error("Server down.");
        }
        else
        {
            success();
        }
    }

    xhr.onerror = function() {
        error("Server down.");
    }

    xhr.send(data);

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
    formElements.formButton = form.querySelector(".js-form-button");
    formElements.formLoading = form.querySelector(".js-form-loading");
};


const formSetup = (formId, postDataCallback, endpoint) => 
{
    let form = document.querySelector(`#${formId}`);
    setFormElements(form);

    form.addEventListener("submit", (e) => submitForm(e, postDataCallback, endpoint));
};


export { formSetup };