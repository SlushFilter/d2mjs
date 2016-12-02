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

    // Load Resources, then start the main scene.
    Crafty.load( D2MAssets, function() { Crafty.scene("Main"); } );
  },

  // Leave Scene
  function() {
    D2MGlobal.UI.clear();
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

    // Main Menu . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    var mi = [
      { ent: Crafty.e("UIText").text("New Game"),
        callback: function() { Crafty.scene("NewGame"); } },
      { ent: Crafty.e("UIText").text("Continue"),
        callback: function() { Crafty.scene("Continue"); } }
    ];
    ui.attach(Crafty.e("UIMenu")
      .setItems(mi)
      .attr({ y: 320 })
      .setCursor(Crafty.e("UIBox").attr({ w: 16, h: 16 }))
      .setCancelCallback(function() { console.log("Cancel"); })
      .centerX()
      .keyCapture()
    );

  },
  // Leave Scene
  function() {
  }
);

Crafty.scene("NewGame",
  // Enter Scene
  function() {
    var ui = D2MGlobal.UI;
    ui.clear();
    ui.attach(Crafty.e("UIText").text("New Game").centerX());
  },
  // Leave Scene
  function() {
  }
);

Crafty.scene("Continue",
  // Enter Scene
  function() {
    var ui = D2MGlobal.UI;
    ui.clear();
    ui.attach(Crafty.e("UIText").text("Continue").centerX());
  },
  // Leave Scene
  function() {
  }
);
