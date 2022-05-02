const router = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/users');
const { updateInfo } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', updateInfo, updateUserInfo);

module.exports = router;
