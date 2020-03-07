/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { ITEMS_TO_SCRAPE, ITEM_PRICE_SELECTOR } from './utils/constants';
import { generateItemPageEndpoint } from './utils/endpoints';
import config from './utils/config';

export default async () => {
  const items = [];

  for (const { id, name } of ITEMS_TO_SCRAPE) {
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
      items.push({
        id, name, price, unit,
      });
    }
  }

  return items;
};
