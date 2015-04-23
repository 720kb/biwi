(function withJQuery(window, $) {
  'use strict';
  //////////// jQuery BINDING //////////
  window.$(document).ready(function () {

    window.$('#pay-btn').on('click', function () {
      window.setTimeout(function () {

        window.$('#pay-btn, #pay-why').fadeOut(100).addClass('animated flipOutY');
        window.$('#pay-content').toggleClass('animated flipInY hide');
        window.$('#pay-loading').toggleClass('hide');
      }, 200);
    });
  });

}(window, $));