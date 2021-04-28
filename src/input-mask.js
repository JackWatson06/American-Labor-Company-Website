import * as maskedInput from "./lib/maskedInput.js";

const inputMaskSetup = () => {

    maskedInput.maskedInputSetup();

    let telephoneFields = document.querySelectorAll('input[type=tel]');

    telephoneFields.forEach(telephoneField => $(telephoneField).mask("(999) 999-9999"));
}


export { inputMaskSetup };