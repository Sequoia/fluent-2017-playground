require('dotenv').config();
const port = process.env.PORT || 8090;

// ^^ CONFIG ^^ //
const express = require('express');
const passportCheck = require('./lib/passportCheck');

const app = express();
const productsRouter = require('./routes/products');

app.use(express.static('public'));

passportCheck(app);

app.use('/products', productsRouter);
app.get('/', (req, res) => res.redirect('/products'));

app.listen(port, (err) => {
  if(err) throw err;
  console.log(`listening on port ${port}`);
  console.log(`(probably http://localhost:${port} )`);
});