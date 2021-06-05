import { browser, by, element, protractor } from 'protractor';
import { isDisplayed } from '../util';

export class HomePage {
  private cookieAcceptAllbtn = element(by.css('button[class^="cookieConsent-acceptButton"'));
  private searchBox = element(by.css('input[name="search_query"]'));
  ceOrderBtn = element(by.css("div[class^='checkoutPage-payment_information_container'] div[class^='checkoutPage-button'] button[class^='checkoutPage-review_order_button']"));

  getSearchBox() {
    return this.searchBox;
  }

  async acceptCookie() {
    if (isDisplayed(this.cookieAcceptAllbtn)) {
      this.cookieAcceptAllbtn.click();
    }
  }

  async searchProduct(searchCriteria: string) {
    await this.searchBox.sendKeys(searchCriteria);
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
  }
}
