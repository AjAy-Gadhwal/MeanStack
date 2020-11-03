const express = require('express');
const router = express.Router();

router.use('/auth', require('./routes/AuthRoute'));
router.use('/product', require('./routes/ProductRoute'));

module.exports = router;