/* d2mimage.js
  Image Component registry.
*/

Crafty.c("ImgTest", {
    init: function() {
      this.requires("2D, Canvas, Image");
      this.image("res/gfx/test.png", "repeat");
    }
  }
);
