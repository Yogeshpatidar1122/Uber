const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller')
const AuthMiddleware = require('../middlewares/auth.middleware')
router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name shoul be more than 3 words.'),
    body('password').isLength({ min: 6 }).withMessage('Password Should be more than 6 words')
],
    userController.registerUser
)
router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 6 }).withMessage('Password Should be more than 6 words')
],
    userController.loginUser
)
router.get('/profile', AuthMiddleware.authUser, userController.getUserProfile);
router.get('/logout', AuthMiddleware.authUser, userController.logoutUser);

module.exports = router;