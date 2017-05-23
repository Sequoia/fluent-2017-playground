// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.end('Hello world!');
// });

var count = {};
module.exports = (req, res) => {
  count[req.url] = count[req.url] ? count[req.url] + 1 : 1;
  res.write(`${process.env.SECRET}\n`);
  res.end(`hello from ${process.pid}! you requested ${req.url} COUNT: ${count[req.url]}`);
}