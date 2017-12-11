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
		this.requires("Actor, Gravity, Collision, Controllable, MVFloat");
		
		this.gravity("WSolid");
		this.antigravity();
		// Collision
		this.bind("LandedOnGround", function() { this.onGround = true; });
		this.bind("LiftedOffGround", function() { this.onGround = false;});
		this.bind("Moved", this.checkCollision);
		
		// Controller Linkage
		this.dpad = { l: false, r: false, u: false, d: false };
		this.buttons = { a: false, b: false };
		
		this.linkInput("DirectionalInput", "Dpad", function(d){ this.updateDpad(d); });
		this.linkInput("TriggerInputDown", "A", function() { this.buttons.a = true; });
		this.linkInput("TriggerInputUp"  , "A", function() { this.buttons.a = false;});
		this.linkInput("TriggerInputDown", "B", function() { this.buttons.b = true; });
		this.linkInput("TriggerInputUp"  , "B", function() { this.buttons.b = false;});
		
		this.onGround = false;
		this.walkSpeed = 186;
		this.w = 48;
		this.h = 96;
		
		// Per-Loop actions
		this.bind("EnterFrame", this.think);
	},
	think : function() {
		// Walk controls
		// this.actMove(this.dpad.l, this.dpad.r, this.buttons.a);
		// Float Controls
		this.actMove(this.dpad.u, this.dpad.d, this.dpad.l, this.dpad.r);
	},
	checkCollision : function(c) {
        var hitDatas, hitData;
        if ((hitDatas = this.hit('WSolid'))) {
          hitData = hitDatas[0]; 
          if (hitData.type === 'SAT') { 
			
            this.x -= ((hitData.overlap - 0.5) * hitData.normal.x);
            this.y -= ((hitData.overlap - 0.5) * hitData.normal.y);
			if(hitData.normal.y !== 0 && Math.sign(hitData.normal.y) != Math.sign(this.vy)) { 
				this.vy = 0; 
			}
			if(hitData.normal.x !== 0 && Math.sign(hitData.normal.x) != Math.sign(this.vx)) { 
				this.vx = 0;
			}
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
	_airWalkSpeed : 64,
	_airWalkAccel : 8,
	_jumpImpulse : 256,
	init : function() {
		this.requires("Actor, Gravity, Collision");
	},
	actMove : function(left, right, jump) {
		var s = this._walkSpeed;
		var a = this._walkAccel;
		if(this.ground !== null) {
			// Apply ground friction
			this.vx = this.vx * this.ground.friction;
			// JumP!
			if(jump === true) {
				this.jump(this._jumpImpulse);
			}
		} else {
			// Airwalk
			s = this._airWalkSpeed;
			a = this._airWalkAccel;
		}
		if(left === true) {
			this.walk(-1, s, a);
		}
		if(right === true) {
			this.walk(1, s, a);
		}
	},
	walk : function(dir, spd, acc) {
		var s = spd;
		var a = acc;
		
		if(dir < 0 && this.vx > -s) {
			this.vx -= a;
			if(this.vx < -s) { this.vx = -s; }
		} else if(dir > 0 && this.vx < s) {
			this.vx += a;
			if(this.vx > s) { this.vx = s; }
		}
	},
	jump : function(impulse) {
		this.vy += -impulse;
	}
});

Crafty.c("MVFloat", {
	_floatSpeed : 188,
	_floatAccel : 188,
	_floatAirFriction : 0.85,
	init : function() {
		this.requires("Actor");
		
	},
	actMove : function(up, down, left, right) {
		var x = 0;
		var y = 0;
		
		if(up === true) {
			y -= 1;
		}
		if(down == true) {
			y += 1;
		}
		if(left === true) {
			x -= 1;
		}
		if(right === true) {
			x += 1;
		}
		this.float(x, y, this._floatSpeed, this._floatAccel);
	},
	float : function(x, y, spd, acc) {
		if(x == 0){
			this.vx = this.vx * this._floatAirFriction;
		}
		else if(x < 0 && this.vx > -spd) {
			this.vx -= acc;
			if(this.vx < -spd) { this.vx = -spd; }
		} else if(x > 0 && this.vx < spd) {
			this.vx += acc;
			if(this.vx > spd) { this.vx = spd; }
		}
		
		if(y == 0) {
			this.vy = this.vy * this._floatAirFriction;
		} else if (y < 0 && this.vy > -spd) {
			this.vy -= acc;
			if(this.vy < -spd) { this.vy = -spd; }
		} else if(y > 0 && this.vy < spd) {
			this.vy += acc;
			if(this.vy > spd) { this.vy = spd; }
		}

	}
});