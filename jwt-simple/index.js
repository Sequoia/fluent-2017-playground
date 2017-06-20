const jwt = require('jsonwebtoken');
const SECRET = "As You Like It";

const payload = {
  user: {
    id: "934875laksdjf",
    name: "Sequoia",
    role: "serf"
  },
  permissions: {
    books : [
      "add",
      "edit",
      "delete",
      "view"
    ],
    users : [
      "view"
    ]
  }
};

const token = jwt.sign(payload, SECRET);

console.log(token);
