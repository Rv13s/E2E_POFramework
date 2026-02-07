import { expect } from "@playwright/test";
class LoginPage {
    constructor(page) {
        this.page = page;
        this.userEmail = page.locator("#userEmail");
        this.password = page.locator('#userPassword');
        this.LoginBtn = page.locator('input[id="login"]');

    }

    async goto() {
        await this.page.goto('/client');
    }

    async ValidLogin(email,password) {
        await this.userEmail.fill(email);
        await this.password.fill(password);
        await this.LoginBtn.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/dashboard/);
    }

} module.exports = { LoginPage }