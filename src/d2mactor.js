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

Crafty.c("Mobile", {
	_vel : { x:0, y:0 },
	_acc : { x:0, y:0 },
	_maxVel : {x:64, y:64},
	init: function() {
		this.requires("Actor");
		this.bind("EnterFrame", this._move);
	},
	_force : function(var x, var y) {
		this._acc.x = x;
		this._acc.y = y;
	},
	_stop : function() {
		this._vel.x = 0;
	},
	_move : function() {
		if(this._vel.x < -this._maxVel.x) {
			this._vel.x = -this._maxVel.x;
		}
		if(this._vel.x > this._maxVel.x) {
			this._vel.x = this._maxVel.x;
		}
		if(this._vel.y < -this._maxVel.y) {
			this._vel.y = -this._maxVel.y;
		}
		if(this._vel.y > this._maxVel.y) {
			this._vel.y = this._maxVel.y;
		}
		this.x += this._vel.x;
		this.y += this._vel.y;
	}
});

// APlayer
Crafty.c("APlayer", {
	thrust : { x:0, y:0 },
	init: function() {
		this.requires("Actor, KeyListener, Mobile");
		this.bind("KB_L", this._kl);
		this.bind("KB_R", this._kr);
		this.bind("KB_U", this._ku);
		this.bind("KB_D", this._kd);
		this.keyCapture();
	},
	
	_kl : function(k) {
		this._accel()
	},
	_kr : function(k) {
		this.vel.x = 1;
	},
	_ku : function(k) {
		this.vel.y = -1;
	},
	_kd : function(k) {
		this.vel.y = 1;
	}
	
});

// PKnight
/*
	Knight player-character.
*/
Crafty.c("PKnight", {
	init: function() {
		this.requires("APlayer");
		this.w = 48;
		this.h = 96;
		this.x = 100;
		this.y = 100;
	}
	
});