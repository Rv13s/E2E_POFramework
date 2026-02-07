import{test,expect} from '@playwright/test'

test("@E2E Add to Cart", async({page})=>{

    const productName = "ADIDAS ORIGINAL";

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

    //Hardcode addtocart first product
    await prodCards.nth(0).locator('button',{hasText: 'Add to Cart'}).click();

    
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

    //Click add to cart in product view page
    const viewPageProductTitle = page.locator('div h2');
    if(await viewPageProductTitle.textContent() === productName){
        await page.locator("text ='Add to Cart'").click();
    }
   
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

   

    //==
    for(let i = 0; i<checkOutOrdersCount; i ++){
        const order = await checkOutOrdersTitle.nth(i).textContent();
        console.log("Check out Order title : " + order)
        if(order.toLocaleLowerCase() === productName.toLocaleLowerCase()){
            console.log("product matchs in cart section of 3 product " + order)
            await checkOutOrderCard.nth(i).locator('button').filter({hasText: "Buy Now"}).click();
            break;
        }
    }




    // await page.waitForLoadState('networkidle');
    // await expect(page).toHaveURL(/product-details/);

await page.pause();




})