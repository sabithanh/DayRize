import { by, element } from 'protractor';

export class DeliveryPage {
  private deliveryOptionHeader = element(by.css("div[class^='checkoutPage-root'] h2[class^='checkoutPage-heading']"));
  private proceedToPaymentBtn = element(by.css("form[class^='shippingMethod-form']  button[class^='button-root']"));

  getProceedToPaymentBtn() {
    return this.proceedToPaymentBtn;
  }

  getDeliveryOptionHeader() {
    return this.deliveryOptionHeader;
  }

}
