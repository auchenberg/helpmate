
'use strict';

var mongoose = require('mongoose');

exports.index = function(req, res){
  res.render('settings/index', {
    user: req.user
  });
};

exports.update = function(req, res){
  var user = req.user;
  user.update(req.body, function() {
    res.redirect('/settings');
  });
};

exports.preferences = function(req, res){
  res.render('settings/preferences', {
    user: req.user
  });
};

exports.billing = function(req, res){
  res.render('settings/billing', {
    user: req.user,
    contracts: req.user.contracts,
    section: 'billing'
  });
};

exports.subscription = function(req, res){
  res.render('settings/subscription', {
    user: req.user,
    section: 'billing'
  });
};
