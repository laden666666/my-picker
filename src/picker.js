var frame = require("./frame");
var Pulley = require("./pulley");
var style = require("./style/style.scss");

var arr = [];
for(var i = 0; i < 100; i++) arr.push(i);
var pulley = new Pulley(arr);
var pulley2 = new Pulley(arr);
var pulley3 = new Pulley(arr);

frame.body().append(pulley.dom );
frame.body().append(pulley2.dom );
frame.body().append(pulley3.dom );

window.picker = frame;
