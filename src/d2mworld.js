/* d2mworld.js
  Components used for defining bits of the game world.
  eg; blocking areas, decorations, backgrounds ...
*/

// WSolid
/*
  Defines a 'solid' wall or barrier.
*/
Crafty.c("WSolid", {
  friction : 0.8,
  required : "2D, Canvas, Collision, DebugRectangle",
  init: function() {
    // TODO: Remove debugging feature for WSolid
    this.debugStroke("orange");
    this.debugRectangle(this);
  }
});

// WBlock
/*
	Debugging visual aid.
*/
Crafty.c("WBlock", {
  init: function() {
    // TODO: Remove debugging feature for WBlock
    this.requires("2D, Canvas, DebugRectangle");
    this.w = 64;
    this.h = 64;
    this.debugStroke("blue");
    this.debugRectangle(this);
  }
});

// WTex
/*
 Adds a tiled texture.
*/
Crafty.c("WTex", {
  init: function() {
    this.requires("2D, Canvas, Image");
  }
});

function d2mLoadMap(map, comp) {
	console.log(map);
	
	var c = comp;
	if(c !== "") { c += ", "; }

	c = c + map.comp;
	var areas = map.areas;
	var attr = map.attr;
	// iterate over all areas in map
	for(var i = 0; i < areas.length; i++) {
		var area = areas[i];
		var e = Crafty.e(c);
		e.attr(attr);
		e.x = area[0];
		e.y = area[1];
		e.w = area[2];
		e.h = area[3];
	}
	
	// iterate over all elements in map
	for(var key in map) {
		if(key !== "comp" && key !== "areas" && key !== "attr") {
			console.log(key);
			d2mLoadMap(map[key], c);
		}
	}
}