const jwt = require('jsonwebtoken');

require('dotenv').config();



module.exports = {
  create_access_token: (payload, expiresIn) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
  },

  create_fresh_token: (payload, expiresIn) => {
    return jwt.sign(payload, process.env.FRESH_TOKEN_SECRET, { expiresIn });
  },
};