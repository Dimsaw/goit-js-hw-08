import throttle from 'lodash.throttle';

const form = document.querySelector('form ');
const textarea = document.querySelector('textarea');
const input = document.querySelector('input');

form.addEventListener('input', throttle(areaOfInputs, 500));
form.addEventListener('submit', submitForm);

const LOCALSTORAGE_KEY = 'feedback-form-state';
populateTextarea();
const formData = {};

function submitForm(evt) {
  evt.preventDefault();

  evt.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  console.log(formData);
}

function areaOfInputs(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(LOCALSTORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);
  if (parsedMessage) {
    textarea.value = parsedMessage.message;
    input.value = parsedMessage.email;
  }
}
