const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require("./config/keys");

require("./models/User");
require("./services/passport");
//these two order matters

// no return, so just require
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
    //set the expiration date and the keys to encrypt
);

app.use(passport.initialize());
app.use(passport.session());
//enable cookie

authRoutes(app);
billingRoutes(app);
// pass 'app' to authRoutes file

const PORT = process.env.PORT || 5000;
app.listen(PORT);
