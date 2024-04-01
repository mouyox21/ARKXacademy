const passport = require('passport');
const User = require('../api/models/user.model');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
 passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

// Implement Local Authentication Strategy
passport.use(new LocalStrategy(
    {
    usernameField: 'email',
    passwordField: 'password'

}, async (email, password, done) => {
    const user = await User.findOne({ email });
    if(user) {
        const isMatch = bcrypt.compareSync(password, user.password)
        if(isMatch) {
            return done(null, user);
        } else {
            return done(null, false ,{message: 'User Password mismatch'});
        }
    }
    return done(null, false,{message: 'User loged not found'});
}));
