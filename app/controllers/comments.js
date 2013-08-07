'use strict';

var mongoose = require('mongoose'),
    Request = mongoose.model('Request');

exports.create = function (req, res) {
  var request = req.request;
  var user = req.user;

  request.addComment(user, req.body.content, function (err) {
    if (err) {
      return res.render('500');
    }
    res.redirect('/request/'+ request.id);
  });

};
