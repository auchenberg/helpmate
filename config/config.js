
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    templatePath = path.normalize(__dirname + '/../app/mailer/templates'),
    notifier = {
      service: 'postmark',
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      key: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
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
