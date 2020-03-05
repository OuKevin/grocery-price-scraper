import AWS from 'aws-sdk';

export default async (items) => {
  console.log(items);
  AWS.config.update({ region: 'us-east-2' });
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const timestamp = String(new Date().toISOString());
  const formattedItems = items.map(({ name, price, unit }) => ({
    PutRequest: {
      Item: {
        timestamp,
        name,
        price,
        unit,
      },
    },
  }));

  await documentClient.batchWrite({
    RequestItems: {
      'grocery-prices': formattedItems,
    },
  }).promise();
};
