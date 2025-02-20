const express = require('express');
const router = express.Router();
const controller = require('../controller/adminController');
const { isAuthenticated } = require('../middleware/authenticator');
const passport = require('passport');

//chaining
router.route('/register').get(controller.register).post(controller.validateRegister);
router.route('/login').get(controller.login).post(controller.validateLogin);
router.route('/dashboard').get(isAuthenticated,controller.showDashboard);
router.route('/contacted').patch(controller.contacted);
router.get('/form/:id',controller.displayData);
router.route('/logout').get(controller.logout);
router.route('/auth/google').get(passport.authenticate('google',{scope:["profile",'email']}));
router.route('/auth/google/callback').get(passport.authenticate('google',{failureRedirect:"/"}),controller.googleLogin);
router.route('/profile').get(controller.profile);
module.exports = router;