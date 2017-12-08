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
    this.requires("2D, Canvas, DebugRectangle");
    this.debugStroke("green");
    this.debugRectangle(this);
	this.w = 8;
	this.h = 8;
  }
});

// APlayer
/*
	The Player Actor
*/
Crafty.c("APlayer", {
	init: function() {
		this.requires("Actor, Gravity, Collision, Controllable, MVNormal");
		
		this.gravity("WSolid");
		
		// Collision
		this.bind("LandedOnGround", function() { this.onGround = true; });
		this.bind("LiftedOffGround", function() { this.onGround = false;});
		this.bind("Moved", this.checkCollision);
		
		// Controller Linkage
		this.dpad = { l: false, r: false, u: false, d: false };
		this.buttons = { a: false, b: false };
		
		this.linkInput("DirectionalInput", "Dpad", function(d){ this.updateDpad(d); });
		this.linkInput("TriggerInputDown", "A", function() { this.buttons.a = true; console.log(this.buttons); });
		this.linkInput("TriggerInputUp"  , "A", function() { this.buttons.a = false; console.log(this.buttons);});
		this.linkInput("TriggerInputDown", "B", function() { this.buttons.b = true; console.log(this.buttons);});
		this.linkInput("TriggerInputUp"  , "B", function() { this.buttons.b = false; console.log(this.buttons);});
		
		this.onGround = false;
		this.walkSpeed = 186;
		this.w = 48;
		this.h = 96;
		
		// Per-Loop actions
		this.bind("EnterFrame", this.think);
	},
	think : function() {
		this.actMove(this.dpad.l, this.dpad.r, this.buttons.a);
	},
	checkCollision : function(c) {
        var hitDatas, hitData;
        if ((hitDatas = this.hit('WSolid'))) {
          hitData = hitDatas[0]; 
          if (hitData.type === 'SAT') { 
            this.x -= hitData.overlap * hitData.normal.x;
            this.y -= hitData.overlap * hitData.normal.y;
			if(hitData.normal.y !== 0) { this.vy = 0; }
			if(hitData.normal.x !== 0) { this.vx = 0; }
          } else { // Handle an MBR collision
			console.log("Collided with WSolid that has no SAT collision defined.");
            this[c.axis] = c.oldValue;
          }
        }	
	},
	updateDpad : function(d) {
		if(d.x < 0) { this.dpad.l = true; } else { this.dpad.l = false; }
		if(d.x > 0) { this.dpad.r = true; } else { this.dpad.r = false; }
		if(d.y < 0) { this.dpad.u = true; } else { this.dpad.u = false; }
		if(d.y > 0) { this.dpad.d = true; } else { this.dpad.d = false; }
	}
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	Movement Types
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// MVNormal
/*
	Basic Walking and Jumping Behavior
*/
Crafty.c("MVNormal", {
	_walkSpeed : 186,
	_walkAccel : 32,
	_jumpImpulse : 256,
	init : function() {
		this.requires("Actor, Gravity, Collision");
	},
	actMove : function(left, right, jump) {
		if(this.ground !== null) {
			// Apply ground friction
			this.vx = this.vx * this.ground.friction;
			if(left === true) {
				this.walk(-1);
			}
			if(right === true) {
				this.walk(1);
			}
			if(jump === true) {
				this.jump();
			}
		}
	},
	walk : function(dir) {
		var s = this._walkSpeed;
		var a = this._walkAccel;
		if(this.ground !== null) {
			if(dir < 0 && this.vx > -s) {
				this.vx -= a;
				if(this.vx < -s) { this.vx = -s; }
			} else if(dir > 0 && this.vx < s) {
				this.vx += a;
				if(this.vx > s) { this.vx = s; }
			}
		}
	},
	jump : function() {
		var i = this._jumpImpulse;
		if(this.ground !== null && this.vy > -i) {
			this.vy += -i;
		}
	}
});