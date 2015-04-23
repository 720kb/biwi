//////////// jQuery BINDING //////////
$(document).ready(function () {

  $('#pay-btn').on('click', function () {
    setTimeout(function () {

      $('#pay-btn, #pay-why').fadeOut(100).addClass('animated flipOutY');
      $('#pay-content').toggleClass('animated flipInY hide');
      $('#pay-loading').toggleClass('hide');
    }, 200);
  });
});