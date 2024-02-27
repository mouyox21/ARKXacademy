const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcrypt");

function initialize(passport,getUserByuser, getUserById){
    const auth = async (username, password, done) => {
        const user = getUserByuser(username)
        if(user == null){
            return done(null, false ,{message : "No User Found"})
        }
         try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false ,{message : "Invalid Password"});
                
            }
            
         } catch (error) {
            return done(error);
            
         }
    }

    passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'},auth));
    //serialize and deserialize are used to manage the session data
     passport.serializeUser((user,done)=>done(null,user.id));
     passport.deserializeUser((id, done) => done(null, getUserById(id)));

}


module.exports=initialize;