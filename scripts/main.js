var validationList = document.querySelector('.js-validation-list');
var success = document.querySelector('.js-success');
var form = document.querySelector('.js-form');
var inputs = form.querySelectorAll('input');
var radios = document.querySelectorAll('.js-celeb');
var otherCelebration = document.querySelector('.js-celeb-other');
var otherTextField = document.querySelector('.js-celeb-text');

// Suppress the browser validation UI
form.noValidate = true;

// Kinda bleh, but 'good enough' for this toy project
NodeList.prototype.forEach = Array.prototype.forEach;

function getValidityErrorMessages(input) {
  var name = input.name;
  var validity = input.validity;
  var msgs = [];

  if (validity.valueMissing){
    msgs.push(name + ' is missing');
  }

  if (validity.typeMismatch){
    msgs.push(name + ' is not valid for type ' + input.type);
  }

  return msgs;
}

function validateInput(input) {
  return getValidityErrorMessages(input);
}

function presentValidationErrors(messages) {
  window.scrollTo(0, 0);
  validationList.innerHTML = messages.map(function(msg) {
    return '<li>' + msg + '</li>';
  }).join('');

  validationList.parentNode.classList.remove('hidden');
}

function presentSuccessMessage() {
  window.scrollTo(0, 0);
  success.classList.remove('hidden');
}

function validateForm() {
  // Reset all existing validation errors
  var messages = [];
  validationList.innerHTML = '';
  validationList.parentNode.classList.add('hidden');

  inputs.forEach(function(input) {
    messages = messages.concat(validateInput(input));
  });

  if (messages.length) {
    presentValidationErrors(messages)
  } else {
    presentSuccessMessage();
  }
}

// Set the `required` attribute on the 'other' text box when the
// other radio box is selected
radios.forEach(function(radio) {
  radio.addEventListener('change', function() {
    otherTextField.required = otherCelebration.checked;
  })
});

//
form.addEventListener('submit', function(ev) {
  ev.preventDefault();
  validateForm();
});
