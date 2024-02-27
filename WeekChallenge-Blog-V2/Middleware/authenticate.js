const passport = require('passport');

// Middleware pour vérifier l'authentification de l'utilisateur

const authenticate = passport.authenticate('jwt', { session: false });

module.exports = authenticate;
