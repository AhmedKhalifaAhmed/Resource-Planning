const jwt = require('jsonwebtoken');

const createToken = (expTime, userData) => {
  // Check if expiration time is supplied
  if(expTime == undefined) {
    return {error: 'no expiration time supplied'};
  }
  // Calculate expiration date
  let expirationDate = Math.floor(Date.now() / 1000) + expTime;
  // Create payload
  payload = {
    userData,
    exp: expirationDate,
  };
  // Create signed token
  const token = jwt.sign(payload, process.env.JWT_KEY);
  // Return new token
  return token;
};

module.exports = {
  createToken,
};