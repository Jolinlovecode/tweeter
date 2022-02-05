$(document).ready(() => {
  // $('#tweet-text').on // . for class selector, # for id selector
  $(".form_textarea").on("keyup", function(event) {
    let $input = $('.form_textarea');
    let len = $input.val().length;
    let charsLeft = 140 - len;
    
    $('.counter').html(charsLeft);

    if (charsLeft < 0) {
      $('.counter').addClass('form-red');
    } else {
      $('.counter').removeClass('form-red');
    }
  });

});


