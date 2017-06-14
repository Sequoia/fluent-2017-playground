'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({params: { Bucket: process.env.BUCKET } });
const kms = new AWS.KMS();
const log = require('debug')('books');
const jwt = require('jsonwebtoken');

module.exports.download = (event, context, callback) => {
  const token = event.queryStringParameters ? event.queryStringParameters.token : null;

  if(!token){
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Token query parameter is required'
      })
    });
  }

  let filename = null;

  decrypt(process.env.JWT_SECRET)
    .then(JWT_SECRET => {
      return verifyToken(JWT_SECRET, token);
    }).then(payload => {
      log(`user ${payload.username} downloading ${payload.file}`);
      filename = payload.file;
      return payload.file;
    })
    .then(getFile)
    .then(file => {
      log('got file %j',file);
      return callback(null, {
        statusCode: 200,
        headers: {
          "Content-Type" : file.ContentType,
          "Content-Length" : file.ContentLength,
          "Content-Disposition" : `attachment; filename=${filename}`
        },
        body: file.Body.toString()
      });
    })
    .catch(err => {
      console.log(err);
      return callback(null, {
        statusCode: err.statusCode,
        body: JSON.stringify({
          message: err.message
        })
      });
    });

};

function verifyToken(secret, token){
  return jwt.verify(token, secret);
}

function getFile(key){
  log(`getting file: ${key}`)

  return s3.getObject({
    Key: key
  })
  .promise()
  .catch(e =>{
    log(`S3 problem!`);
    console.error(e);
    throw e;
  });
}

function decrypt(ciphertext){
  log(`decrypting ${ciphertext}`);

  return kms.decrypt({
    CiphertextBlob: Buffer(ciphertext, 'base64')
  })
  .promise()
  .then(data => String(data.Plaintext))
  .then(plaintext => {
    log(`decrypted: ${plaintext}`);
    return plaintext;
  })
  .catch(e => {
    log('decryption problem!');
    console.error(e);
    throw e;
  })
}