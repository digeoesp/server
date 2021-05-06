const express = require('express');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const app = express();


//passport.use uses a google strategy
//we have to give it a client id and client secret
passport.use(new GoogleStrategy()); // new googlestartegy creates a new instance 

const PORT = process.env.PORT || 5000;
app.listen(PORT);


