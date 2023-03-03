const router = require('express').Router();
const ManageUserService = require('../../apis/manageUserService');

router.post('/new', ManageUserService.createUserProfile);
router.put('/:id', ManageUserService.updateUserProfile);
router.delete('/:id', ManageUserService.deleteUserProfile);
router.get('/:id', ManageUserService.getUserProfile);


module.exports = router;