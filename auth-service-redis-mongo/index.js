require('dotenv').config();
const port = process.env.PORT || 8080;

// ^^ CONFIG ^^ //
const express = require('express');

const app = express();
const authRouter = require('./routes/auth');
const passportCheck = require('./lib/passportCheck');

app.use(express.static('public'));
passportCheck(app);

app.use('/auth', authRouter);
app.get('/', (req, res) => res.redirect('/auth'));

app.listen(port, (err) => {
  if(err) throw err;
  console.log(`listening on port ${port}`);
  console.log(`(probably http://localhost:${port} )`);
})