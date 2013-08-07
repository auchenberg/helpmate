
'use strict';

var mongoose = require('mongoose'),
    Request = mongoose.model('Request'),
    utils = require('../../lib/utils');

exports.index = function(req, res){

  Request.list({}, function(err, requests) {
    if (err) {
      return res.render('500');
    }
    res.render('dashboard/index', {
      requests: requests,
    });
  });

};
