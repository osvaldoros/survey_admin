//>>built
define("dojox/data/css",["dojo/_base/lang","dojo/_base/array"],function(h,e){var f=h.getObject("dojox.data.css",!0);f.rules={};f.rules.forEach=function(c,d,b){b&&e.forEach(b,function(a){e.forEach(a[a.cssRules?"cssRules":"rules"],function(g){if(!g.type||g.type!==3){var b="";if(a&&a.href)b=a.href;c.call(d?d:this,g,a,b)}})})};f.findStyleSheets=function(c){var d=[];e.forEach(c,function(b){(b=f.findStyleSheet(b))&&e.forEach(b,function(a){e.indexOf(d,a)===-1&&d.push(a)})});return d};f.findStyleSheet=function(c){var d=
[];c.charAt(0)==="."&&(c=c.substring(1));var b=function(a){if(a.href&&a.href.match(c))return d.push(a),!0;if(a.imports)return e.some(a.imports,function(a){return b(a)});return e.some(a[a.cssRules?"cssRules":"rules"],function(a){if(a.type&&a.type===3&&b(a.styleSheet))return!0;return!1})};e.some(document.styleSheets,b);return d};f.determineContext=function(c){var d=[],c=c&&c.length>0?f.findStyleSheets(c):document.styleSheets,b=function(a){d.push(a);a.imports&&e.forEach(a.imports,function(a){b(a)});
e.forEach(a[a.cssRules?"cssRules":"rules"],function(a){a.type&&a.type===3&&b(a.styleSheet)})};e.forEach(c,b);return d};return f});