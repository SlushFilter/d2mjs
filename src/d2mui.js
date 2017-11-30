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
    this.requires("2D, Persist");
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
*/

Crafty.c("UIText", {
  init: function() {
    this.requires("UIElement, DOM, Text");
    this.z = D2MDefine.UI_TEXT;
    // Default white color.
    this.textColor("#FFFFFF");
    // Default font.
    this.textFont({ size: "32px", family: "D2M"});
    this.unselectable();
  },
  oneLine : function() {
	console.log("Depricated");
	return this;
  }
});

//UIBox
/*
  A filled rectangle for UI Menus.
*/
Crafty.c("UIBox", {
  init: function() {
    this.requires("UIElement, DOM, Color");
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


//UIMenu
/*
  A basic text menu. User must supply a cursor and menu items.

  Menu items are defined as an array of objects :
  items [
    { text: "text",
      callback: function() { } // Called when the item has been confirmed.
      sCallback: function() { } // (optional) Called when the cursor lands on this item.
    },
  ]

*/

Crafty.c("UIMenu", {
  init: function() {
    this.requires("UIElement, KeyListener, Canvas, Color");
    this._items = [];
    this._itemY = this.pad;
    this.color("#000080");
    this.z = D2MDefine.UI_TOP;
    // Keyboard Binds
    this.bind("KB_U", this.selPrev);
    this.bind("KB_D", this.selNext);
    this.bind("KB_1", this.select);
    this.bind("KB_0", this.cancel);
  },
  setPadding: function(pad) {
    this.pad = pad;
    return this;
  },
  /*
    setItems(items)
    Add an array of item objects and align them in the menu.
    This resizes the UIMenu accordingly.
  */
  setItems: function(items) {
    this._items = items;
    var yy = this.pad;
    // Add all items and align them.
    for(var i = 0; i < this._items.length; i++) {
      var item = this._items[i].ent;
      this.attach(item);
      item.x = this._itemX;
      // Update UIMenu size if needed.
      if(item.x + item.w + this.pad + this._itemX > this.w ) {
        this._w = item.x + item.w + this.pad + this._itemX;
      }
      item.y = yy;
      item.z = this.z + 1;
      yy = yy + item.h + this.pad;
    }
    this._h = yy;
    console.log(item.h);
    return this;
  },
  select: function(keyDown) {
    if(keyDown === false) { return; }
    this._items[this._index].callback();
  },
  cancel: function(keyDown) {
    if(keyDown === false) { return; }
    this._cancel();
  },
  setCancelCallback: function(callback) {
    this._cancel = callback;
    return this;
  },
  setCursor: function(cursor) {
    if(this.cursor != null) {
      this.detach(this.cursor);
      this.cursor.destroy();
    }
    this.cursor = cursor;
    this.attach(cursor);
    cursor.x = this.pad;
    cursor.z = this.z + 1;
    if(this.items !== null) {
      this.setPosition();
    }
    return this;
  },
  setPosition: function() {
    var i = this._items[this._index].ent;
    this.cursor.y = (i.y + ~~(i.h / 2)) - ~~(this.cursor.h / 2);
    if(typeof(this._items[this._index].sCallback) == 'function') {
      this._items[this._index].sCallback();
    }
    return this;
  },
  selNext: function(keyDown) {
    if(keyDown === false) { return; }
    this._index++;
    if(this._index >= this._items.length) {
      this._index = 0;
    }
    return this.setPosition();
  },
  selPrev: function(keyDown) {
    if(keyDown === false) { return; }
    this._index--;
    if(this._index < 0) {
      this._index = this._items.length - 1;
    }
    return this.setPosition();
  },
  setHAlignment: function(x) {
    this._itemX = x;
    return this;
  },
  cursor: null,
  pad:4, // Default 4 pixel padding.
  _index: 0,
  _itemX: 32,
  _itemY: 0,
  _cursor: null,
  _items: null,
});
