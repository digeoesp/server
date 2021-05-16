const express = require("express");
const mongoose = require("mongoose");
//cookie session pulls some data out of the cookie 
const cookieSession = require("cookie-session");
//passport pulls user id out of cookie
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require('body-parser');
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

//MIDDLEWARE do pre proccesing 
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());


require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
