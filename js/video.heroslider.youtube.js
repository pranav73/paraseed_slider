/**
 * @file
 * Behaviors of paraseed hero slider media for Youtube video scripts.
 */

(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.paraseedHeroSliderMedia_youtube = {
    attach: function (context, settings) {
      var mediaSliders = $('.slick--view--paraseed-heroslider-media .slick__slider', context);
      // On before slide change.
      mediaSliders.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var currentVideo = $('.slide--' + currentSlide + '.slick-active').find('.paraseed-video-player iframe[src*="youtube.com"]', context);
        if (currentVideo.length > 0) {
          currentVideo.get(0).contentWindow.postMessage('pause', "*");
        }
      });

      // On after slide change.
      mediaSliders.on('afterChange', function (event, slick, currentSlide) {
        var currentVideo = $('.slide--' + currentSlide + '.slick-active').find('.paraseed-video-player iframe[src*="youtube.com"]', context);
        if (currentVideo.length > 0) {
          currentVideo.get(0).contentWindow.postMessage('play', "*");
        }
        else {
          $('.slick__slider').slick('slickPlay');
        }
      });

      // On first slide load.
      mediaSliders.each(function(i) {
        var firstIframeVideo = $(this).find('.slide').first().find('.paraseed-video-player iframe[src*="youtube.com"]', context);
        if (firstIframeVideo.length > 0) {
          firstIframeVideo.on("load", function() {
            $('.slick__slider').slick('slickPause');
            $(this).get(0).contentWindow.postMessage('play', "*");
          });
        }
      });

      function youtubeActionProcessor(e) {
        if (e.data === "endedYoutube" || e.message === "endedYoutube") {
          $('.slick__slider').slick('slickNext');
        }
        else {
          $('.slick__slider').slick('slickPause');
        }
      }

      // Setup the event listener for messaging.
      if (window.addEventListener) {
        window.addEventListener("message", youtubeActionProcessor, false);
      }
      else {
        window.attachEvent("onmessage", youtubeActionProcessor);
      }

    }
  };
})(window.jQuery, window.Drupal);
