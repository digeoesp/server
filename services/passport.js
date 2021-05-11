const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
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
    //accessTopken = read ad or delte emails for user
    //refreshToken = allows us to refresh the acesstoken after it is expired
    //profile = all identifying information
    (accessToken, refreshToken, profile, done) => {
        console.log('access Token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile', profile);
    }
  )
); 
