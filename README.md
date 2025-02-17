# par-cypress-automation-tests
Primary Authority Register (PAR) Cypress Automation Test

## Overview

The PAR Cypress Automation Tests project is designed to automate the testing of the Primary Authority Register (PAR) application.
This repository includes frameworks and test scripts for **UI**, **API**, and **Accessibility** testing, ensuring comprehensive coverage of functional and non-functional requirements.

## Key Features
- **UI Testing:** Automated end-to-end tests for validating user workflows using **Cypress** and **Cucumber (BDD)**.
- **API Testing:** Automated API tests to validate RESTful services using Cypress `cy.request()`.
- **Accessibility Testing:** Integrated **Axe Core with Cypress** to ensure web content meets **WCAG 2.2 standards**.

## Tools and Technologies
- [**Cypress**](https://www.cypress.io/): For modern end-to-end and API testing.
- [**Cucumber Preprocessor**](https://github.com/badeball/cypress-cucumber-preprocessor): For behavior-driven development (BDD) and human-readable test scenarios.
- [**Cypress Axe**](https://www.npmjs.com/package/cypress-axe): For accessibility testing against **WCAG 2.2** standards.
- **Node.js:** Runtime environment for executing the test scripts.
- [**Mochawesome**](https://www.npmjs.com/package/mochawesome): Custom reporting for test results.

---

## 🔧 Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or higher recommended)
- **npm**

### Install Dependencies:
```bash
npm install
```
## Running Tests

### Open Cypress Test Runner:
```bash
npm run cypress:open
```
### Run All Tests:
```bash
npm run cypress:run
```
### Run Tests With Tags (UI tests):
```bash
npm run cypress:run:ui
```
### Run Tests With Tags (API tests):
```bash
npm run cypress:run:api
```

## Running Tests on Different Environments

### Test Environment:
```bash
CYPRESS_ENV=test npm run cypress:run
```
### Dev Environment:
```bash
CYPRESS_ENV=dev npm run cypress:run
```
### Stage Environment:
```bash
CYPRESS_ENV=stage npm run cypress:run
```

## Generating Reports (Mochawesome)

### Run Tests and Generate Mochawesome Report:
```bash
npm run cypress:run:report
```
