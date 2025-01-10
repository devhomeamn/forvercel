require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

// DB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Passport config
require('./config/passport')(passport);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');





// Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/admin', require('./routes/admin'));


// Use the auth routes
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
  });
  



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log('MongoDB URI:', process.env.MONGO_URI);






// Set EJS as the view engine
app.set('view engine', 'ejs');

// Use express-ejs-layouts
app.use(expressLayouts);

// Set the default layout file
app.set('layout', 'layouts/main'); // Adjust path if needed



// Redirect to login or dashboard based on user authentication
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard');
    } else {
      res.redirect('/login');
    }
  });
  
  // In app.js
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js MVC App!');
  });
  