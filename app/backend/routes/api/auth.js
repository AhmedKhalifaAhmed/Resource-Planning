const UserModel = require('../../models/User').model;
const userValidator = require('../../validations/userValidation');
const UserGroupModel = require('../../models/UserGroup').model;
const router = require ('express').Router();
const { checkAuth, checkAdmin } = require('../../middleware/check-auth');
const validator = require('../../validations/authValidation');
const authFunctions = require('../../functions/auth');

/* FIRST TIME ADMIN REGISTER */
router.post('/register-admin', async (req, res) => {
  try {
    const users = await UserModel.find({});
    // Make sure the user document is empty
    if(users.length !== 0) {
      return res.status(401).json({ error: { message: 'Admin already created' } });
    }
    // Validate user info
    const valid = await userValidator.validateCreate(req.body);
    if(valid.error) {
      return res.status(400).json({ error: { message: 'Invalid form data' } });
    }
    // Add user group to the request body
    let userGroup = await UserGroupModel.findOne({ name: 'admin' });
    // Make sure user group exists
    if(!userGroup) {
      userGroup = await UserGroupModel.create({ name: 'admin' });
      if(!userGroup) {
        return res.status(500).json({ error: { message: `Could not find user group ${req.body.userGroup}` } });
      }
    }
    req.body.userGroup = userGroup._id;
    // Create new user
    const data = await UserModel.create(req.body);
    // Return new user
    return res.json({message: 'success'});
  } catch(error) {
    return res.status(500).json({ error: { message: 'Server error' } });
  }
});

/* USER REGISTER */
router.post('/register', checkAdmin, async (req, res) =>{
  try {
    // Validate new user data
    const valid = await userValidator.validateCreate(req.body);
    if(valid.error) {
      return res.status(400).json({ error: { message: 'Invalid form data' } });
    }
    // Make sure the usergroup is not admin
    if(req.body.userGroup == 'admin') {
      return res.status(400).json({ error: { message: 'Cannot create an admin' } });
    }
    // Check if username already exists
    const userAlreadyExists = await UserModel.findOne({ username: req.body.username });
    if(userAlreadyExists) {
      return res.status(400).json({ error: { message: 'Username already taken' } });
    }
    // Add user group to the request body
    const userGroup = await UserGroupModel.findOne({ name: req.body.userGroup });
    // Make sure user group exists
    if(!userGroup) {
      return res.status(500).json({ error: { message: `Could not find user group ${req.body.userGroup}` } });
    }
    req.body.userGroup = userGroup._id;
    // Create new user
    const data = await UserModel.create(req.body);
    // Check if user was created successfully
    if(!data) {
      return res.status(500).json({ error: { message: 'Could not create user' } });
    }
    // Return a success message
    return res.json({message: 'success'});
  } catch(error) {
    return res.status(500).json({ error: { message: 'Server error' } });
  }
});

/* LOGIN */
router.post('/login', async (req, res) => {
  try {
    // Validate request data
    const valid = validator.validateLogin(req.body);
    if(valid.error) {
      return res.status(400).json({ error: valid.error });
    }
    // Get user
    const user = await UserModel.findOne({ username: req.body.username, 
      password: req.body.password });
    // Check if user exists
    if(!user) {
      return res.status(400).json({ error: { message: 'User not found' } });
    }
    if(!user.active) {
      return res.status(400).json({ error: { message: 'User no longer active' } });
    }
    // Create new jwt
    const token = authFunctions.createToken(60*10, {
      userId: user._id,
      userGroup: user.userGroup,
    })
    // Check if token was created successfully
    if(token.error) {
      return res.status(500).json({ error: { message: 'Could not create token' } });
    }
    // Return new token
    return res.json({token});
  } catch(error) {
    return res.status(500).json({ error: { message: 'Server error' } });
  }
});

/* USER DEACTIVATE */
router.get('/deactivate-account/:id', checkAdmin, async (req, res) => {
  try {
    // Check if user exists
    const user = await UserModel.findById(req.params.id);
    if(!user) {
      return res.status(400).json({ error: { message: 'User does not exist' } });
    }
    if(!user.active) {
      return res.status(400).json({ error: { message: 'User already deactivated' } });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {active: false}, {new: true});
    if(!updatedUser) {
      return res.status(500).json({ error: { message: 'Server error' } });
    }
    return res.json({ message: 'success' });
  } catch(error) {
    return res.status(500).json({ error: { message: 'Server error' } });
  }
});

/* USER REACTIVATE */
router.get('/reactivate-account/:id', checkAdmin, async (req, res) => {
  try {
    // Check if user exists
    const user = await UserModel.findById(req.params.id);
    if(!user) {
      return res.status(400).json({ error: { message: 'User does not exist' } });
    }
    if(user.active) {
      return res.status(400).json({ error: { message: 'User already active' } });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {active: true}, {new: true});
    if(!updatedUser) {
      return res.status(500).json({ error: { message: 'Server error' } });
    }
    return res.json({ message: 'success' });
  } catch(error) {
    return res.status(500).json({ error: { message: 'Server error' } });
  }
});

module.exports = router;