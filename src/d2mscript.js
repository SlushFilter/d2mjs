/* d2mscript.js
 * Description :
 *  A D2M Script is, in its simplest form, an event driven sequence of function calls with delayed callback features.
 *
 * Purpose :
 *  Solves the problem of stepping through a series of API calls in a sequentially and timed fasion.
 *
 * Private Events :
 *  S_START
 *  S_HALT
 *  S_PAUSE
 *  S_RESUME
 *  S_SLEEP(t) - Sleep for int t milliseconds.
 */

// D2MScript
/*
  Base component for scripts. Contains an array of raw functions, in sequence, and basic controls to step through them.
  Derivitaves can contain state data as well.

  Functions that are contained in a script should accept the script entity as a passed parameter.
*/

Crafty.c("D2MScript", {

  init: function() {
    this._f = [];
    this._fi = 0;
    this._state = 0;
    this.callback = null;
  },

  _f: null, // Function Array
  _fi : 0,  // Function Index
  _state : 0, // Running (1) or stopped (0) state
  callback : null, // Callback function to fire when complete.
  script: function(funArray) {
    this._f = funArray;
    this._fi = 0;
    this._state = 0;
    return this;
  },
  step: function() {
    // Check for a running state.
    if(this._state === 0) { return; }

    if(this._fi >= this._f.length) {
      this.halt();
      if(this.callback !== null) {
        this.callback(this)
      }
      return;
    } else {
      this._f[this._fi](this);
      this._fi++;
    }
  },

  start: function() {
    this._fi = 0;
    this.uniqueBind("PostRender", this.step);
    this._state = 1;
  },

  halt: function() {
    this._fi = 0;
    this.unbind("PostRender");
    this._state = 0;
  },

  pause: function() {
    this.unbind("PostRender");
    this._state = 0;
  },

  resume: function() {
    this.uniqueBind("PostRender", this.step);
    this._state = 1;
  },

  sleep: function(time) {
    this.pause();
    this.timeout(this.resume, time);
  }
});

// D2MScriptListener
/*
  Binds a script to control events.
*/

Crafty.c("D2MScriptListener", {
  init: function() {
    this.requires("D2MScript");
    this.bind("S_START", this.start);
    this.bind("S_RESUME", this.resume);
    this.bind("S_PAUSE", this.pause);
    this.bind("S_HALT", this.halt);
    this.bind("S_SLEEP", this.sleep);
  }
});
