const passport = require('passport');
const User = require('../models/User');

exports.getLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: false,
  })(req, res, next);
};




exports.getRegister = (req, res) => {
  res.render('register', {
    title: 'Register',
    errors: [],
    name: '',
    email: '',
    password: '',
    password2: '',
  });
};


exports.postRegister = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Validation
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', { errors, name, email, password, password2, title: 'Register' });
  } else {
    try {
      let user = await User.findOne({ email });
      if (user) {
        errors.push({ msg: 'Email is already registered' });
        res.render('register', { errors, name, email, password, password2, title: 'Register' });
      } else {
        user = new User({ name, email, password });
        await user.save();
        res.redirect('/login');
      }
    } catch (err) {
      console.error(err);
      errors.push({ msg: 'An error occurred' });
      res.render('register', { errors, name, email, password, password2, title: 'Register' });
    }
  }
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
};
