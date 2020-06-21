'use strict';

const logToDatabase = require('./logToDatabase');

module.exports.log = async event => {
  return await logToDatabase(event)
    .then(log => ({
      statusCode: 200,
      body: JSON.stringify({
        message: event,
      }, null, 2),
    }))
    .catch(() => ({
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error.',
      }, null, 2),
    }));
};
