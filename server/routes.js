const express = require('express');
const router = express.Router();

router.use('/auth', require('./routes/AuthRoute'));
router.use('/product', require('./routes/ProductRoute'));
router.use('/webData', require('./routes/WebDataRoute'));

module.exports = router;