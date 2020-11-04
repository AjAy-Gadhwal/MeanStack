const express = require('express');
const router = express.Router();
const passport = require('passport');
const multerFileUpload = require('../utilities/multerFileUpload');


let ProductCtrl = require('../controllers/ProductCtrl');

router.post('/get', ProductCtrl.get);
router.post('/insert', passport.authenticate('jwt', { session: false }), multerFileUpload.uploadFile.single('image'), ProductCtrl.insert);
router.put('/update', passport.authenticate('jwt', { session: false }), multerFileUpload.uploadFile.single('image'), ProductCtrl.update);
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), ProductCtrl.detele);

module.exports = router;