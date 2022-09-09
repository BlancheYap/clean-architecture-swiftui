const { expect, waitFor, element} = require ('detox');

describe('SwiftUI with Detox Demo', ()=> {

    beforeAll(async () => {
        // await detox.init(config);
        await device.launchApp();
    });

    afterAll(async () => {
        await device.sendToHome();
    });



    it('should be able to search country', async ()=> {
        await waitFor(element(by.text('Countries'))).toBeVisible()
        await expect(element(by.text('Countries'))).toExist();
        await waitFor(element(by.type('UISearchBarTextField'))).toBeVisible().withTimeout(5000)
        await element(by.type('UISearchBarTextField')).tap();
        await element(by.type('UISearchBarTextField')).replaceText('Afghanistan');

        await waitFor(element(by.type('SwiftUI.ListTableViewCell')
            .withDescendant(by.label('Afghanistan, Population 40,218,234')))).toBeVisible().withTimeout(6000);
        await element(by.type('SwiftUI.ListTableViewCell')
            .withDescendant(by.label('Afghanistan, Population 40,218,234'))).tap();
        await waitFor(element(by.label('Afghanistan')).atIndex(1)).toBeVisible().withTimeout(5000);
        await expect(element(by.label('Afghanistan')).atIndex(1)).toBeVisible();
        await expect(element(by.type('_UITableViewHeaderFooterContentView').withDescendant(by.label('Basic Info')))).toBeVisible();
        await expect(element(by.type('_UITableViewHeaderFooterContentView').withDescendant(by.label('Currencies')))).toBeVisible();
        await expect(element(by.type('_UITableViewHeaderFooterContentView').withDescendant(by.label('Neighboring countries')))).toBeVisible();
        await element(by.type('UIAccessibilityBackButtonElement')).tap();
        await waitFor(element(by.text('Countries'))).toBeVisible()
        await element(by.text('Cancel')).multiTap(2);
    });
})