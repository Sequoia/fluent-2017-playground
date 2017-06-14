'use strict';

const AWS = require('aws-sdk');
const kms = new AWS.KMS();

module.exports.handler = (event, context, callback) => {
  console.log(process.env.FOO_BAR);

  kms.decrypt({
    CiphertextBlob: Buffer(process.env.FOO_BAR, 'base64')
  }).promise()

  .then(data => {
    console.log(data);
    const decrypted = String(data.Plaintext);
    console.log(decrypted);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      }),
    };

    callback(null, response);
  })

};
