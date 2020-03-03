/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { itemsToScrape } from './utils/constants';
import { generateItemPageEndpoint } from './utils/endpoints';
import config from './utils/config';

export default async () => {
  for (const itemId of itemsToScrape) {
    const { page } = config;
    await page.goto(generateItemPageEndpoint(itemId));
    await page.waitForSelector('.itemModalHeader .item-price');
    const priceText = await page.$eval('.itemModalHeader .item-price', (a) => a.innerText);

    console.log(priceText);
  }
};
