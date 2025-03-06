module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/jwt?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey',
  JWT_EXPIRES_IN: 3 * 24 * 60 * 60, // 3 days in seconds
};
