var Handlebars = require('handlebars');

exports.authenticated = function(block) {

  console.log('req',req);
  if(req.isAuthenticated()) {
    return block.fn();
  } else {
    return block.inverse();
  }
};

exports.nl2br = function(text) {

  text = Handlebars.Utils.escapeExpression(text);
  var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');


  return new Handlebars.SafeString(nl2br);


};
