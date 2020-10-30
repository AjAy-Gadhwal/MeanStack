const express = require('express');
const router = express.Router();

let ProductCtrl = require('../controllers/ProductCtrl');

router.get('/get', ProductCtrl.get);
// router.post('/isAdmin', AdminCtrl.isAdmin);
// router.post('/logout', AdminCtrl.logout);
// router.put('/changePassword', AdminCtrl.changePassword);

module.exports = router;