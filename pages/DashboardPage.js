export class DashboardPage {
    constructor(page) {
        this.page = page;
        this.prodCards = page.locator(".card-body");
        this.productTitles = page.locator(".card-body b");

    }

    async addToCart(productName) {

        await this.prodCards.first().waitFor();
        const productCount = await this.productTitles.count();
        console.log("Printing all product titles: " + await this.productTitles.allTextContents());

        // Add to cart any one product
        for (let i = 0; i < productCount; i++) {
            // First get the product title and match it with if condition
            const selectProduct = await this.productTitles.nth(i).textContent();
            if (selectProduct?.toLowerCase() === productName.toLowerCase()) {
                await this.prodCards.nth(i).locator('button', { hasText: 'Add to Cart' }).click();
                break;
            }
        }

    }


}