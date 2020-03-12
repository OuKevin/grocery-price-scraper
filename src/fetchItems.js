import documentClient from './utils/documentClient';

export default async () => {
  const params = {
    TableName: 'grocery-price-items',
  };

  return documentClient.scan(params).promise();
};
