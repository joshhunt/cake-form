# Cake Form

Simple HTML form for ordering a cake, complete

## Getting Started

* `npm install` to install all dependencies, then,
* `npm start` to serve the site immediately on localhost:3000.  
* `npm test` to lint the Javascripts and run unit tests.

## Dependencies

This project has no run-time dependencies, and minimal amount of dependencies used for development.

* **`Gulp`** is used as a task runner behind the scenes, exposed through `npm start`
	* **`gulp-rename`** renames the output files with friendlier names
	* **`gulp-stylus`** is our stylesheet preprocessor
	* **`serve-static`** and **`finalhandler`** are used to serve the site and static files
* **`ESLint`** is used as the linter to ensure our Javascript conforms to a standard
	* **`eslint-config-airbnb-base`** provides the linting standard, from AirBNB (which requires **`eslint-plugin-import`** even though we don't use it)
* **`Ava`** is for our tests.
	* **`JSDOM`** is used to set up a DOM-like environment under Node so we can run our application code and tests without requiring a full browser.
	* In hindsight, this might not have been the best idea - it does end up being a bit awkward to 'restart' the page before each test. Perhaps a headless browser (like CasperJS) would have been better.