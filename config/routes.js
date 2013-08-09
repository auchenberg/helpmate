var async = require('async'),
    auth = require('./middlewares/authorization'),
    users = require('../app/controllers/users'),
    requests = require('../app/controllers/requests'),
    comments = require('../app/controllers/comments'),
    home = require('../app/controllers/home'),
    dashboard = require('../app/controllers/dashboard'),
    settings = require('../app/controllers/settings');

var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // user routes
  app.get('/login', users.login);
  app.get('/signup', users.signup);
  app.get('/logout', users.logout);
  app.post('/users', users.create);
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session);

  app.get('/settings', auth.requiresLogin, settings.index);
  app.post('/settings', auth.requiresLogin, settings.update);
  app.get('/settings/preferences', auth.requiresLogin, settings.preferences);
  app.get('/settings/subscription', auth.requiresLogin, settings.subscription);
  app.get('/settings/billing', auth.requiresLogin, settings.billing);


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

  app.param('userId', users.user);

  app.post('/requests', auth.requiresLogin, requests.create);
  app.get('/request/:id', requests.show);

  app.param('id', requests.load);

  app.get('/', home.index);
  app.get('/soon', home.soon);

  app.get('/dashboard', dashboard.index);

  // comment routes
  app.post('/requests/:id/comments', auth.requiresLogin, comments.create);

};
