/* d2mscene.js
  Crafty scene definitions.
*/

// Loading
/*
  The loader scene starts up right after the page loads. Used to cache resources
  before launching the game.
*/
Crafty.scene("Loading",
  //Enter Scene
  function() {
    if(D2MGlobal.UI === null) {
      D2MGlobal.UI = Crafty.e("UIAnchor");
    }
    var ui = D2MGlobal.UI;
    // Screen background.
    Crafty.background("#000000");
    // Build the loading screen.
    ui.attach(  // Loading Text
      Crafty.e("UIText").text("Loading...").centerX().centerY()
    );

    // Load Resources
    Crafty.load(
      D2MAssets,
      function() {
        Crafty.scene("Main");
      }
    );
  },

  // Leave Scene
  function() { D2MGlobal.UI.clear(); }
);

// Main
/*
  Main Menu
*/

Crafty.scene("Main",
  // Enter Scene
  function() {
    D2MGlobal.UI.attach(Crafty.e("UIFader").color("#FF0000").fadeOut(3000));
  },
  // Leave Scene
  function() {
  }
);
