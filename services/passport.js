const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
//passport.use uses a google strategy
//we have to give it a client id and client secret
// new googlestartegy creates a new instance
//get access to user model class

//fetch from mongoose.. one argument means ur trying to fetch something from mongoose.. two arguments means ur trying to load something into mongoose
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            //add propery callback the string is the route the user is sent to after they grant permisssion
            callbackURL: "/auth/google/callback",
        },
        // as a second argument pass an arrow functiion
        //accessTopken = read ad or delte emails for user
        //refreshToken = allows us to refresh the acesstoken after it is expired
        //profile = all identifying information
        async (accessToken, refreshToken, profile, done) => {
            //.findone will do a search pass some search criteria
            //this will initiate a search on all the records
            const existingUser = await User.findOne({ googleId: profile.id })
            if (existingUser) {
                // we already have a record with the given profile id
                //first rgument of null indicates no error
                //second argument is existing user
                done(null, existingUser);
            } else {
                const user = await new User({ googleId: profile.id }).save()
                done(null, user);
                // we dont have a user record with this id, make new record
            }
        }
    )
);
