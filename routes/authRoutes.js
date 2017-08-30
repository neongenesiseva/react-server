const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback", 
    passport.authenticate("google"),
    (req,res)=>{
      res.redirect('/surveys');
    }
  );
  //this 'google' is a internal code in GoogleStrategy, although we didnt declare 'google', it will apply
  //GoogleStrategy automatically
  //scope:[] these are not randomly generated, it is identified by GoogleStrategy

  app.get('/api/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
  })

  app.get('/api/current_user',(req,res)=>{
    res.send(req.user)
  })

};
