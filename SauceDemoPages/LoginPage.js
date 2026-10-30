export class LoginPage {
    constructor(page) {
        this.page= page;
        this.username= page.locator('#user-name');
        this.password= page.locator('#password');
        this.loginButton= page.locator('#login-button');
        this.menuBarButton= page.locator('#react-burger-menu-btn');
        this.logoutLink= page.locator('#logout_sidebar_link');
    }
    async goto() {
        await this.page.goto('https://www.saucedemo.com');
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.menuBarButton.click();
        await this.logoutLink.click();
    }
}