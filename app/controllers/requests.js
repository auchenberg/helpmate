'use strict';

var mongoose = require('mongoose'),
    Request = mongoose.model('Request');

exports.load = function(req, res, next, id){

  Request.load(id, function (err, request) {
    if (err) {
      return next(err);
    }

    if (!request) {
      return next(new Error('not found'));
    }
    req.request = request;
    next();
  });
};

exports.create = function (req, res) {
  var request = new Request(req.body);
  request.user = req.user;

  request.uploadAndSave([], function (err) {

    if (!err) {
      req.flash('success', 'Successfully created request!');
      return res.redirect('/request/'+request._id);
    }

  });
};

exports.show = function(req, res){

  Request.list({}, function(err, requests) {
    if (err) {
      return res.render('500');
    }

    res.render('requests/show', {
      requests: requests,
      request: req.request
    });
  });

};
