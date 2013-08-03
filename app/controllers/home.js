
'use strict';

exports.index = function(req, res){

  if(req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.render('home/index');
  }

};
