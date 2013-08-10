
/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    return res.redirect('/login');
  }
  next();
};

exports.requiresAdmin = function (req, res, next) {
  if (!req.user || req.user.is_admin !== true) {
    req.flash('info', 'You are not authorized');
    return res.redirect('/');
  }
  next();
};

exports.requiresActivation = function (req, res, next) {
  if (!req.user || req.user.is_activated !== true) {
    req.flash('info', 'Your user needs activation');
    return res.redirect('/soon');
  }
  next();
};




/*
 *  User authorization routing middleware
 */

exports.user = {
  hasAuthorization : function (req, res, next) {
    if (req.profile.id != req.user.id) {
      req.flash('info', 'You are not authorized')
      return res.redirect('/users/'+req.profile.id)
    }
    next()
  }
}

/*
 *  Article authorization routing middleware
 */

exports.article = {
  hasAuthorization : function (req, res, next) {
    if (req.article.user.id != req.user.id) {
      req.flash('info', 'You are not authorized')
      return res.redirect('/articles/'+req.article.id)
    }
    next()
  }
}
