const express = require('express');
const router = express.Router();
const controller = require('../controller/adminController');
const { isAuthenticated } = require('../middleware/authenticator');

//chaining
router.route('/register').get(controller.register).post(controller.validateRegister);
router.route('/login').get(controller.login).post(controller.validateLogin);
router.route('/dashboard').get(isAuthenticated,controller.showDashboard);
router.route('/contacted').patch(controller.contacted);
router.get('/form/:id',controller.displayData);
router.route('/logout').get(controller.logout);
module.exports = router;