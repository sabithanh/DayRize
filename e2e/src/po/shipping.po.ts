import { by, element } from 'protractor';
import { waitUntilClickable } from '../util';

export class ShippingPage {
  private shippingInfoHeader = element(by.css("div[class^='checkoutPage'] h2[class^='checkoutPage-heading']"));
  private emailAddress = element(by.css("input[name='email']"));
  private firstName = element(by.css("input[name='firstname']"));
  private lastName = element(by.css("input[name='lastname']"));
  private addressLine1 = element(by.css("input[name='street[0]']"));
  private city = element(by.css("input[name='city']"));
  private postCode = element(by.css("input[name='postcode']"));
  private deliverBtn = element(by.css("form[class^='guestForm-root'] div[class^='guestForm-buttons'] > button[class^='button-root']"));

  getShippingInfoHeader() {
    return this.shippingInfoHeader;
  }

  getEmailAddress(){
    return this.emailAddress;
  }

  getDeliverBtn(){
    return this.deliverBtn;
  }

  async fillInShippingInfo() {
    await waitUntilClickable(this.getEmailAddress());
    await this.getEmailAddress().sendKeys('sabitha.nh@gmail.com');
    await this.fillInContactInfo();
    await this.fillInShippingAddress();
  }

  async fillInContactInfo() {
    await this.firstName.sendKeys('Sabitha');
    await this.lastName.sendKeys('NH');
  }

  async fillInShippingAddress() {
    await this.addressLine1.sendKeys('Derby');
    await this.city.sendKeys('London');
    await this.postCode.sendKeys('DE1 2QY');
  }
}
