import { by, element } from 'protractor';
import { waitUntilDisplayed, waitUntilClickable } from '../util';

export class ProductPage {
  private colorSelector = element(by.css("section[class^='productFullDetail-options'] div[class^='option-root']:nth-of-type(1) button[class*='swatch-root']:nth-of-type(1)"));
  private sizeSelector = element(by.css("section[class^='productFullDetail-options'] div[class^='option-root']:nth-of-type(2) button[class^='tile-root_size']"));
  private addToCartbtn = element(by.css("button[class^='productFullDetail-addToCartButton']"));

  getAddToCartBtn() {
    return this.addToCartbtn;
  }

  async addProductToCart() {
    await waitUntilDisplayed(this.colorSelector);
    await this.colorSelector.click();
    await this.sizeSelector.click();

    await waitUntilClickable(this.getAddToCartBtn());
    await this.addToCartbtn.click();
  }
}
