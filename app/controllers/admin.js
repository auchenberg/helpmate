'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    notify = require('../mailer/notify');

  function AdminController() {}

  AdminController.prototype = {

    index : function(req, res){

      User.getAll(function(err, users) {
        if (err) {
          return res.render('500');
        }
        res.render('admin/index', {
          users: users
        });
      });

    },

    activateUser : function(req, res){

      var userId = req.params['user_id'];

      User.findOne({ _id : userId }).exec(function (err, user) {
        if (err) {
          throw err;
        }

        if (!user) {
          throw new Error('Failed to load User ' + userId);
        }

        notify.userActivation(user, function() {
          res.redirect('/admin');
        });


      });


    }

  };

  module.exports = new AdminController();
