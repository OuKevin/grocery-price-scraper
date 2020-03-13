/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import config from './utils/config';
import { ITEM_NOT_FOUND_SELECTOR, ITEM_PRICE_SELECTOR } from './utils/constants';
import { generateItemPageEndpoint } from './utils/endpoints';
import raceSelectors from './utils/raceSelectors';

export default async (items) => {
  const itemsWithPrices = [];

  for (const { id, name } of items) {
    const { page } = config;
    await page.goto(generateItemPageEndpoint(id));

    const selector = await raceSelectors([ITEM_PRICE_SELECTOR, ITEM_NOT_FOUND_SELECTOR]);

    if (selector === ITEM_NOT_FOUND_SELECTOR) {
      continue;
    }

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
