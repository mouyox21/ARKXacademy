const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/User');

// Fonction pour inscrire un nouvel utilisateur

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Créer un nouvel utilisateur
    user = new User({ username, email, password });

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Sauvegarder l'utilisateur dans la base de données
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fonction pour connecter un utilisateur
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Vérifier si le mot de passe est correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Générer le token JWT
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.render('dashboard', { token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fonction pour obtenir les informations de l'utilisateur actuellement connecté

exports.getCurrentUser = async (req, res) => {
  try {
    // L'utilisateur est disponible dans req.user après l'authentification
    res.render('dashboard', { user: req.user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fonction pour déconnecter l'utilisateur (non nécessaire avec JWT)
exports.logout = (req, res) => {
  // Déconnexion avec JWT est gérée côté client en supprimant le token
  res.json({ message: 'Logout successful' });
};
