/* d2mui.js
 * Description :
 *  D2M UI Components and control objects for an interactive User Interface.
 *
 * Purpose :
 *  Provides Image and Textual information to the user and collects feedback.
 * Global Events :
 *
 * Private Events :
 *
 */
// UIAnchor
/*
  'Anchor' point for all UI elements. Automatically updates its coords to the
  viewport to make a static looking UI. UI Elements should attach to this.
*/
Crafty.c("UIAnchor", {
  init: function() {
    this.requires("2D");
    this.bind("ViewportScroll", function(d) {
      // Round x and y coordinates to prevent jitter.
      this.x = -Math.round(Crafty.viewport._x);
      this.y = -Math.round(Crafty.viewport._y);
    });
  },

  // clear()
  /* Remove and destroy all children. */
  clear: function() {
    while(this._children.length > 0) {
      this._children.pop().destroy();
    }
    return this;
  }
});

// UIElement
/*
  Base component for all UI entities.
*/

Crafty.c("UIElement", {
   init: function() {
     this.requires("2D");
   },
   centerX: function() {
     this.x = (D2MDefine.SCREEN_W - this.w) / 2;
     return this;
   },
   centerY: function() {
     this.y = (D2MDefine.SCREEN_H - this.h) / 2;
     return this;
   }
});

// UIImage
/*
  Static Image used for displaying data to the user.
*/
Crafty.c("UIImage", {
  init: function() {
    this.requires("UIElement, Canvas, Image");
    this.z = D2MDefine.UI_IMAGE;
  }
});

// UIText
/*
  Static Text UI element.
  note: Custom HTML5 fonts can be loaded from d2mjs.html with the following code
  @font-face {
  font-family: 'Tagesschrift';
  src: url('tagesschrift.eot'); // IE 5-8
  src: local('☺'),             // sneakily trick IE
        url('tagesschrift.woff') format('woff'),    // FF 3.6, Chrome 5, IE9
        url('tagesschrift.ttf') format('truetype'), // Opera, Safari
        url('tagesschrift.svg#font') format('svg'); // iOS
  }
*/

Crafty.c("UIText", {
  init: function() {
    this.requires("UIElement, Canvas, Text");
    this.z = D2MDefine.UI_TEXT;
    // Default white color.
    this.textColor("#FFFFFF");
    // Default font.
    this.textFont({ size: "32px", family: "Lucida Console", weight: "bold"});
  }
});

//UIBox
/*
  A filled rectangle for UI Menus.
*/
Crafty.c("UIBox", {
  init: function() {
    this.requires("UIElement, Canvas, Color");
    this.z = D2MDefine.UI_IMAGE;
    // Default yellow color.
    this.color("#FFFF00");
  }
});

//UIFader
/*
  A full screen box designed to fade out the screen.
*/
Crafty.c("UIFader", {
  init: function() {
    this.requires("UIBox");
    this.z = D2MDefine.UI_TOP;
    this.fadeColor("#000000");
    this.w = D2MDefine.SCREEN_W;
    this.h = D2MDefine.SCREEN_H;
  },
  fadeOut: function(t) {
    if(t <= 0) { t = 1; }
    this._duration = t;
    this._timer = 0;
    this._alpha = 0;
    this._fadeIn = false;
    this.bind("EnterFrame", this._fade);
    return this;
  },
  fadeIn: function(t) {
    if(t <= 0) { t = 1; }
    this._duration = t;
    this._timer = 0;
    this._alpha = 1;
    this._fadeIn = true;
    this.bind("EnterFrame", this._fade);
    return this;
  },
  fadeColor : function(c) {
    this._colorString = c;
    this.color(c);
    return this;
  },
  _fade: function(data) {
    this._timer += data.dt;
    if(this._timer >= this._duration) {
      this._timer = this._duration;
      this.unbind("EnterFrame");
    }
    if(this._fadeIn === false) {
      this._alpha = this._timer / this._duration;
    } else {
      this._alpha = 1 - (this._timer / this._duration);
    }
    this.color(this._colorString, this._alpha);
  },
  _colorString: "#000000",
  _alpha: 0,
  _timer: 0,
  _duration: 0,
  _fadeIn: false
})
