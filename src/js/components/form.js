
const url = 'https://voca.americanlaborcompany.com/';

let formElements = 
{
    formSuccess       : document.querySelector(".js-form-success"),
    formError         : document.querySelector(".js-form-error"),
    formSuccessHide   : document.querySelector(".js-form-success-hide"),
}

/**
 * Set the state of the form to be loading. We access the form loading, and button classes to set their state.
 */
const loading = () => 
{
    formElements.formLoading.classList.remove("display-none");
    formElements.formButton.classList.add("display-none");
};

/**
 * Set the error. Supply the message of the server so their is more context to the issue.
 * @param {string} message 
 */
const error = (message) => 
{
    formElements.formLoading.classList.add("display-none");
    formElements.formButton.classList.remove("display-none");

    formElements.formError.classList.remove("display-none");
    formElements.formError.querySelector('span').innerHTML = message;
};

/**
 * Set the forms state to be successful. This means we want to display the successful text.
 */
const success = () => 
{
    formElements.formLoading.classList.add("display-none");
    formElements.formSuccessHide.classList.add("display-none");

    formElements.formSuccess.classList.remove("display-none");
};

/**
 * Reset the visibility of the component by hiding all of the different components.
 */
const resetVisibility = () => 
{
    formElements.formLoading.classList.add("display-none");
    formElements.formError.classList.add("display-none");
    formElements.formSuccess.classList.add("display-none");
}

/**
 * Submit the form. Check the validity first, then if we are valid submit the data.n
 * @param {Event} e 
 * @param {string} endpoint 
 */
const submitForm = (e, endpoint) => 
{
    e.preventDefault(); // Turn off default form behavior
    resetVisibility();

    if(formElements.form.checkValidity())
    {
        loading();
        sendPostData(e.target, endpoint);
    }
    else
    {
        formElements.form.reportValidity();
    }

};

/**
 * Send the data to the backend servern
 * @param {Element} postData 
 * @param {string} endpoint 
 */
const sendPostData = (e, endpoint) => 
{
    // Post data to server here.
    const data = new FormData(e);
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url + endpoint, true);

    // We only accept json in return
    xhr.setRequestHeader('Accept', 'application/json'); 

    // Detect if we recieved an error or not.
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

    // If we have an error set the message to server down.
    xhr.onerror = function() {
        error("Server down.");
    }

    // Try sending the data
    xhr.send(data);
};

/**
 * Set the form elements so we can do it in the context of the current form.
 * @param {Element} form 
 */
const setFormElements = (form) => 
{
    formElements.form           = form;
    formElements.formButton     = form.querySelector(".js-form-button");
    formElements.formLoading    = form.querySelector(".js-form-loading");
};

/**
 * Setup the form item to be prepared for submitting.
 * @param {string} formId 
 * @param {string} endpoint 
 */
const formSetup = (formId, endpoint) => 
{
    let form = document.querySelector(`#${formId}`);
    setFormElements(form);

    form.addEventListener("submit", (e) => submitForm(e, endpoint));
};


export { formSetup };