const User = require('../models/user');

exports.signup = function (req, res, next) {

        const email = req.body.email;
        const password = req.body.password;

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

            res.json({ success: true });
        });


        // If a user with email does NOT exist, create and save user record


        // Respond to request indicating the user was created


      // res.send({ success: 'true', message: '', now: new Date().toUTCString() });
}