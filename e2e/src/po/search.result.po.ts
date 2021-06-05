import { by, element, WebElement } from 'protractor';
import { waitUntilDisplayed, isVisible } from '../util';

export class SearchResultPage {
  private searchPageHeader = element(by.css("section[class^='searchPage-header'] > div[class^='searchPage-title-'] > h1"));
  private filterHeader = element(by.css("aside span[class^='filterModal-headerTitle']"));
  private searchPageItemCount = element(by.css("article span[class^='searchPage-itemCount']"));
  private producGallery = element(by.css('article div[class^="gallery-items"]'));
  private firstProduct = element(by.css('article div[class^="gallery-items"] div[class^="item-container"]:nth-child(1)'));
  private colorFilterBtn = element(by.css("aside li:nth-of-type(1) > button[type='button']"));

  getSearchPageHeader() {
    return this.searchPageHeader;
  }

  getFilterHeader() {
    return this.filterHeader;
  }

  getSearchPageItemCount() {
    return this.searchPageItemCount;
  }

  getColorFilterBtn() {
    return this.colorFilterBtn;
  }

  async getItemCount() {
    await waitUntilDisplayed(this.searchPageItemCount);
    const itemCount = await this.getSearchPageItemCount().getText();
    const count: number = +itemCount.substring(0, 2);
    return count;
  }

  async filterBycolor(color: string) {
    await waitUntilDisplayed(this.colorFilterBtn);
    await this.colorFilterBtn.click();
    const colorFilters = await element.all(by.css("aside li:nth-of-type(1) form li > a")).getWebElements();
    // convert to an array of promises holding a tuple of color and element
    const colorFiltersPromise = colorFilters.map(async it => {
      const color = await it.findElement(by.css('span:nth-child(2)'));
      return [await color.getText(), it];
    });

    // wait for all promises to resolve
    const colorAndFilters = await Promise.all(colorFiltersPromise);
    // find a filter matching the color
    const colorAndFilter = colorAndFilters.find(it => (it[0] as string).startsWith(color));
    const filter = colorAndFilter != null ? colorAndFilter[1] as WebElement : null;
    filter && filter.click();
  }

  async selectFirstProduct() {
    await waitUntilDisplayed(this.producGallery);
    await isVisible(this.firstProduct);
    await this.firstProduct.click();
  }
}
