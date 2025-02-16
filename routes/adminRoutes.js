const express = require('express');
const router = express.Router();
const controller = require('../controller/adminController');

//chaining
router.route('/register').get(controller.register).post(controller.validateRegister);
router.route('/login').get(controller.login).post(controller.validateLogin);


module.exports = router;