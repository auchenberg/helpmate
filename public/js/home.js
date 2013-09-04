$(function() {

  $(window).resize(function() {
    height = windowHeight();
    $(".full-bg-banner").css("height", height+1);
  });

  $(window).trigger('resize');

  $('.read-more-button').on('click', function(){
      $('html, body').animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 300);
      return false;
  });

  // Set a timeout...
  setTimeout(function(){
    // Hide the address bar!
    window.scrollTo(0, 1);
  }, 0);

  runAnimation();
});

var windowHeight = function() {
  var zoomLevel = document.documentElement.clientHeight / window.innerHeight;
  return window.innerHeight * zoomLevel;
};

$('.invite-email-form').submit(function(e) {

  e.preventDefault();

  var email = $('.invite-email-form .input-email').val();
  var csrf = $('.invite-email-form input[name=_csrf]').val();

  if(!email.length) {
    return alert('Please enter an email');
  }

  var req = $.post('/invite', {
    email: email,
    _csrf: csrf
  });

  req.done(function() {
    $('.invite-email-form').css('opacity', 0);
    $('.invite-success').show();
  });

});

function runAnimation(){

  $(".gradient").css("opacity", 1);

  setTimeout(function() {
    $(".full-bg-banner .position").css("opacity", 1);
  }, 1500);

  setTimeout(function() {
    $("h2 .make").css("opacity", 1);
  }, 2000);

  setTimeout(function() {
    $("h2 .publish").css("opacity", 1);
  }, 3000);

  setTimeout(function() {
    $("h2 .share").css("opacity", 1);
  }, 4000);

}
