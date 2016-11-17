Crafty.init(800, 600);


/* Script Test - Passed 111716
var test = Crafty.e("D2MScript, D2MScriptListener");

test._f = [
  function (self) { console.log("Hello World!"); self.sleep(3000); },
  function (self) { console.log("1 Second has elapsed"); },
  function (self) { console.log("PAUSE"); self.trigger("SCR_PAUSE"); },
  function (self) { console.log("SLEEP 5000"); self.trigger("SCR_SLEEP", 5000); },
  function (self) { console.log("HALT"); self.trigger("SCR_HALT"); },
  function (self) { console.log("There will need to be a notion of in-game time.") }
];

test.callback = function (self) { console.log("CALLBACK SCRIPT"); };

Crafty.trigger("SCR_START");
*/
