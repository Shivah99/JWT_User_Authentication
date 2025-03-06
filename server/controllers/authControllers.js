const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const maxAge = config.JWT_EXPIRES_IN;

// Handle errors
const handleErrors = (err) => {
  let errors = { firstName: '', email: '', password: '' };

  // Duplicate error code
  if (err.code === 11000) {
    errors.email = 'Email is already registered';
    return errors;
  }

  // Validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // Incorrect email
  if (err.message === 'Incorrect email') {
    errors.email = 'Email is not registered';
  }

  // Incorrect password
  if (err.message === 'Incorrect password') {
    errors.password = 'Password is incorrect';
  }

  return errors;
};

// Create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: maxAge
  });
};

module.exports.register = async (req, res, next) => {
  try {
    const { firstName, email, password } = req.body;
    const user = await User.create({ firstName, email, password });
    const token = createToken(user._id);
    
    res.cookie('jwt', token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000 // convert to milliseconds
    });
    
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    
    res.cookie('jwt', token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000
    });
    
    res.status(200).json({ user: user._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};
