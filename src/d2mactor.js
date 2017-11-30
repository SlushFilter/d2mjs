/* d2mactor.js
 * Description :
 *  D2M Actor framework. 
 *
 * Purpose :
 *  Provides Components and helper functions for defining, creating and destroying actors in the game world.
 *
 * Global Events :
 *
 * Private Events :
 *
 */

// Actor
/*
	Base component for all actors.
*/
Crafty.c("Actor", {
  init: function() {
    // TODO: Remove debugging feature for Actor
    this.requires("2D, DebugRectangle");
    this.debugStroke("green");
    this.debugRectangle(this);
	this.w = 8;
	this.h = 8;
  }
});

// APlayer
Crafty.c("APlayer", {
	init: function() {
		this.requires("Actor, KeyListener, Controller, Motion");
		this.keyCapture();
	},
	handleControl : function(d) {
		console.log(this._keyState);
	}
});

// PKnight
/*
	Knight player-character.
*/
Crafty.c("PKnight", {
	init: function() {
		this.requires("APlayer");
	}
});