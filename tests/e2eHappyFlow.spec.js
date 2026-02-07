import{test,expect} from '@playwright/test'

test("@E2E @HappyFlow to Cart", async({page})=>{

    const productName = "ADIDAS ORIGINAL";
    const secondProduct = "ZARA COAT 3";

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("testra@gmail.com");
    await page.locator("#userPassword").fill("Test@123");
    await page.locator('input[id="login"]').click();

    //Dashboard page
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/dashboard/);

    await page.locator('.card-body').first().waitFor();
    const prodCards = page.locator(".card-body");
    const productTitles =  page.locator(".card-body b");
    const productCount = await productTitles.count();
    console.log("Printing all product titles: " + await productTitles.allTextContents());

    // Add to cart any one product
    for (let i = 0; i<productCount;i++){
        // First get the product title and match it with if condition
        const selectProduct = await productTitles.nth(i).textContent();
        if(selectProduct?.toLowerCase() === productName.toLowerCase()){
            await prodCards.nth(i).locator('button', {hasText: 'Add to Cart'}).click();
            break;
        }
    }
    //Clicking on cart tab
    await page.locator('[routerlink*="dashboard/cart"]').click();
    await page.waitForLoadState('networkidle');

    //check the added product in checkout page
    const cartCards = page.locator('.cart');
    const cartTitles = page.locator('.cart h3');
    await cartTitles.first().waitFor();
    //const bool = await page.locator(`h3:has-Text(${productName})`).isVisible();
    //expect(bool).toBeTruthy();
    //count product counts
    const cartCount = await cartTitles.count();
    await page.locator('button', {hasText : 'Checkout'}).click();
    
    //Land on Payment page
    const paymentTitle = page.locator('.payment .payment__title');
    await paymentTitle.first().waitFor();

    expect(paymentTitle.first()).toHaveText(" Payment Method ");

    //Select country
    const country = "India"
    const selectCountry = page.locator("[placeholder='Select Country']");
    await selectCountry.pressSequentially("Ind", {delay: 150});
    //After enter text dropdown result showing
    const countryList =  page.locator('.ta-results');
    await countryList.waitFor();
    const CountryListCount = await countryList.locator('button').count();
    console.log("countryList : " + CountryListCount)

    for(let i =0; i<CountryListCount; i++){

        const option =await countryList.locator('button').nth(i).textContent();
        
        if(option.toLowerCase().trim() === country.toLowerCase()){
             console.log("Matched" + option)
            await countryList.locator("button").nth(i).click();
            break;
        }
    }
    
    //Click on placeorder btn
    await page.locator(".action__submit").click();

    //check the payment order id
    const ThanksText = 'Thankyou for the order.'
    const ThanksOrderLocator = page.locator('.box h1');
    await expect(ThanksOrderLocator).toHaveText(ThanksText);
   // expect (await page.locator('.box h1').toHaveText(ThanksText));

    const rawOrderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    const orderNumber = rawOrderId.split("|")[1].trim();
    console.log("Order Number : "  + orderNumber)

    //check the order id in order List
    await  page.locator("button[routerlink*='dashboard/myorders']").click();
    await page.waitForLoadState('networkidle');

    const tableRow = page.locator('tbody tr');
    await tableRow.first().waitFor();
    const tableOrderList = tableRow.locator('th') ;
    const tableOrderListCount = await tableOrderList.count();
    
    for ( let i = 0; i < tableOrderListCount; i++){
        const orderID = await tableOrderList.nth(i).textContent();
        if(orderID.trim() === orderNumber){
            await tableRow.locator('td button').filter({hasText:'View'}).nth(i).click();
            break;
        }
    }






    // console.log('View Cart product: '+ await cartTitles.first().textContent());
    // for(let i =0 ; i<cartCount; i++){
    //     const checkCartProd = await  cartTitles.nth(i).textContent();
    //     if(checkCartProd.toLowerCase() == secondProduct.toLowerCase()){
            
    //         await cartCards.nth(i).locator("button").filter({hasText: 'Buy Now'}).click();
    //         break;
    //     }
    // } 

    //expect(await cartTitles.first().textContent() === productName);
    //skip this part now after working on it


 
    await page.pause();

    /*
    //View the product
    for(let i =0; i<productCount; i++){ 
            const prod =  productTitles.nth(i);
            const prodTitle =  await productTitles.nth(i).first().textContent();
            console.log(prodTitle)
        if(prodTitle === productName){
            console.log(prodTitle.includes(productName))
            //await page.locator('button',{hasText: ' Add To Cart'}).nth(i).click(); thos also works
            await prodCards.nth(i).locator('button',{hasText: 'View'}).click(); // card to button , card title to button not working
            break;
        }    
    }

    await page.waitForLoadState('networkidle');

   
    // click on contine shopping btn
    await page.locator("[href*='dashboard']").click();

    //Hardcoded select 2 products
    await prodCards.nth(3).locator('button',{hasText: 'Add to Cart'}).click();

    //Click on checkOut Button
    await page.locator('[routerlink*="dashboard/cart"]').click();
    await page.waitForLoadState('networkidle');

    const checkOutOrderCard= page.locator('.cartWrap');
    const checkOutOrdersTitle = page.locator('.cart h3');
    const checkOutOrdersCount = await checkOutOrdersTitle.count();
    await checkOutOrdersTitle.first().waitFor();
    console.log("First order title" +await checkOutOrdersTitle.first().textContent());
    console.log("All order title " + await checkOutOrdersTitle.allTextContents());

   */

 









})