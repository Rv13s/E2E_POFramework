import { expect } from "@playwright/test";
export class CartPage{
    constructor(page){
        this.page = page;
        this.cartButton = page.locator('[routerlink*="dashboard/cart"]');
        this.cartCards = page.locator('.cart');
        this.cartTitles = page.locator('.cart h3');
        this.checkoutBtn = page.locator('button', { hasText: 'Checkout' });
    }

    async checkout(productName){
    //Clicking on cart tab
    await this.cartButton.click();
    await this.page.waitForLoadState('networkidle');

    //check the added product in checkout page
  
    await this.cartTitles.first().waitFor();
    const bool = await this.page.locator("h3:has-Text('"+productName+"')").isVisible();
    expect(bool).toBeTruthy();
    //count product counts
    const cartCount = await this.cartTitles.count();
    await this.checkoutBtn.click();
    }
}