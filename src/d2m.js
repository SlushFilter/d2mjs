/* d2m.js
  Entry point into the program.
*/

// Crafty Initilization
Crafty.timer.steptype("fixed", 16);
Crafty.init(D2MDefine.SCREEN_W, D2MDefine.SCREEN_H, "screen");
Crafty.pixelart(true);
Crafty.background("#200000");

Crafty.paths(D2MPath); // Set Resource Paths

// Create the UI Subsystem Anchor
// TODO: Update this to be a Crafty subsystem :)
D2MGlobal.UI = Crafty.e("UIAnchor"); 


// Controller setup
Crafty.s("Controls").defineDpad("Dpad", {
	RIGHT_ARROW: 0, 
	  LEFT_ARROW: 180,
	  UP_ARROW: 270,
	  DOWN_ARROW: 90
});
Crafty.s("Controls").defineTriggerGroup("A", { keys: [Crafty.keys.A] });
Crafty.s("Controls").defineTriggerGroup("B", { keys: [Crafty.keys.D] });
Crafty.s("Controls").defineTriggerGroup("Confirm", { keys: [Crafty.keys.E, Crafty.keys.ENTER] });
Crafty.s("Controls").defineTriggerGroup("Cancel", { keys: [Crafty.keys.Q, Crafty.keys.ESCAPE] });

// TODO: Deprecate this once UI has been reworked.
D2MGlobal.Keyboard = Crafty.e("KeyController");
Crafty.scene("TestMap");

// UI Test - Passed 112216
/*
// Test 1 - Image test
var t = Crafty.e("UIImage").image("res/gfx/test.png").centerX();

// Test 2 - Text test
Crafty.e("UIText").text("TEST").centerX().centerY();
*/

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
