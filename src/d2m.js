/* Crafty Initilization */
Crafty.init(D2MDefine.SCREEN_W, D2MDefine.SCREEN_H, "screen");
Crafty.background("#000000");

// Set Resource Paths
Crafty.paths({
  audio: "res",
  images: "res/gfx/"
});
// Load Resources
Crafty.load(
  {
    images: ["test.png"]
  },
  function() {
  }
);


// UI Test
// Test 1 - Image test - Passed 112216
var t = Crafty.e("UIImage").image("res/gfx/test.png").centerX();

// Test 2 - Text test
Crafty.e("UIText").text("TEST").centerX().centerY();

// Script Test - Passed 111716
/*
function TEST_Script() {
  var test = Crafty.e("D2MScript, D2MScriptListener");

  test._f = [
    function (self) { console.log("Hello World!"); self.sleep(3000); },
    function (self) { console.log("1 Second has elapsed"); },
    function (self) { console.log("PAUSE"); self.trigger("SCR_PAUSE"); },
    function (self) { console.log("SLEEP 5000"); self.trigger("SCR_SLEEP", 5000); },
    function (self) { console.log("HALT"); self.trigger("SCR_HALT"); },
    function (self) { console.log("There will need to be a notion of in-game time.") }
  ];

  test.callback = function (self) { console.log("CALLBACK SCRIPT"); };

  Crafty.trigger("SCR_START");
}
*/
