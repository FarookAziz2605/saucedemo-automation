# SauceDemo Automation

![Playwright Tests](https://github.com/FarookAziz2605/saucedemo-automation/actions/workflows/playwright.yml/badge.svg)

UI and API test automation project built with Playwright and JavaScript, using the Page Object Model. It tests the SauceDemo web shop (UI) and the JSONPlaceholder practice API.

## What it tests

**UI (saucedemo.com)**
- Login: valid user, invalid user and locked-out user (data-driven)
- Logout
- Products: sorting (A to Z, Z to A, price low to high, high to low), product count and dropdown value
- Cart: add, remove, multiple products, and product name matching in cart and order overview
- Checkout: full purchase flow with order confirmation

**API (jsonplaceholder.typicode.com)**
- GET a single item, a list (100 posts) and a filtered list (query parameter)
- POST, PUT and DELETE with status, body and field checks
- Negative case: GET a user that does not exist returns 404

## Tech stack
- Playwright
- JavaScript (Node.js)
- GitHub Actions (CI)
- Git and GitHub

## Design
- **Page Object Model:** one class per page in `SauceDemoPages/` (login, products, cart, checkout)
- **Fixtures:** `fixtures.js` provides `loginPage` and `loggedInPage` to tests
- **Data-driven tests:** login tests loop over an array of test data
- **Test data:** API test data is stored in `testData/posts.json`
- **Hooks and grouping:** `beforeEach`, `afterEach` and `test.describe`
- **Screenshots** are captured on failure

## Project structure
```
SauceDemoPages/   page objects
SauceDemoTests/   UI tests
APITests/         API tests
testData/         JSON test data
fixtures.js       custom fixtures
playwright.config.js
.github/workflows/playwright.yml   CI pipeline
```

## Run locally
Requires Node.js.
```bash
git clone https://github.com/FarookAziz2605/saucedemo-automation.git
cd saucedemo-automation
npm install
npx playwright install
npx playwright test --project=chromium
npx playwright show-report
```

## CI
GitHub Actions runs all tests on every push, on a pinned Ubuntu 24.04 runner. The HTML report is uploaded as a build artifact.

## Notes
- The tests run against public practice sites, so an occasional slow response can fail a run.
- JSONPlaceholder is a fake API: POST, PUT and DELETE return realistic responses but do not save changes. Those tests check the response, not stored data.

## Author
Farook Abdul Aziz A - [LinkedIn](https://www.linkedin.com/in/farook-abdul-aziz-0101a3252)