function singleIdTargetSandbox(options){
  if (typeof options != "object"){
    options = {};
  }
  var id = options.hasOwnProperty('id') && options.id.toString().length ? options.id.toString() : 'dummy-id';

  return function(){
    // Create the target
    var singleTarget = $('<div></div>');

    // Apply the id
    singleTarget.attr('id', id);

    // Append to HTML
    $('body').append(singleTarget);
  }
}

describe("Basic plugin bootstrapping", function(){
  it("creates jQuery plugin named 'bigYouTube'", function(){
    expect(typeof $.fn.bigYouTube).toBe("function");
  });

  describe("YouTube API", function(){
    singleIdTargetSandbox({
      id: 'bootstrap-target'
    })();

    // Instantiate Big Youtube
    $("#bootstrap-target").bigYouTube();

    it("bigYouTube adds the script tag", function(){
      expect(
        $('script[src="//www.youtube.com/iframe_api"]').length > 0 ||
        $('script[src="http://www.youtube.com/iframe_api"]').length > 0 ||
        $('script[src="https://www.youtube.com/iframe_api"]').length > 0
      ).toBe(true);
    });

    it("bigYouTube creates an .bigyoutube-inner", function(){
      expect(
        $('#bootstrap-target > .bigyoutube-inner').length > 0
      ).toBe(true)
    });

    describe("YouTube API loads", function(){
      // Use beforeEach to wait until YT is defined
      beforeEach(function(done){
        var intervalId = setInterval(function(){
          if(typeof YT !== 'undefined'){
            clearInterval(intervalId);
            done();
          }
        }, 250);
      });

      it("YouTube API exposees the YT Global", function(){
        expect(typeof YT).toBe('object');
      });
    });
  });
});

/**
 * Testing a single player, selected via ID
 */
describe("Single Id Target", function(){
  var testTargetId = 'single-id-target';

  // Bootstrap some DOM
  beforeEach(singleIdTargetSandbox({
      id: testTargetId
    })
  );

  // Remove the target after each test
  afterEach(function(){
    $("#" + testTargetId).remove();
  });

  it("creates a target with the id of " + testTargetId, function(){
    expect($('#'+testTargetId).length).toBe(1);
  });

  describe("plays video", function(done){
    beforeEach(function(){
      var $target = $('#' + testTargetId);
      $target.bigYouTube();
    });

    describe("builds player", function(){
      beforeEach(function(done){
        var intervalId = setInterval(function(){
          if($('#' + testTargetId).find('iframe').length){
            clearInterval(intervalId);
            done();
          }
        }, 250);
      });

      it("replaces target with iframe", function(){
        expect($('#' + testTargetId).find('iframe').length > 0).toBe(true);
      });

      // @TODO: Can we investigate if this works any further?
    });
  });
});