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
  walkSpeed : 8,
  airWalk : 0.1,
  jumpImpulse : 256,
  init: function() {
    // TODO: Remove debugging feature for Actor
    this.requires("2D, Canvas, DebugRectangle");
    this.debugStroke("green");
    this.debugRectangle(this);
	this.w = 8;
	this.h = 8;
  }
});

Crafty.c("APlayer", {
	init: function() {
		this.requires("Actor, Gravity, Collision, Controllable");
		
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
		this.walk();
		this.jump();
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
	},
	walk : function() {
		var s = this.walkSpeed;
		if(this.onGround === false) {
			if(this.vx + s > this.walkSpeed || this.vx - s < -this.walkSpeed) {
				return;
			}
			if(this.dpad.r === true) {
				this.vx += s;
			} else if (this.dpad.l === true) {
				this.vx += -s;
			}
			
		} else {
			if(this.dpad.r === true) {
				this.vx = s;
			} else if (this.dpad.l === true) {
				this.vx = -s;
			}

			if(this.ground.friction !== "undefind") {
				this.vx *= this.ground.friction;
			}
		}
		
	},
	jump : function() {
		if(this.onGround === false) {
			return;
		}
		if(this.buttons.a === true) {
			this.vy = -this.jumpImpulse;
		}
	}
});