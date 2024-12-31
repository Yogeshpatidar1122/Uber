const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')
const blacklistedTokenModel = require('../models/blacklistToken.model')
// register user 
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;
    console.log(req.body);
    const hashedPassword = await userModel.hashedPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
}

// login user 
module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid email and password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid Email or Password' });
    }
    const token = user.generateAuthToken();

    res.cookie('token', token)

    res.status(200).json({ token, user });
}
// user profile
module.exports.getUserProfile = async (req, res, next) => {
    const user = await userModel.findById(req.user._id);
    res.status(200).json(req.user);
}
// logout user 
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.header.authorization?.split(' ')[1];
    await blacklistedTokenModel.create({ token });
    res.status(200).json({ message: 'User Logged Out' });
    // const user = await userModel.findOne({ token: token });
}