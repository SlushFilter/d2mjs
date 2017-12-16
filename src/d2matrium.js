/* d2mmap0.js
 * Description :
 *  Atrium Map
 */

var d2mAtrium = {
	comp : "",
	attr : { },
	areas : [ ],
	
	blockMap : {
		comp : "WSolid",
		attr : { friction : 1 },
		areas : [ 
			[ 64 , 64, 64, 472 ],
			[ 672 , 64, 64, 472 ],
			[ 128 , 536, 544, 64 ]
		]
	},
	
	debugMap : {
		comp : "WBlock",
		attr : { },
		areas : [
			[ 128, 64, 64, 64 ]
		]
	}
}; 