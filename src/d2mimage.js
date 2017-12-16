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

Crafty.c("GFXBackground", {
	ofsX : 0,
	ofsY : 0,
	lockX : false,
	lockY : true,
	events : {
		"PreRender" : function() { this.scroll(); }
	},
	init : function() { },
	setImage : function(image) {
		Crafty.stage.elem.style.background = "rgb(0, 0, 0) url(res/gfx/" + image + ")  repeat-x 0 center";
		Crafty.stage.elem.style.backgroundSize = "100% 100%";
	},
	scroll : function() {
		var ox = Crafty.viewport.x;
		var oy = Crafty.viewport.y;
		if(this.lockX === false) {
			Crafty.stage.elem.style.backgroundPositionX = ox.toString() + "px";
		}
		if(this.lockY === false) {
			Crafty.stage.elem.style.backgroundPositionY = oy.toString() + "px";
		}
	}
});