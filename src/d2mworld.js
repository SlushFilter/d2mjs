/* d2mworld.js
  Components used for defining bits of the game world.
  eg; blocking areas, decorations, backgrounds ...
*/

// WSolid
/*
  Defines a 'solid' wall or barrier.
*/
Crafty.c("WSolid", {
  init: function() {
    // TODO: Remove debugging feature for WSolid
    this.requires("2D, DebugRectangle");
    this.debugStroke("red");
    this.debugRectangle(this);
  }
});

// WBlock
Crafty.c("WBlock", {
  init: function() {
    // TODO: Remove debugging feature for WBlock
    this.requires("2D, DebugRectangle");
    this.w = 64;
    this.h = 64;
    this.debugStroke("blue");
    this.debugRectangle(this);
  }
});

// WTex
/*
 Adds a tiled texture.
*/
Crafty.c("WTex", {
  init: function() {
    this.requires("2D, Canvas, Image");
  }
});
