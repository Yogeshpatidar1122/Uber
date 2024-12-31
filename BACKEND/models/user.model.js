const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name should be atleast 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'last name should be atleast 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "email should be greather than 5 characters"]
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String
    }
})
// create method on userschema 
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET), expiresIn = '24h';
    return token;
}
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.statics.hashedPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

// create user model 
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;