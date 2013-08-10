var async = require('async'),
    auth = require('./middlewares/authorization'),
    users = require('../app/controllers/users'),
    requests = require('../app/controllers/requests'),
    comments = require('../app/controllers/comments'),
    home = require('../app/controllers/home'),
    dashboard = require('../app/controllers/dashboard'),
    settings = require('../app/controllers/settings'),
    admin = require('../app/controllers/admin');

var loggedInAuth = [auth.requiresLogin, auth.requiresActivation];
var adminAuth = [auth.requiresLogin, auth.requiresAdmin];

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // Logged out
  app.get('/', home.index);
  app.get('/soon', home.soon);
  app.get('/login', users.login);

  // Logged in
  app.get('/dashboard', loggedInAuth, dashboard.index);
  app.get('/welcome', loggedInAuth, home.welcome);

  app.post('/requests', loggedInAuth, requests.create);
  app.get('/request/:id', loggedInAuth, requests.show);
  app.post('/requests/:id/comments', loggedInAuth, comments.create);

  app.get('/settings', loggedInAuth, settings.index);
  app.post('/settings', loggedInAuth, settings.update);
  app.get('/settings/preferences', loggedInAuth, settings.preferences);
  app.get('/settings/subscription', loggedInAuth, settings.subscription);
  app.get('/settings/billing', loggedInAuth, settings.billing);

  app.get('/signup', users.signup);
  app.get('/logout', users.logout);
  app.post('/users', users.create);
  app.get('/user/activate/:token', auth.requiresLogin, users.activate);
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session);

  // Auth
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me'],
      failureRedirect: '/login'
    }), users.signin);

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), users.authCallback);

  app.get('/auth/google',
    passport.authenticate('google', {
      failureRedirect: '/login',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }), users.signin);

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login'
    }), users.authCallback);

  // Admin
  app.get('/admin', adminAuth, admin.index);
  app.get('/admin/user/:user_id/activate', adminAuth, admin.activateUser);

};
