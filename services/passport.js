const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user,done)=>{
  done(null,user.id);
  //this user.id refers to the id in mongodb
});
//save to session req.session.passport.user; then deserialize to request.user

passport.deserializeUser((id,done)=>{
  // id is get from serialize
  User.findById(id)
    .then((user)=>{
      done(null,user);
    });
});

//if not set 'proxy:true', google will consider heroku unsafe, and refuse the request
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })
          // we already have a record with the given profile
      if (existingUser) {
          return done(null,existingUser);
      } 
          //if not, create a new one
      const user = await new User({ googleId: profile.id }).save()
          done(null,user);
        
      }
  )
);
