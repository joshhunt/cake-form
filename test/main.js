const fs = require('fs');

const test = require('ava');
const jsdom = require('jsdom');

const pageHtml = fs.readFileSync('../index.html', 'utf-8');

const find = select => document.querySelector(select);
const trigger = (node, ev) => node.dispatchEvent(new window.Event(ev));

test.beforeEach(() => {
  const path = '../scripts/main';
  delete require.cache[require.resolve(path)];
  global.document = jsdom.jsdom(pageHtml);
  global.window = document.defaultView;
  global.navigator = window.navigator;
  require(path); // eslint-disable-line
});

test('set novalidate on the form to true', t => {
  t.true(find('.js-form').noValidate);
});

test('show the error div when the form is submitted when invalid', t => {
  trigger(find('form'), 'submit');

  t.false(find('.validation').classList.contains('hidden'));
});

test('not show the success div when the form is submitted when invalid', t => {
  trigger(find('form'), 'submit');

  t.true(find('.js-success').classList.contains('hidden'));
});

test('show error message for missing name', t => {
  trigger(find('form'), 'submit');

  t.true(document.body.innerHTML.includes('name is missing'));
});

test('show error message for missing email', t => {
  trigger(find('form'), 'submit');

  t.true(document.body.innerHTML.includes('email is missing'));
});

test('show error message for invalid email', t => {
  find('[name=email]').value = 'josh';
  trigger(find('form'), 'submit');

  t.true(document.body.innerHTML.includes('email is not valid for type email'));
});

test('not show error message for missing other field by default', t => {
  trigger(find('form'), 'submit');

  t.false(document.body.innerHTML.includes('celebration other type is missing'));
});

test('show error message for missing other field when other checkbox is selected', t => {
  find('.js-celeb-other').checked = true;
  trigger(find('.js-celeb-other'), 'change');
  trigger(find('form'), 'submit');

  t.true(document.body.innerHTML.includes('celebration other type is missing'));
});

test('show success div when the form is submitted as valid', t => {
  find('[name=name]').value = 'josh';
  find('[name=email]').value = 'hi@email.com';
  trigger(find('form'), 'submit');

  t.false(find('.js-success').classList.contains('hidden'));
});

test('not show error div when all required fields are completed', t => {
  find('[name=name]').value = 'josh';
  find('[name=email]').value = 'hi@email.com';
  trigger(find('form'), 'submit');

  t.true(find('.validation').classList.contains('hidden'));
});
