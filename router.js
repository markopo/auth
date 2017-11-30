module.exports = function(app) {

    app.get('/', function (req, res, next) {

        console.log('request: ', req);
        console.log('response: ', res);

        res.send([ 'apple', 'banana', 'orange' ]);

    });


};