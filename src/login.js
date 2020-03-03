import config from './utils/config';

export default async () => {
  const {
    ENDPOINT,
    EMAIL,
    PASSWORD,
  } = process.env;
  const { page } = config;

  await page.goto(ENDPOINT);
  await page.waitForSelector('input[name=email]');
  await page.waitForSelector('input[name=password]');

  await page.focus('input[name=email]');
  await page.keyboard.type(EMAIL);
  await page.focus('input[name=password]');
  await page.keyboard.type(PASSWORD);
  await page.click('button[type=submit]');
  await page.waitForSelector('.item-price');
};
