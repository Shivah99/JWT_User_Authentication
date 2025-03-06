const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/config');

module.exports.checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, config.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) {
          res.json({ status: true, user: user.email });
        } else {
          res.json({ status: false });
        }
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};
