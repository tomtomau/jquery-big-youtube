'use strict';
(function($, window){
  window.youtubeQueue = [];

  window.onYouTubeIframeAPIReady = function(){
    for(var key in window.youtubeQueue){
      if(window.youtubeQueue.hasOwnProperty(key)){
        var item = window.youtubeQueue[key];
        if (typeof item == "function"){
          item();
        }
      }
    }
  };

  $.fn.bigYoutube = function(options) {
    var createPlayerObj = function(targetId){
      var onPlayerReady = function(e){
        e.target.playVideo();
      };

      var onPlayerStateChange = function(state){
        if (state.data === 1){
          var $frame = $(state.target.f);

          // Add class for loaded
          $frame.addClass('bigyoutube-loaded');
        }else if (state.data === 0) {
          state.target.seekTo(0);
        }
      };
      var $target = $(targetId);
      new YT.Player(targetId, {
        width: $target.width(),
        height: $target.height(),
        videoId: 'YI8TP21uWXM',
        playerVars: {
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          wmode: 'transparent'
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });

    };
    var createPlayer = function(targetId){
      if (typeof YT === 'undefined' || (YT.hasOwnProperty('loaded') && !YT.loaded)){
        window.youtubeQueue.push(function(){
          createPlayerObj(targetId);
        });
      } else {
        createPlayerObj(targetId);
      }
    };

    // Check if YT is defined
    if (typeof YT == "undefined") {
      // Load the iFrame API
      var tag = document.createElement('script');
      tag.src = "http://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Define the plugin

    var settings = $.extend({
      videoId: 'ZCAnLxRvNNc'
    }, options);

    this.each(function(){
      var $videoTarget = $(this),
        targetId = $videoTarget.attr('id');

      // Create a random id if not already created
      if (typeof $videoTarget.attr('id') == 'undefined'){
        targetId = "bigYoutube" + Date.now().toString() + Math.floor((5 * Math.random()));
        $videoTarget.attr('id', targetId);
      }

      createPlayer(targetId);
    });
  };
})(jQuery, window);