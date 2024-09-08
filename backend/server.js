const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/middleware');


const app = express();

mongoose.set('strictQuery', true);

// URL de connexion MongoDB
const dbURI = 'mongodb+srv://ibtissamerrachidi810:An1XQlEIFReUIl5E@cluster0.ses7k.mongodb.net/Mydatabase';

// Connexion  MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
  // Démarrer le serveur après la connexion réussie
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Middleware pour analyser les données POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'style')));

// Définir le répertoire des vues
app.set('views', path.join(__dirname, 'views/pages'));
// Définir un moteur de rendu si vous utilisez res.render
app.set('view engine', 'ejs');

// Routes
app.get('*', checkUser);
app.get('/', requireAuth, (req, res) => res.render('home'));
app.use(authRoutes);

module.exports = app;

