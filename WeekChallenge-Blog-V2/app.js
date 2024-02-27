const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/AuthRoutes');
const postRoutes = require('./Routes/postRoutes');

// Charger les variables d'environnement depuis .env
dotenv.config();

// Connexion à la base de données MongoDB
connectDB();

// Initialisation de l'application Express
const app = express();

// Définition du moteur de template EJS
app.set('view engine', 'ejs');

// Middleware pour analyser les corps de requête JSON
app.use(bodyParser.json());

// Initialiser Passport
app.use(passport.initialize());

// Middleware pour gérer les routes d'authentification
app.use('/auth', authRoutes);

// Middleware pour gérer les routes de publication
app.use('/', postRoutes);

// Port d'écoute du serveur
const PORT = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}.`);
});
