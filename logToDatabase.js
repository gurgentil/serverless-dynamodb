const uuid = require('uuid');
const aws = require('aws-sdk');

const dynamoDB = new aws.DynamoDB.DocumentClient();

module.exports = async message => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      message: message,
      createdAt: JSON.stringify(new Date()),
    },
  };

  await dynamoDB.put(params, error => {
    return error
      ? Promise.reject(`Error saving data to DynamoDB: ${ JSON.stringify(error) }`)
      : Promise.resolve();
  });
};
