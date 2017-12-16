/* d2mscene.js
  Crafty scene definitions.
*/

// Loading - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
      Crafty.e("UIText").text("Loading...").attr({ x: 8, y: 8 })
    );

    // Load Resources, then start the main scene.
    Crafty.load( D2MAssets, function() {
      Crafty.e("D2MScript").script([
          function(self) { Crafty.e("UIFader").fadeColor("#000000").fadeOut(1000); },
          function(self) { self.sleep(1050); },
          function(self) { Crafty.scene("Main"); }
      ]).start();
    });
  },

  // Leave Scene
  function() {
    D2MGlobal.UI.clear();
  }
);

// Main- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*
  Main Menu
*/
Crafty.scene("Main",
  // Enter Scene
  function() {
    var ui = D2MGlobal.UI;
    // Build Main Menu UI screen
    ui.attach(
      Crafty.e("UIFader").fadeColor("#000000").fadeIn(3000), // Fader
      Crafty.e("UIBox").color("#FF8000").attr({ y: 32, w: 640, h: 256 }).centerX() // Title
    );

    // Main Menu
    var m = [
      { ent: Crafty.e("UIText").text("New Game").attr({ w: 156, h: 32 }),
        callback: function() { Crafty.scene("NewGame"); } },
      { ent: Crafty.e("UIText").text("Continue").attr({ w: 32, h: 32 }),
        callback: function() { Crafty.scene("Continue"); } },
      { ent: Crafty.e("UIText").text("Test Map").attr({ w: 256, h: 32 }),
        callback: function() { Crafty.scene("TestMap"); } }
    ];
    ui.attach(Crafty.e("UIMenu")
      .setItems(m)
      .attr({ y: 320 })
      .setCursor(Crafty.e("UIBox").attr({ w: 16, h: 16 }))
      .setCancelCallback(function() { console.log("Cancel"); })
      .centerX()
      .keyCapture()
    );

  },
  // Leave Scene
  function() {
	// TODO: Fadeout
  }
);

// NewGame - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*
  New Game Screen
  - Displays hero selection.
  - Displays story text for hero.
  - Allows player to start the game as that hero after selecting.
  - Canceling from this menu returns to main menu.
*/

// Knight Text

Crafty.scene("NewGame",
  // Enter Scene
  function() {
	// TODO: Fadein
    var ui = D2MGlobal.UI;
    ui.clear();
    ui.attach(Crafty.e("UIText").text("New Game").attr({ w: 156, h: 32 }).centerX());
    // Hero selection menu contents.
    var m = [
      { ent: Crafty.e("UIBox").color("#008000").attr({ w: 128, h: 128 }),
        callback: function() { console.log("Confirm Knight."); },
        sCallback: function() {
          Crafty("D2MHERONAME").text("- Knight -");
          Crafty("D2MHEROINFO").text("The Lord of the Land has tasked you with the quelling of the terrible power eminating from the Dimension Tomb. You are to return victorious or die trying.");
        }
      },
      { ent: Crafty.e("UIBox").color("#000080").attr({ w: 128, h: 128 }),
        callback: function() { console.log("Confirm Arcanist.") },
        sCallback: function() {
          Crafty("D2MHERONAME").text("- Arcanist -");
          Crafty("D2MHEROINFO").text("As an adjunct in the Arcane College, the coucil has elected you to research the great and terrible power detected in the Dimension Tomb!");
        }
      },
      { ent: Crafty.e("UIBox").color("#800000").attr({ w: 128, h: 128 }),
        callback: function() { console.log("Confirm Vrugou.") },
        sCallback: function() {
          Crafty("D2MHERONAME").text("- Vrugou -");
          Crafty("D2MHEROINFO").text("A great magical disturbance has woken you from a thousand year sleep. Someone or something appears to be threatening your own power. Time to find out what or who is behind this.");
        }

      },
    ];

    // Hero name textbox.
    ui.attach(
      Crafty.e("UIText, D2MHERONAME").text("- HERO NAME -")
        .attr({x: 320, y: 128, w: 256, h: 256 }),
      Crafty.e("UIText, D2MHEROINFO")
        .attr({x: 320, y: 184, w: 444, h: 256 })
        .text("This is a text description of the hero's attributes and stuff.")
    );

    // Hero selection.
    ui.attach(Crafty.e("UIMenu")
      .color("#000000", 0)
      .setPadding(32)
      .setHAlignment(64)
      .setItems(m)
      .setCursor(Crafty.e("UIBox").attr({ w: 16, h: 16 }))
      .setCancelCallback(function() { console.log("Cancel"); })
      .attr({ x: 64 })
      .centerY()
      .keyCapture()
    );

  },
  // Leave Scene
  function() {
	  // TODO: Fadeout
  }
);

// Continue- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// TODO: Implement save / load functionality.
/*
  Continue a saved game.
*/
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

// TestMap - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*
 Test Map Environment
*/
Crafty.scene("TestMap",
  // Enter Scene
  function() {
    var ui = D2MGlobal.UI;
    ui.clear();
	// World Generation
    //Crafty.e("WBlock, WSolid").attr({x: 64, y: 64, w: 64, h:472  });
    //Crafty.e("WBlock, WSolid").attr({x: 672, y: 64, w: 64, h:472  });
    //Crafty.e("WBlock, WSolid").attr({x: 128, y: 536, w: 544, h:64  });
    //Crafty.e("WBlock, WSolid").attr({x: 256, y: 472, w: 64, h:64  });
    //Crafty.e("WBlock, WSolid").attr({x: 320, y: 408, w: 64, h:128  });
    //Crafty.e("WBlock, WSolid").attr({x: 384, y: 472, w: 64, h:64  });
    //Crafty.e("WBlock, WSolid").attr({x: 512, y: 344, w: 64, h:64  });
    d2mLoadMap(d2mAtrium, "TESTMAP");
	// Player generation
	var p = Crafty.e("APlayer").attr({x: 148, y: 64});
	Crafty.viewport.follow(p, 0, 0);
	//Crafty.e("GFXBackground").setImage("test.png");
	
  },
  // Leave Scene
  function() {
  }
);
