# Environment Setup for Automation Task

## Prerequisites
* Node.js and NPM should be installed and available from command line
  * To check that NPM is installed, run `npm` command in console
* Google Chrome browser is installed

## Solution setup
- Run `npm install` command to fetch all dependencies
- If you get an error from incorrect webdriver version or missing webdriver, run the below command from the project folder

```bash
node node_modules/protractor/bin/webdriver-manager update
```

## Running end-to-end tests
Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).