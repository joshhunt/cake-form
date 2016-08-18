(function () {
  const validationList = document.querySelector('.js-validation-list');
  const success = document.querySelector('.js-success');
  const form = document.querySelector('.js-form');
  const inputs = form.querySelectorAll('input');
  const radios = document.querySelectorAll('.js-celeb');
  const otherCelebration = document.querySelector('.js-celeb-other');
  const otherTextField = document.querySelector('.js-celeb-text');

  // Suppress the browser validation UI
  form.noValidate = true;

  // Kinda bleh, but 'good enough' for this toy project
  window.NodeList.prototype.forEach = Array.prototype.forEach;
  window.NodeList.prototype.map = Array.prototype.map;

  function validateInput(input) {
    // Would be nice to use input.validity here,
    // but browser support is iffy
    const name = input.name;
    const value = input.value;

    if (input.required && !value.length) {
      return name + ' is missing';
    }

    if (input.type === 'email' && !/@/.test(value)) {
      return name + ' is not valid for type ' + input.type;
    }

    return null;
  }

  function presentValidationErrors(messages) {
    window.scrollTo(0, 0);
    validationList.innerHTML = messages.map(function (msg) {
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
    validationList.innerHTML = '';
    validationList.parentNode.classList.add('hidden');

    // Get a single error message from each input and remove the empty entries
    const messages = inputs.map(validateInput).filter(Boolean);

    if (messages.length) {
      presentValidationErrors(messages);
    } else {
      presentSuccessMessage();
    }
  }

  // Set the `required` attribute on the 'other' text box when the
  // other radio box is selected
  radios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      otherTextField.required = otherCelebration.checked;
    });
  });

  // Set up the submit listener to validate the form
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    validateForm();
  });
}());
