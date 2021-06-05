import { ExpectedConditions, ElementFinder, browser } from 'protractor';

const waitUntilDisplayedTimeout = browser.params.waitTimeoutInMillis || 30000;
const logWaitErrors = browser.params.logWaitErrors || false;

export const checkSelectorExist = (selector: ElementFinder) => selector !== undefined;

/**
 * @returns Function which resolves to boolean
 */
export const isDisplayed = (selector: ElementFinder) => {
  return ExpectedConditions.visibilityOf(checkSelectorExist(selector) ? selector : null);
};

export const isHidden = (selector: ElementFinder) => {
  return ExpectedConditions.invisibilityOf(checkSelectorExist(selector) ? selector : null);
};

/**
 * Wait until this page is displayed.
 */
export const waitUntilDisplayed = async (selector: ElementFinder, classname = '', timeout = waitUntilDisplayedTimeout) => {
  if (!checkSelectorExist(selector)) return;

  await browser.wait(
    isDisplayed(selector),
    timeout,
    `Failed while waiting for "${selector.locator()}" of Page Object Class '${classname}' to display.`
  );
};

/**
 * Wait until element is clickable
 */
export const waitUntilClickable = async (selector: ElementFinder, classname = '', timeout = waitUntilDisplayedTimeout) => {
  if (!checkSelectorExist(selector)) return;

  await browser.wait(
    ExpectedConditions.elementToBeClickable(selector),
    timeout,
    `Failed while waiting for "${selector.locator()}" of Page Object Class '${classname}' to be clickable.`
  );
};

/**
 * Returns a void promise on any element present inside an array to become
 * visible. If no element is visible within threshold time, promise will
 * be rejected.
 */
export const waitUntilAnyDisplayed = async (selectors: ElementFinder[], timeout = waitUntilDisplayedTimeout): Promise<void> => {
  await browser.wait(
    ExpectedConditions.or(...selectors.map(selector => ExpectedConditions.visibilityOf(selector))),
    timeout,
    `"${selectors.map(selector => selector.locator())}" are not visible.`
  );
};

/**
 * Returns a boolean if an element is visible on screen. It's a wrapper on
 * isDisplayed() to gracefully handle the scenario when an element is not
 * present in the DOM.
 */
export const isVisible = async (selector: ElementFinder) => {
  try {
    return await selector.isDisplayed();
  } catch (e) {
    if (logWaitErrors) {
      console.warn(e.message);
    }
  }
  return false;
};
