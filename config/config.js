
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

var notifier = {
  service: 'postmark',
  email: true,
  actions: ['userActivation'],
  tplPath: path.normalize(__dirname + '/../app/mailer/templates'),
  key: '417f681c-1665-4098-8a1b-bef1e6da9d77'
};

module.exports = {

  development: {
    db: 'mongodb://localhost/helpmate',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Helpmate'
    },
    facebook: {
      clientID: '423774561071001',
      clientSecret: '08e8fa68803bbdde79a0722d1688dc0e',
      callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    google: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
  },
  production: {
    db: process.env.MONGOHQ_URL,
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Helpmate'
    },
    facebook: {
      clientID: '228897420592002',
      clientSecret: '24c501d205de58738b49eca078c53814',
      callbackURL: 'http://app.helpmate.dk/auth/facebook/callback'
    },
    google: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://app.helpmate.dk/auth/google/callback'
    }
  }

};
