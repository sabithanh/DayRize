import { browser } from 'protractor';
import { HomePage } from './po/home.po';
import { CartPage } from './po/cart.po';
import { CheckoutPage } from './po/checkout.po';
import { DeliveryPage } from './po/delivery.po';
import { ProductPage } from './po/product.po';
import { SearchResultPage } from './po/search.result.po';
import { ShippingPage } from './po/shipping.po';
import { waitUntilDisplayed, waitUntilClickable } from './util';

describe('App', () => {
  let homePage: HomePage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let deliveryPage: DeliveryPage;
  let productPage: ProductPage;
  let searchResultPage: SearchResultPage;
  let shippingPage: ShippingPage;

  beforeAll(async () => {
    await browser.get(browser.baseUrl);
    homePage = new HomePage();
    cartPage = new CartPage();
    checkoutPage = new CheckoutPage();
    deliveryPage = new DeliveryPage();
    productPage = new ProductPage();
    searchResultPage = new SearchResultPage();
    shippingPage = new ShippingPage();
  })
  describe('search and buy a product', () => {
    let itemCountBeforeFilter;
    it('should search a product', async () => {
      await homePage.acceptCookie();
      await homePage.searchProduct('Linen dress');

      await waitUntilDisplayed(searchResultPage.getFilterHeader());
      expect(await searchResultPage.getFilterHeader().getText()).toEqual('FILTERS');
      itemCountBeforeFilter = await searchResultPage.getItemCount();
    });
    it('should filter by color', async () => {
      await searchResultPage.filterBycolor('White');
      const itemCountAfterFilter = await searchResultPage.getItemCount();
      expect(itemCountBeforeFilter > itemCountAfterFilter).toBeTrue;
    });
    it('should select a product', async () => {
      await searchResultPage.selectFirstProduct();
      await waitUntilDisplayed(productPage.getAddToCartBtn());
      expect(await productPage.getAddToCartBtn().isEnabled()).toBeFalse;
      expect(await productPage.getAddToCartBtn().getText()).toEqual('SELECT A COLOUR');
    });
    it('should add a product to cart', async () => {
      await productPage.addProductToCart();
      await waitUntilDisplayed(cartPage.getMyCartHeader());
      expect(await cartPage.getMyCartHeader().getText()).toEqual('My cart');
    });
    it('should checkout', async () => {
      await waitUntilClickable(cartPage.getCheckoutBtn());
      await cartPage.getCheckoutBtn().click();
      await waitUntilDisplayed(shippingPage.getShippingInfoHeader());
      expect(await shippingPage.getShippingInfoHeader().getText()).toEqual('Shipping Information');
    });
    it('should fill contact & shipping info and proceed', async () => {
      await shippingPage.fillInShippingInfo();
      await waitUntilClickable(shippingPage.getDeliverBtn());
      await shippingPage.getDeliverBtn().click();
      await waitUntilDisplayed(deliveryPage.getProceedToPaymentBtn());
      expect(await deliveryPage.getDeliveryOptionHeader().getText()).toEqual('Delivery Options');
    });
    it('should checkout', async () => {
      await waitUntilClickable(deliveryPage.getProceedToPaymentBtn());
      await deliveryPage.getProceedToPaymentBtn().click();
      await waitUntilDisplayed(checkoutPage.getPlaceOrderBtn());
      expect(await checkoutPage.getPlaceOrderBtn().getText()).toEqual('PLACE ORDER');
    });
  });
});
