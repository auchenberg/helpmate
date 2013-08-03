$(function() {

  var height = windowHeight();
  $(".banner").css("height", height+1);

  /mobile/i.test(navigator.userAgent) && !location.hash &&
    setTimeout(function () { height = windowHeight(); $(".banner").css("height", height+1); /*window.scrollTo(0, 1);*/ }, 1000);

  $(window).resize(function() {
    height = windowHeight();
    $(".banner").css("height", height+1);
  });

  $(".btn").on("click", function(){
      $('html, body').animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 300);
      return false;
  });

  var imageNum = Math.floor(Math.random() * 2) + 1;
  $('.banner').addClass('img-' + imageNum);

  runAnimation();
});

var windowHeight = function() {
    var zoomLevel = document.documentElement.clientHeight / window.innerHeight;
    return window.innerHeight * zoomLevel;
};

function runAnimation(){

  $(".gradient").css("opacity", 1);

  setTimeout(function() {
    $(".banner .position").css("opacity", 1);
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
