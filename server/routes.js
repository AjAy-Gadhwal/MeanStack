const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/auth', require('./routes/AuthRoute'));
router.use('/product',  passport.authenticate('jwt', { session: false }), require('./routes/ProductRoute'));

module.exports = router;