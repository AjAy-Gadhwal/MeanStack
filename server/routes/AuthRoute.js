const express = require('express');
const AuthCtrl = require('../controllers/AuthCtrl');
const router = express.Router();

router.post('/login', AuthCtrl.login);
router.post('/logout', AuthCtrl.logout);
router.post('/contactUs', AuthCtrl.contactUs);

module.exports = router;