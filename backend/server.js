const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/middleware');
const ejsLayouts = require('express-ejs-layouts');
const Post = require('./models/Post');
const methodOverride = require('method-override');


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
app.use('/images', express.static(path.join(__dirname, 'views/images')));
app.use(express.static(path.join(__dirname, 'style')));
// Use express-ejs-layouts
app.use(ejsLayouts);

// Définir le répertoire des vues
app.set('views', path.join(__dirname, 'views'));
// Définir un moteur de rendu si vous utilisez res.render
app.use(ejsLayouts);
app.set('view engine', 'ejs');
// Définir le layout par défaut
app.set('layout', 'layouts/main'); 

function insertPostData () { 
Post.insertMany ([
{
title: "Building a Blog",
body: "This is the body text"

  },
{
title: "Building a Blog",
body: "This is the body text"

  },
{
title: "Building a Blog",
body: "This is the body text"

  },
{
title: "Building a Blog",
body: "This is the body text"

  },
{
title: "Building a Blog",
body: "This is the body text"

  },

 ])
}
//insertPostData();

app.use(methodOverride('_method'));
// Routes
app.use(checkUser);
app.get('*', checkUser);

/**
 *GET /
 * HOME
*/

app.get('/', requireAuth, async (req, res) => {
  try {
    let perPage = 10;
    let page = req.query.page || 1;
    
    const data = await Post.aggregate([
      { $sort: { createdAt: -1 } }
    ])
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec();

    const count = await Post.countDocuments();

    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('pages/home', {
      title: 'Home Page',
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null
    });

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 *GET /
 *POET : id /
*/

app.get('/post/:id',requireAuth, async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({_id: slug });
    res.render('pages/post', { title: 'Home Page', data });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


/**
 *GET /
 *POET - serachTerm /
*/

app.post('/search',requireAuth, async (req, res) => {

try {
  
let searchTerm = req.body.searchTerm;
const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');

  const data = await Post.find({
    $or: [
      { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
    ]
  });

   res.render('pages/searchpage', { title: 'Search Page', data });

} catch (error) {
  console.log(error);
  res.status(500).send('Internal Server Error');
}
});


/**
 *GET /
 *User -Creat New post/
*/

app.get('/add-post',requireAuth, async (req, res) => {
  try {
    const data = await Post.find();
    res.render('pages/add-post', { title: 'Add post', data });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


/**
 *POST /
 *User -Creat New post/
*/

app.post('/add-post',requireAuth, async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body
      });
    await Post.create(newPost);
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


/**
 *GET /
 *User -Creat New post/
*/

app.get('/edit-post/:id',requireAuth, async (req, res) => {
  try {
    const data = await Post.findOne({_id: req.params.id })
     res.render('pages/edit-post', { title: 'Add post', data });

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


/**
 *PUT /
 *User -Creat New post/
*/

app.put('/edit-post/:id',requireAuth, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
     title: req.body.title,
     body: req.body.body,
     updatedAt: Date.now(),
     updated: true,
   });

   res.redirect(`/post/${req.params.id}`);

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


/**
 *DELETE /
 *User -Delete post/
*/

app.delete('/delete-post/:id',requireAuth, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

app.use(authRoutes);

module.exports = app;


