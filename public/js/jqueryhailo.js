$(document).ready(function(){
  console.log("ready");
  $( window ).scroll(function() {
  $( "#header" ).css( 'height', '50px');
  $( "#header" ).css( 'background-color', 'white');
  $("#logo").css('font-size', '20px');
  $("#logo").css('color', 'black');
});

});