//////////// jQuery BINDING //////////
$(document).ready(function () {

  $('#pay-btn').on('click', function () {

    $(this).fadeOut(200).addClass('animated slideOutUp');

    setTimeout(function () {

      $('#pay-content').toggleClass('animated slideInUp hide')
    }, 100);
  });
});