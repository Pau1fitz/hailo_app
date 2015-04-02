$(document).ready(function(){
  console.log("ready");
  $('li').hover(function(){
    $(this).css('color', 'black');
  }, function(){
    $(this).css("color", "white");
  });
});