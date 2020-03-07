import AWS from 'aws-sdk';

export default async (items) => {
  console.log(items);
  AWS.config.update({ region: 'us-east-2' });
  const documentClient = new AWS.DynamoDB.DocumentClient();
  const timestamp = String(new Date().toISOString());
  const formattedItems = items.map((item) => ({
    PutRequest: {
      Item: {
        ...item,
        timestamp,
      },
    },
  }));

  await documentClient.batchWrite({
    RequestItems: {
      'grocery-prices': formattedItems,
    },
  }).promise();
};
