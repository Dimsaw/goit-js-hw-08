import throttle from 'lodash.throttle';

const form = document.querySelector('form ');
const textarea = document.querySelector('textarea');
const input = document.querySelector('input');

form.addEventListener('input', throttle(areaOfInputs, 500));
form.addEventListener('submit', submitForm);

const LOCALSTORAGE_KEY = 'feedback-form-state';

populateTextarea();

function submitForm(evt) {
  evt.preventDefault();
  evt.target.reset();
  console.log(LOCALSTORAGE_KEY, JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  localStorage.removeItem(LOCALSTORAGE_KEY);
  // console.log(formData);
}
const formData = {};
function areaOfInputs(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(
    LOCALSTORAGE_KEY,
    JSON.stringify({
      email: input.value,
      message: textarea.value,
    }),
  );
}
function populateTextarea() {
  const savedMessage = localStorage.getItem(LOCALSTORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);
  if (parsedMessage) {
    textarea.value = parsedMessage.message;
    input.value = parsedMessage.email;
    console.log(parsedMessage);
  }
}
