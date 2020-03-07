/* eslint-disable global-require */
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

if (process.env.NODE_ENV === 'development') require('dotenv').config();

const { AWS_REGION } = process.env;

// TODO: fix script
(async () => {
  const lambda = new AWS.Lambda({
    apiVersion: '2015-03-31',
    region: AWS_REGION,
  });

  const lambdaName = 'grocery-price-scraper';
  const zipPath = `${path.resolve()}/dist/archive.zip`;

  try {
    await lambda.updateFunctionCode({
      FunctionName: lambdaName,
      ZipFile: fs.readFileSync(zipPath),
    }).promise();
  } catch (error) {
    console.error(`Could not save ${lambdaName}, ${JSON.stringify(error)}`);
  }
})();
