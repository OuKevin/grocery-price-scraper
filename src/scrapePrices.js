/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import config from './utils/config';
import { ITEM_PRICE_SELECTOR } from './utils/constants';
import { generateItemPageEndpoint } from './utils/endpoints';

export default async (items) => {
  const itemsWithPrices = [];

  for (const { id, name } of items) {
    const { page } = config;
    await page.goto(generateItemPageEndpoint(id));
    await page.waitForSelector(ITEM_PRICE_SELECTOR);
    // TODO: handle page not found
    const priceText = await page.$eval(ITEM_PRICE_SELECTOR, (a) => a.innerText);
    const textWithoutSpaces = priceText.replace(/\s/g, '');
    const priceWithUnit = textWithoutSpaces.split('$')[1];

    if (!priceText.includes('/')) {
      console.error(`Unable to parse this product: ${id}`);
    } else {
      const [price, unit] = priceWithUnit.split('/');
      itemsWithPrices.push({
        id, name, price, unit,
      });
    }
  }

  return itemsWithPrices;
};
