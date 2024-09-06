const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

// Middleware pour analyser les données POST
app.use(express.urlencoded({ extended: true }));

// Définir un moteur de rendu si vous utilisez res.render
app.set('view engine', 'ejs');

// Routes
app.use(authRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
