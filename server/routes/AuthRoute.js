const express = require('express');
const AuthCtrl = require('../controllers/AuthCtrl');
const router = express.Router();

router.post('/login', AuthCtrl.login);

module.exports = router;