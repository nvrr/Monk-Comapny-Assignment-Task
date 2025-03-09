// @ts-check
import { test, expect } from '@playwright/test';


test.describe('test one',() => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/')
  })
  test('correct metadata and elements', async({page}) => {
    // await page.goto('http://localhost:5173/') ;
    await expect(page).toHaveTitle('Monk Assignment')
    //checks Rule-- text in header tag
    await expect(page.getByRole('heading', {
      name: 'Rule'
    })).toBeVisible();



    //link tag with Next Form Page--text is visible
    await expect(page.getByRole('link', {name: 'Next Form Page'})).toBeVisible()
    
    //form 
    await expect(page.getByPlaceholder('Search collections')).toBeVisible();
    await expect(page.getByRole('button', {name: 'AND'})).toBeVisible()


  });

  test('should redirect to next form onClick', async({page}) => {
    await page.getByRole('link', {name: 'Next Form Page'}).click();

    // await expect(page).toHaveTitle('Next Form')
    await expect(page.getByText('Next Form')).toBeVisible()
  })

  test('should have empty collection items On Start', async({page}) => {
    const collectionItems = await page.getByTestId('collection-items');

    //check collection items empty or not
    await expect(collectionItems).toBeEmpty()


    // --------------------------------
    
  })


  
})



//gh''
// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
