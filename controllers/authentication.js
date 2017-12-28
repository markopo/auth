const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    const token = jwt.encode({ sub: user.id, iat: timestamp }, config.secret);

    console.log('tokenForUser: ', token,  ' : ', user.id);

    return token;
}


exports.signin = function(req, res, next) {

    console.log('signin: ', req.user);

    if(req.user) {

        const user = req.user;
        console.log('local login: ', user);

        res.send({token: tokenForUser(user)});

    }



    res.send({ message: 'mjau' });
};

exports.signup = function (req, res, next) {

        const email = req.body.email;
        const password = req.body.password;


        if(!email || email.indexOf('@') === -1 || !password){
            return res.status(422).send({ error: 'You must provide email and password ' });
        }

        if(email.indexOf('idiot') > -1 || password.indexOf('idiot') > -1){
            return res.status(422).send({ error: 'You are an idiot!' });
        }

        console.log('Email: ', email);
        console.log('Password: ', password);

        // See if a user with the given email exists
        User.findOne({ email: email }, function(err, existingUser) {
              if(err) { return next(err); }

              console.log('user EXISTs: ', existingUser);

              if(existingUser) {
                   return res.status(422).send({ error: 'Email is in use' });
              }
        });

        // If a user with email does exist, return a error

        const user = new User({
            email: email,
            password: password
        });
        user.save(function(err){
            if(err) { return next(err); }

            console.log('creating user! ', user);

            res.json({ success: true, token: tokenForUser(user) });
        });


        // If a user with email does NOT exist, create and save user record


        // Respond to request indicating the user was created


      // res.send({ success: 'true', message: '', now: new Date().toUTCString() });
}



