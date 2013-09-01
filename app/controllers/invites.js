'use strict';

var mongoose = require('mongoose'),
    Invite = mongoose.model('Invite');

  function InvitesController() {}

  InvitesController.prototype = {

    create : function(req, res){

      var invitation = new Invite({
        email:  req.params.email
      });

      invitation.save(function (err) {
        if (err) {
          return res.send(500, { error: 'something blew up' });
        } else {
          return res.send(200);
        }
      });

    }

  };

  module.exports = new InvitesController();
