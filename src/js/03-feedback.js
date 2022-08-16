import throttle from "lodash.throttle";

let formData = {};
const STORAGE_KEY = 'feedback-message';

const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

// refs.textarea.addEventListener('input', throttle(onTextAreaInput, 500));
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

let savedForm = null;

populateTextArea();

function onFormSubmit(event) {
    event.preventDefault();
    if (refs.email.value && refs.textarea.value) {
        event.currentTarget.reset();
        // console.log(event.currentTarget);
        localStorage.removeItem(STORAGE_KEY);
        savedForm = null;
        console.log(savedForm);
    } else {
        return alert("Fill all lines")
    }

}

function onFormInput(evt) { 
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextArea() {
    savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedForm) {
        formData = savedForm; // без цього заново перезаписувався об"єкт
        refs.textarea.value = savedForm.message || '';
        refs.email.value = savedForm.email || '';
    }

    // if (!savedForm) {
    //     return
    // }
    // if (savedForm.email || savedForm.message) {
    //     refs.email.value = savedForm.email;
    //     refs.textarea.value = savedForm.message;
    // }
}


