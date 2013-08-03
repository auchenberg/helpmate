exports.authenticated = function(block) {

  console.log('req',req);
  if(req.isAuthenticated()) {
    return block.fn();
  } else {
    return block.inverse();
  }

};

