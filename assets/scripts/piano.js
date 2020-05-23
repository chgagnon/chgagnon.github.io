$(function(){

  // alert('wow');

  // $('a').each(function(i) {
  //   $(this).css('filter', 'invert(100%)');
  // })

  // for all children of fancy title (my name)
  $('.fancy_title').children().each(function(i) {
    $(this).hover(function() {
      // function to perform when hovering begins
      $(this).css({'color': 'white', 'text-shadow': '2px 2px 2px gray'})},
      // function to perform when no longer hovering
      function() {
        $(this).css({'color': 'black', 'text-shadow': '0px 0px'})
      }
    )
  })

});