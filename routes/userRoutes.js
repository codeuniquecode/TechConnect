const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');


router.get('/',controller.home);
router.post('/contact', controller.contact);
module.exports = router;