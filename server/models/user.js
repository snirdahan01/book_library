const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password crypto (hash)
const jwt = require('jsonwebtoken'); // For password crypto
const SALT_I = 10; // salt for hash
const config = require('./../config/config').get(process.env.NODE_ENV);

// Create a User schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    name: {
        type: String,
        maxlength: 100
    },
    lastname: {
        type: String,
        maxlength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
});

// befor we save the user
userSchema.pre('save', function(next) {
    var user = this;
    
    if (user.isModified('password')) { // if the password has changed.
        bcrypt.genSalt(SALT_I, function(err,salt) { // generate the salt.
            if(err) return next(err);
            
            bcrypt.hash(user.password, salt, function(err,hash) {
                if(err) return next(err);
                user.password = hash; // change the password to the new hashed pass.
                next();
            })
        })
    } else {
        next();
    }
});

// compare password when login
userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err,isMatch){
        if(err) return callback(err);
        callback(null, isMatch) // if there is a match with the password that the user enters.
    })
}

// generate token for user password
userSchema.methods.generateToken = function(callback){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), config.SECRET);// using json web token to generate the token.

    user.token = token;
    user.save(function(err,user){
        if(err) return callback(err);
        callback(null,user);
    });
};

//find a user by token
userSchema.statics.findByToken = function(token, callback){
    var user = this;

    // try to decode and verify the token
    jwt.verify(token, config.SECRET, function(err,decode){ 
        user.findOne({"_id":decode, "token":token}, function(err,user){ // find user by the token
            if(err) return callback(err);
            callback(null,user);
        });
    });
};

//delete the user token to log him out
userSchema.methods.deleteToken = function(token, callback){
    var user = this;

    user.update({$unset:{token:1}}, (err,user) => { //update the token to 1
        if(err) return callback(err);
        callback(null,user);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };