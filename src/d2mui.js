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
     console.log(this._w);
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
