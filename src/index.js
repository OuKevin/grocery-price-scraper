/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import puppeteer from 'puppeteer';
import config from './config';
import login from './login';
import { itemsToScrape } from './constants';
import { generateItemPageEndpoint } from './endpoints';

require('dotenv').config();

const main = async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const [page] = await browser.pages();
  config.page = page;

  await login();

  for (const itemId of itemsToScrape) {
    await page.goto(generateItemPageEndpoint(itemId));
  }
};

main();
