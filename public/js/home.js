$(function() {

  $('.read-more-button').on('click', function(){
      $('html, body').animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 300);
      return false;
  });

  runAnimation();
});


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
