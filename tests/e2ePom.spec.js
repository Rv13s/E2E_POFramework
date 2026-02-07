import { test } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CartPage } from '../pages/CartPage';
import { OrdersReviewPage } from '../pages/ordersReviewPage';
import { OrderHistoryPage } from '../pages/orderHistoryPage';
const data = require('../test-data/orderData.json');

test('E2E test with POM', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.ValidLogin(data.email, data.password);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.addToCart(data.product);

    const cartPage = new CartPage(page);
    await cartPage.checkout(data.product);

    const ordersReviewPage = new OrdersReviewPage(page);

    await ordersReviewPage.selectCountry(data.country);
    //await ordersReviewPage.selectCountry(data.country);
    const orderId = await ordersReviewPage.placeOrderAndgetOrderID(data.messages.orderSuccess);
    console.log("Order Number From test file : " + orderId)

    const orderHistoryPage = new OrderHistoryPage(page);
    await orderHistoryPage.searchAndVerifyOrder(orderId);

    

    /*
    

    //check the payment order id
    const ThanksText = 'Thankyou for the order.'
    const ThanksOrderLocator = page.locator('.box h1');
    await expect(ThanksOrderLocator).toHaveText(ThanksText);
    // expect (await page.locator('.box h1').toHaveText(ThanksText));

    const rawOrderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    const orderNumber = rawOrderId.split("|")[1].trim();
    console.log("Order Number : " + orderNumber)

    //check the order id in order List
    await page.locator("button[routerlink*='dashboard/myorders']").click();
    await page.waitForLoadState('networkidle');

    const tableRow = page.locator('tbody tr');
    await tableRow.first().waitFor();
    const tableOrderList = tableRow.locator('th');
    const tableOrderListCount = await tableOrderList.count();

    for (let i = 0; i < tableOrderListCount; i++) {
        const orderID = await tableOrderList.nth(i).textContent();
        if (orderID.trim() === orderNumber) {
            await tableRow.locator('td button').filter({ hasText: 'View' }).nth(i).click();
            break;
        }
    }
    
    */

    await page.pause();









})