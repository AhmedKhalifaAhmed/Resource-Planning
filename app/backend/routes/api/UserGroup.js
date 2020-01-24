const UserGroupModel = require('../../models/UserGroup').model;
const router = require ('express').Router();
const validator = require('../../validations/userGroupValidation');
const { checkAuth, checkAdmin } = require('../../middleware/check-auth');

/* GET A GROUP */
router.get('/:id', checkAuth, (req, res) => {
  try {
    const group = UserGroupModel.findById(req.params.id);
    if(!group) {
      return res.status(500).json({ error: { message: 'Error getting user groups' } });
    }
    return res.json(group);
  } catch(error) {
    return res.status(500).json({ error: { message: 'Server error' } });
  }
});

/* GET ALL GROUPS */
router.get('/', checkAuth, (req, res) => {
  try {
    const userGroups = UserGroupModel.find({});
    if(!userGroups) {
      return res.status(500).json({ error: { message: 'Error getting user groups' } });
    }
    return res.json(userGroups);
  } catch(error) {
    return res.status(500).json({ error: { message: 'Server error' } });
  }
});

/* CREATE USER GROUP */
router.get('/create-group/', checkAdmin, async (req, res) => {
  try {
    // Validate request body
    const valid = validator.validateCreate(req.body);
    if(valid.error) {
      return res.status(400).json({ error: { message: 'Invalid data' } });
    }
    // Make sure there are no duplicates
    const group = await UserGroupModel.findOne({ name: req.body.name });
    if(group) {
      return res.status(400).json({ error: { message: 'Group already exists' } });
    }
    // create group
    const newGroup = await UserGroupModel.create(req.body);
    if(!newGroup) {
      return res.status(400).json({ error: { message: 'Failed to create new group' } });
    }
    return res.json({ message: 'success' });
  } catch(error) {
    return res.status(500).json({ error: { message: 'Server error' } });
  }
});

/* UPDATE USER GROUP*/
router.get('/update-group/:id', checkAdmin, async (req, res) => {
  try {
    // Validate request body
    const valid = validator.validateUpdate(req.body);
    if(valid.error) {
      return res.status(400).json({ error: { message: 'Invalid data' } });
    }
    // Make sure the id does not match the admin id
    const group = await UserGroupModel.findById(req.params.id);
    if(group.name == 'admin') {
      return res.status(400).json({ error: { message: 'Cannot edit admin group' } });
    }
    // update group
    const updatedGroup = await UserGroupModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!updatedGroup) {
      return res.status(400).json({ error: { message: 'No user group found' } });
    }
    return res.json({ message: 'success' });
  } catch(error) {
    return res.status(500).json({ error: { message: 'Server error' } });
  }
});

/* DELETE USER GROUP */
router.get('/delete-group/:id', checkAdmin, async (req, res) => {
  try {
    // Make sure the id does not match the admin id
    const group = await UserGroupModel.findById(req.params.id);
    if(group.name == 'admin') {
      return res.status(400).json({ error: { message: 'Cannot delete admin group' } });
    }
    // update group
    const deletedGroup = await UserGroupModel.findByIdAndDelete(req.params.id);
    if(!deletedGroup) {
      return res.status(400).json({ error: { message: 'No user group found' } });
    }
    return res.json({ message: 'success' });
  } catch(error) {
    return res.status(500).json({ error: { message: 'Server error' } });
  }
});

module.exports = router;
