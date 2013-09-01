'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env],
    paymill = require('paymill-node')(config.paymill);

module.exports = Object.create({

  getPaymillClient: function() {

    paymill.clients.details('client_88a388d9dd48f86c3136',
        function(err, client) {
            if (err) {
                console.log("Error :(");
                return;
            }
            console.log("client id " + client.data.id);
        }
    );

  },

  creditcard: function(req, res) {

    console.log('creditcard', req);

  },

  setup : function(req, res){
    var user = req.user;

    paymill.clients.create({
        email: user.email,
        description: user.name
      }, function(err, client) {
            if (err) {
                console.log("Couldn't create the client record");
                return;
            }

            var clientId = client.data.id;
        }
    );
  }

});
