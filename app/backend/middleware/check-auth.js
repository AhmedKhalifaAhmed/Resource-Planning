const jwt = require('jsonwebtoken');


const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // Try decoding the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // add decoded user data to the request
    req.userData = decoded.userData;
    // Pass to next call back
    next();
  } catch(decodingError) {
    // Send a 401 back
    return res.status(401).json({
      error: {
        message:'Authentication failed',
      },
    });
  }
};

module.exports = checkAuth;