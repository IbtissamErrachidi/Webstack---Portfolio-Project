const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route pour la page d'inscription
router.get('/signup', (req, res) => {
  res.render('pages/signup', { title: 'Sign Up' });
});

// Route pour la page de connexion
router.get('/login', (req, res) => {
  res.render('pages/login', { title: 'Log In' });
});

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;

