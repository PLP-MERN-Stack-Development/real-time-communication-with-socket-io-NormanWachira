module.exports = {
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  MAX_MESSAGES: 100, // max messages stored in memory
};
