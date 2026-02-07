export class OrderHistoryPage{
    constructor(page){
        this.page = page;
        this.myOrderBtn =  page.locator("button[routerlink*='dashboard/myorders']");
        this.tableRow = page.locator('tbody tr');

    }

    async searchAndVerifyOrder(orderId){
        console.log("Getttt " + orderId)
    //check the order id in order List
    await this.myOrderBtn.click();
    await this.page.waitForLoadState('networkidle');
    await this.tableRow.first().waitFor();

    const tableOrderList = this.tableRow.locator('th');
    const tableOrderListCount = await tableOrderList.count();

    for (let i = 0; i < tableOrderListCount; i++) {
        const orderID = await tableOrderList.nth(i).textContent();
        if (orderID.trim() === orderId) {
            await this.tableRow.locator('td button').filter({ hasText: 'View' }).nth(i).click();
            break;
        }
    }
    }

}