'use strict';

var Notifier = require('notifier'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env];

var Notify = {

  userActivation: function (user, cb) {

    var notifier = new Notifier(config.notifier);

    var obj = {
      name: user.name,
      to: user.email,
      from: 'app@helpmate.dk',
      subject: 'Du er blevet inviteret til Helpmate!',
      locals: {
        name: user.name,
        link: 'http://beta.helpmate.dk/user/activate/' + user.activation_token
      }
    };

    notifier.send('userActivation', obj, cb);
  }

};

module.exports = Notify;
