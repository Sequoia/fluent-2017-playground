'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({params: { Bucket: process.env.BUCKET } });

module.exports.download = (event, context, callback) => {
  const token = event.queryStringParameters ? event.queryStringParameters.token : null;

  if(!token){
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Token query parameter is required'
      })
    });
  }

  console.log(`looking up ${token}`);

  s3.getObject({
    Key: token
  }).promise()
    .then(response => {
      console.log(response);
      return callback(null, {
        statusCode: 200,
        headers: {
          "Content-Type" : response.ContentType,
          "Content-Length" : response.ContentLength,
          "Content-Disposition" : `attachment; filename=${token}`
        },
        body: response.Body.toString()
      });
    })
    .catch(err => {
      console.log(err);
      return callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: 'error',
          error: err
        })
      });
    });

};
