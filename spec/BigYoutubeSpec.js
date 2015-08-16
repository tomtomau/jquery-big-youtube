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

  it("creates jQuery plugin named 'bigYoutube'", function(){
    expect(typeof $.fn.bigYoutube).toBe("function");
  });

  describe("YouTube API", function(){
    singleIdTargetSandbox({
      id: 'bootstrap-target'
    });

    // Instantiate Big Youtube
    $("#bootstrap-target").bigYoutube();

    it("adds the script tag", function(){
      expect($('script[src="http://www.youtube.com/iframe_api"]').length).toBe(1);
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

      it("include the YT Global", function(){
        expect(typeof YT).toBe('object');
      });
    });
  });
});

describe("Single Id Target", function(){
  var testTargetId = 'single-id-target';

  // Bootstrap some DOM
  beforeEach(
    singleIdTargetSandbox({
      id: testTargetId
    })
  );

  // Remove the target after each test
  afterEach(function(){
    $("#" + testTargetId).remove();
  });


  it("creates a target with the id of " + testTargetId, function(){
    expect($('#single-id-target').length).toBe(1);
  });

  it("creates a target with the id of " + testTargetId, function(){
    expect($('#single-id-target').length).toBe(1);
  });
});

//describe("A suite", function() {
//  //beforeEach(singleTargetSandbox());
//
//  //it("creates simple target", function(){
//  //  console.log($('.my-target').attr('id'));
//  //});
//
//  it("creates jQuery plugin", function(){
//    expect(typeof $.fn.bigYoutube).toBe("function");
//  });
//
//  it("creates the youtube api", function(){
//
//  });
//});