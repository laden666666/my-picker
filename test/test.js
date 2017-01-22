/**
 * Created by njz on 17/1/22.
 */
var jsdom = require("jsdom");

jsdom.env(
    `<html>\
       <head>\
        
       </head>\
       <body></body>\
    </html>`,
    ["../dist/picker.js"],
    function (err, window) {
        
    }
);