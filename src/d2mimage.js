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

Crafty.c("GFXBackgroundTest", {
	required : "2D, Canvas, Image",
	ofsX : 0,
	init: function() {
		Crafty.stage.elem.style.background = "rgb(0, 0, 0) url(res/gfx/test.png) repeat-x 0 center";
		Crafty.stage.elem.style.backgroundSize = "100% 100%";
		this.bind("EnterFrame", function() { this.blahblah(); });
		console.log(Crafty.stage.elem.style.background);
	},
	blahblah : function() {
			Crafty.stage.elem.style.backgroundPositionX = this.ofsX.toString() + "px";
			this.ofsX++;
			console.log(this.ofsX);
	}
});