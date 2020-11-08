const express = require('express');
const router = express.Router();
let WebDataCtrl = require('../controllers/WebDataCtrl');

router.post('/get', WebDataCtrl.get);
router.post('/insert', WebDataCtrl.insert);
router.post('/update', WebDataCtrl.update);

module.exports = router;