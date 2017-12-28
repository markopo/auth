const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');


 console.log(passportService);

const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {

    app.get('/', requireAuth, function(req, res){


        res.send({ hi: 'there' });
    });


    app.post('/signup', Authentication.signup);
    
    app.post('/auth', passport.authenticate('local', { session: false }), Authentication.signin);



};