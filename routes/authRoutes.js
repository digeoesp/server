const passport = require('passport');


module.exports = (app) => {
    //route handler that make sure that user gets kicked into this passport flow
    //googleStrategy has an internal identifier as google
    app.get('/auth/google', passport.authenticate('google', {
        //specifies to google what acces we want to have on this users profile 
        scope: ['profile', 'email']
    })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};


//what is cookie session doing