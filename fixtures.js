import {test as base} from '@playwright/test';
import { LoginPage } from './SauceDemoPages/LoginPage.js';

export const test = base.extend({
    // Fixture 1 — just goes to the site, no login
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await use(loginPage);
    },
    
    // Fixture 2 — goes to site AND logs in
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await use(loginPage);
    }
});

export { expect } from '@playwright/test';