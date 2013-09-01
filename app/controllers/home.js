
'use strict';

exports.index = function(req, res){

  if(req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.render('home/index', {
      section: 'home'
    });
  }

};

exports.soon = function(req, res){
  res.render('home/soon');
};


exports.welcome = function(req, res){
  res.render('home/welcome');
};
