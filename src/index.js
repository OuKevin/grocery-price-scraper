/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import puppeteer from 'puppeteer';
import config from './config';
import login from './login';

require('dotenv').config();

const main = async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  config.page = page;

  await login();
};

main();
