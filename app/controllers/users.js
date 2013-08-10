
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , utils = require('../../lib/utils')


var login = function (req, res) {
  if (req.session.returnTo) {
    res.redirect(req.session.returnTo)
    delete req.session.returnTo;
    return;
  }
  res.redirect('/');
}



exports.signin = function (req, res) {}

/**
 * Auth callback
 */

exports.authCallback = function(req, res) {

  var user = req.user;

  if(!user.is_activated) {
    req.logout();
    res.redirect('/soon?activated=false');
  } else {
    login(req, res);
  }

};

/**
 * Show login form
 */

exports.login = function (req, res) {
  res.render('users/login', {
    title: 'Login',
    message: req.flash('error')
  });
};

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  })
}

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
}

/**
 * Session
 */

exports.session = login

/**
 * Create user
 */

exports.create = function (req, res) {
  var user = new User(req.body)
  user.provider = 'local'
  user.save(function (err) {
    if (err) {
      return res.render('users/signup', {
        errors: utils.errors(err.errors),
        user: user,
        title: 'Sign up'
      })
    }

    // manually login the user once successfully signed up
    req.logIn(user, function(err) {
      if (err) return next(err)
      return res.redirect('/')
    })
  })
}

/**
 *  Show profile
 */

exports.show = function (req, res) {
  var user = req.profile
  res.render('users/show', {
    title: user.name,
    user: user
  })
}

/**
 * Find user by id
 */

exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
};

exports.activate = function(req, res){

  var activationToken = req.params['token'];
  var user = req.user;

  console.log('activationToken', activationToken);
  console.log('user.activation_token', user.activation_token);

  if(user.activation_token === activationToken) {

    user.is_activated = true;
    user.save(function() {
      res.redirect('/welcome');
    });

  } else {
    res.redirect('/');
  }

};
