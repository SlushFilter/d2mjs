/* d2mkey.js
 * Description :
 *  D2M Keyboard Controller
 *
 * Purpose :
 *  Provides a queable interface for listening to the keyboard.
 *
 * Global Events :
 * KB_CAPTURE - Entities wanting to read keyboard input need to fire this event
 *              to be added to the front of the stack. They should pass themselves
 *              as an argument.
 * KB_RELEASE - Releasing the keyboard pops the requesting entity out of the
 *              stack (doesnt have to be on top)
 *
 * Private Events :
 *  KB_U : Up
 *  KB_D : Down
 *  KB_L : Left
 *  KB_R : Right
 *  KB_A : Action A
 *  KB_B : Action B
 *  KB_0 : Cancel
 *  KB_1 : Confirm
 *
 */
 
 // KeyController
 /*
	A default KeyController component - Used for passing keyboard presses to listeners.
	Entities that fire the KB_CAPTURE event become the 'focused' entity on the KeyController list.
	They will remain the focused entity until they pass a KB_RELEASE event.
	
	A component that listens to a KeyController should listen for the KB_* events to determine
	when a key is pressed or released. (see header comments for all KB_* events)
 */
Crafty.c("KeyController", {
    init: function() {
      this.bind("KB_CAPTURE", this._capture);
      this.bind("KB_RELEASE", this._release);
      this.bind("KeyDown", this._keyDown);
      this.bind("KeyUp", this._keyUp);
    },
    _keyDown: function(e) {
		if(this._focus === null) { return; }
      if(e.key == Crafty.keys.LEFT_ARROW) {
        this._focus.trigger("KB_L", true);
      } else if (e.key == Crafty.keys.RIGHT_ARROW) {
        this._focus.trigger("KB_R", true);
      } else if (e.key == Crafty.keys.UP_ARROW) {
        this._focus.trigger("KB_U", true);
      } else if (e.key == Crafty.keys.DOWN_ARROW) {
        this._focus.trigger("KB_D", true);
      } else if (e.key == Crafty.keys.A) {
        this._focus.trigger("KB_A", true)
      } else if (e.key == Crafty.keys.B) {
        this._focus.trigger("KB_B", true)
      } else if (e.key == Crafty.keys.ENTER) {
        this._focus.trigger("KB_1", true)
      } else if (e.key == Crafty.keys.ESC) {
        this._focus.trigger("KB_0", true)
      }
    },
    _keyUp: function(e) {
		if(this._focus === null) { return; }
      if(e.key == Crafty.keys.LEFT_ARROW) {
        this._focus.trigger("KB_L", false);
      } else if (e.key == Crafty.keys.RIGHT_ARROW) {
        this._focus.trigger("KB_R", false);
      } else if (e.key == Crafty.keys.UP_ARROW) {
        this._focus.trigger("KB_U", false);
      } else if (e.key == Crafty.keys.DOWN_ARROW) {
        this._focus.trigger("KB_D", false);
      } else if (e.key == Crafty.keys.A) {
        this._focus.trigger("KB_A", false)
      } else if (e.key == Crafty.keys.B) {
        this._focus.trigger("KB_B", false)
      } else if (e.key == Crafty.keys.ENTER) {
        this._focus.trigger("KB_1", false)
      } else if (e.key == Crafty.keys.ESC) {
        this._focus.trigger("KB_0", false)
      }
    },
    _capture: function(ent) {
      if(ent === null || ent === undefined) { return; }
      this._keyQueue.push(ent);
      this._focus = ent;
    },
    _release: function(ent) {
      if(ent === null || ent === undefined) {
        this._keyQueue.pop();
      } else {
        var i = this._keyQueue.indexOf(ent);
        if(i > -1) {
          this._keyQueue.splice(i, this._keyQueue);
        }
      }
      if(this._keyQueue.length === 0) {
        this._focus = null
      } else {
        this._focus = this.keyQueue.length - 1;
      }
    },
    _focus: null,
    _keyQueue: [] // Global keyboard listener array.
});

// KeyListener
// TODO: Fully bugtest KB_RELEASE behavior :)
/*
  Any entities that wish to read keyboard input should be tagged as a KeyListener
*/
Crafty.c("KeyListener", {
  init: function() {
  },
  keyCapture: function() {
    Crafty.trigger("KB_CAPTURE", this);
    return this;
  },
  keyRelease: function() {
    Crafty.trigger("KB_RELEASE", this);
    return this;
  }
});

// PlayerController
/*
	A Controller state that contains all information on the current state of a controller.
	Stored in a _keyState object - see code for valid values.
*/
Crafty.c("Controller", {
	init: function() {
		this._keyState = { left: false, right: false, up: false, down: false, a: false, b: false, cancel: false, confirm: false };
		this.bind("KB_U", function(e) { this._keyState.left = e; });
		this.bind("KB_D", function(e) { this._keyState.right = e; });
		this.bind("KB_L", function(e) { this._keyState.up = e; });
		this.bind("KB_R", function(e) { this._keyState.down = e; });
		this.bind("KB_A", function(e) { this._keyState.a = e; });
		this.bind("KB_B", function(e) { this._keyState.b = e; });
		this.bind("KB_0", function(e) { this._keyState.cancel = e; });
		this.bind("KB_1", function(e) { this._keyState.confirm = e; });
	}
});