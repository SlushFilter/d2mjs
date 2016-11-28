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
  function() {
    //D2MGlobal.UI.clear();
  }
);

// Main
/*
  Main Menu
*/

var m;
Crafty.scene("Main",
  // Enter Scene
  function() {
    var ui = D2MGlobal.UI;
    // Build Main Menu UI screen
    ui.attach(
      Crafty.e("UIFader").fadeColor("#000000").fadeIn(3000), // Fader
      Crafty.e("UIBox").color("#FF8000").attr({ y: 32, w: 640, h: 256 }).centerX() // Title
    );

    m = Crafty.e("UIMenu").addItem(Crafty.e("UIText").text("TEST"), null)
                      .addItem(Crafty.e("UIText").text("TEST"), null)
                      .addItem(Crafty.e("UIBox").attr({w: 128, h: 64}), null)
                      .addItem(Crafty.e("UIText").text("TEST"), null)
                      .setCursor(Crafty.e("UIBox").attr({ w: 16, h: 16 }));
    m.selNext();

  },
  // Leave Scene
  function() {
  }
);
