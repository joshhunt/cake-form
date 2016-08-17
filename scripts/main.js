var validationContainer = document.querySelector('.validation-errors');
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

function validateForm() {
  var validityMessages = [];

  validationContainer.innerHTML = '';
  validationContainer.classList.add('hide');

  inputs.forEach();

  var formIsValid = !validityMessages.length;

  if (!formIsValid) {
    validationContainer.innerHTML = validityMessages.map(function(msg) {
      return '<li>' + msg + '</li>';
    }).join('');

    validationContainer.classList.remove('hide');
  }

  return formIsValid;
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
});
