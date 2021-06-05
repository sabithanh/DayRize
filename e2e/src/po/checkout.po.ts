import { by, element } from 'protractor';

export class CheckoutPage {
  private placeOrderBtn = element(by.css("div[class^='checkoutPage-payment_information_container'] div[class^='checkoutPage-button'] button[class^='checkoutPage-review_order_button']"));

  getPlaceOrderBtn() {
    return this.placeOrderBtn;
  }
}
