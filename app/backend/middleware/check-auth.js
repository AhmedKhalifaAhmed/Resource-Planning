const jwt = require('jsonwebtoken');
const UserGroupModel = require('../models/UserGroup');


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

const checkAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // Try decoding the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // Check if the user is admin
    const userGroup = await UserGroupModel.findById(decoded.userData.userGroup);
    if(!userGroup || userGroup.name != 'admin') {
      // Send back a 401
      return res.status(401).json({ error: { message:'Authentication failed' } });
    }
    // add decoded user data to the request
    req.userData = decoded.userData;
    // Pass to next call back
    next();
  } catch(decodingError) {
    // Send back a 401
    return res.status(401).json({ error: { message:'Authentication failed' } });
  }
}

module.exports = {checkAuth, checkAdmin};