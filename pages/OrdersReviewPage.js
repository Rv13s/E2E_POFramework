import { expect } from "@playwright/test";
export class OrdersReviewPage {
    constructor(page) {
        this.page = page;
        this.paymentTitle = page.locator('.payment .payment__title');
        this.selectCountryField = page.locator("[placeholder='Select Country']");
        this.countryList = page.locator('.ta-results');
        this.placeOrderBtn = page.locator(".action__submit");

        this.rawOrderId = page.locator('.em-spacer-1 .ng-star-inserted');
        this.orderConfirmationText = page.locator('.box h1');

    }

    async selectCountry(selectCountry) {
        //Land on Payment page  
        await this.paymentTitle.first().waitFor();
        expect(this.paymentTitle.first()).toHaveText(" Payment Method ");
        //Select country
        await this.selectCountryField.pressSequentially(selectCountry, { delay: 150 });
        //After enter text dropdown result showing

        await this.countryList.waitFor();
        const CountryListCount = await this.countryList.locator('button').count();
        console.log("countryList : " + CountryListCount)

        for (let i = 0; i < CountryListCount; i++) {

            const option = await this.countryList.locator('button').nth(i).textContent();

            if (option.toLowerCase().trim() === selectCountry.toLowerCase()) {
                console.log("Matched" + option)
                await this.countryList.locator("button").nth(i).click();
                break;
            }
        }

        //Click on placeorder btn

    }

    async verifyEmailID() {

    }

    async placeOrderAndgetOrderID(ThanksText) {
        await this.placeOrderBtn.click();
        await expect(this.orderConfirmationText).toHaveText(ThanksText);

        const rawOrderIdText = await this.rawOrderId.textContent();
        const orderNumber = rawOrderIdText.split("|")[1].trim();
        //console.log("Order Number : " + orderNumber)
        return orderNumber;

    }
}