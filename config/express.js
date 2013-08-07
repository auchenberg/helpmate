
/**
 * Module dependencies.
 */

var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash'),
    pkg = require('../package.json'),
    exphbs  = require('express3-handlebars'),
    path = require('path'),
    helpers = require('../lib/helpers');

module.exports = function (app, config, passport) {

  app.set('showStackError', true);

  // should be placed before express.static
  app.use(express.compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
  }))

  app.use(express.favicon());
  app.use(express.static(config.root + '/public'));
  app.use('/stylesheets', express.static(config.root + '/app/assets/stylesheets'));


  // don't use logger for test env
  if (process.env.NODE_ENV !== 'test') {
    app.use(express.logger('dev'));
  }

  var hbs = exphbs.create({
    layoutsDir : 'app/views/layouts',
    partialsDir : ['app/views/includes', 'app/views/requests'],
    defaultLayout : 'layout',
    extname: '.hbs',
    helpers: helpers
  });

  app.set('views', 'app/views');
  app.engine('hbs', hbs.engine);
  app.set('view engine', 'hbs');
  app.set('layout', 'layout')

  app.configure(function () {
    // expose package.json to views
    app.use(function (req, res, next) {
      res.locals.pkg = pkg;
      next();
    });

    // cookieParser should be above session
    app.use(express.cookieParser());

    // bodyParser should be above methodOverride
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // express/mongo session storage
    app.use(express.session({
      secret: 'helpmate',
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages - should be declared after sessions
    app.use(flash());

    // adds CSRF support
    if (process.env.NODE_ENV !== 'test') {
      app.use(express.csrf());
    }

    // This could be moved to view-helpers :-)
    app.use(function(req, res, next){
      res.locals.csrf_token = req.session._csrf;
      res.locals.isAuthenticated = req.isAuthenticated();
      res.locals.userName = req.user ? req.user.name : '';
      next();
    });


    // routes should be at the last
    app.use(app.router);

  });

  // development env config
  app.configure('development', function () {
    app.locals.pretty = true;
  });

};
