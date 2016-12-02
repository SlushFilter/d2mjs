/* d2m.js
  Entry point into the program.
*/

// Crafty Initilization
Crafty.init(D2MDefine.SCREEN_W, D2MDefine.SCREEN_H, "screen");
Crafty.pixelart(true);
Crafty.background("#200000");

Crafty.paths(D2MPath); // Set Resource Paths

D2MGlobal.UI = Crafty.e("UIAnchor"); // Create the UI Subsystem Anchor
D2MGlobal.Keyboard = Crafty.e("KeyController");
Crafty.scene("Loading");

// ## DEBUG FUNCTIONS ##
function showents() {
  console.log(Crafty("*"));
}
