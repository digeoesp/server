const express = require('express');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');



//MIDDLEWARE
const app = express();


//passport.use uses a google strategy
//we have to give it a client id and client secret
// new googlestartegy creates a new instance 
passport.use(
    new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        //add propery callback the string is the route the user is sent to after they grant permisssion
        callbackURL: '/auth/google/callback'
    }, 
    // as a second argument pass an arrow functiion
    accessToken => {
        console.log(accessToken);
    }
  )
); 



//route handler that make sure that user gets kicked into this passport flow
//googleStrategy has an internal identifier as google
app.get('/auth/google', passport.authenticate('google', {
    //specifies to google what acces we want to have on this users profile 
    scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);


