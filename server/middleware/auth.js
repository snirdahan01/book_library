const { User } = require('./../models/user');

// check if the user is login to log him out
let auth = (req,res,next) => {
    let token = req.cookies.auth;

    //check if the token is correct
    User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user) return res.json({ // if the user is indeed login
            error: true
        });

        req.token = token;
        req.user = user;
        next();
    });
};

module.exports = { auth };