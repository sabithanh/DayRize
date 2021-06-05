import { by, element } from 'protractor';

export class CartPage {
  private myCartHeader = element(by.css("span[class^='header-title']"));
  private checkoutBtn = element(by.css("div[class^='priceSummary-checkoutButton'] > button"));

  getCheckoutBtn() {
    return this.checkoutBtn;
  }

  getMyCartHeader() {
    return this.myCartHeader;
  }
}
