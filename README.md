# Saucedemo Automation

## What is this project?
This project is designed to automate testing of the SauceDemo website using Playwright with JavaScript, following the Page Object Model (POM) design pattern.

## Website tested
https://www.saucedemo.com/

## What does it test?
- Login - Valid login, Invalid login credentials, Locked out user
- Add to cart - Adding a product to the cart
- Checkout - Complete purchase flow with order comfirmation

## Tech stack
- Playwright
- JavaScript
- GitHub Actions (CI/CD)

## How to run
1. Clone the repository
2. Run `npm install`
3. Run `npx playwright test`

## Project structure
- `SauceDemoPages/` — Page Object Model files
- `SauceDemoTests/` — Test files