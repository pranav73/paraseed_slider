/**
 * @file
 * Behaviors of paraseed hero slider media for local video scripts.
 */

(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.paraseedHeroSliderMedia_local_video = {
    attach: function (context, settings) {
      $(window).on('load', function () {
        // On before slide change.
        $('.slick--view--paraseed-heroslider-media .slick__slider', context).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          var currentSlideObject = $('.slide--' + currentSlide + '.slick-active');
          var nextSlideObject = $('.slide--' + nextSlide);
          var currentVideo = currentSlideObject.find('.paraseed-video-player video', context);
          var nextVideo = nextSlideObject.find('.paraseed-video-player video', context);

          if (currentVideo.length > 0) {
            var currentPlayer = currentVideo.get(0);
            currentPlayer.pause();
          }

          if (nextVideo.length > 0) {
            var nextPlayer = nextVideo.get(0);
            nextPlayer.muted = true;
            nextPlayer.onpause = onPause;
            nextPlayer.onended = onFinish;
            nextPlayer.onplay = onPlayProgress;
            nextPlayer.play();
          }
          else {
            $('.slick__slider').slick('slickPlay');
          }
        });

        // When first slide has a video (Pause the slider and play the video).
        $('.slick--view--paraseed-heroslider-media', context).each(function () {
          var firstVideo = $(this).find('.slide').first().find('.paraseed-video-player video', context);

          if (firstVideo.length > 0) {
            $('.slick__slider').slick('slickPause');

            var firstVideoPlayer = firstVideo.get(0);
            firstVideoPlayer.muted = true;
            firstVideoPlayer.play();

            firstVideo.on('ended',function () {
              $('.slick__slider').slick('slickPlay');
            });

          }
        });

        // Local Video variable.
        if ($('.slick--view--paraseed-heroslider-media .paraseed-video-player video', context).length > 0) {
          var player = $('.slick--view--paraseed-heroslider-media .paraseed-video-player video', context).get(0);

          // When the player is ready, add listeners for pause, finish,
          // and playProgress.
          player.onpause = onPause;
          player.onended = onFinish;
          player.onplay = onPlayProgress;
        }

        // Play when paused.
        function onPause() {
          $('.slick__slider').slick('slickNext');
        }

        // Play when finished.
        function onFinish() {
          $('.slick__slider').slick('slickPlay');
        }

        // Pause on play prgress.
        function onPlayProgress() {
          $('.slick__slider').slick('slickPause');
        }
      });
    }
  };
})(window.jQuery, window.Drupal);
