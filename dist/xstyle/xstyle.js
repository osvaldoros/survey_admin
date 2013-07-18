//>>built
typeof define=="undefined"&&function(){var o={};define=function(h,g,j){for(var i=0;i<g.length;i++)g[i]=o[g[i]];o[h]=j.apply(this,g)};require=function(h){define("",h,factory)}}();
define("xstyle/xstyle",["require"],function(o){function h(e){for(var e=document.getElementsByTagName(e),a=0;a<e.length;a++)g(e[a])}function g(e,a,i){function r(){o(["./load-imports"],function(f){f(e,function(){g(e,a,!0)})})}var f=e.sheet||e.styleSheet,l=f.needsParsing,h=f.rules||f.cssRules;if(f.imports&&!i&&f.imports.length)return r();if(!l)for(var p=0;p<h.length;p++){var m=h[p];if(m.href&&!i)return r();m.selectorText&&m.selectorText.substring(0,2)=="x-"&&(l=!0)}l&&j(f.source||f.ownerElement.innerHTML,
f,a)}function j(e,a,h){function g(b,c,t){(k[b]||(k[b]={}))[c]=t}function f(b){k[b]||(k[b]={});g("selector","x-"+b,{onRule:function(c){c.eachProperty(function(c,a){do{var d=a.match(/require\s*\((.+)\)|([^, ]+)([, ]+(.+))?/);if(d[1])return g(b,c,d[1]);var e=d[2];if(e=="default"){if(b=="property"&&typeof i.style[c]=="string")break;if(b=="pseudo")try{document.querySelectorAll("x:"+c);break}catch(h){}}else if(e=="prefix"){if(typeof i.style[q+c]=="string")return g(b,c,"xstyle/xstyle")}else return g(b,c,
function(){return a})}while(a=d[4])})}})}function l(){}function n(b,c){var a=b;do{var d=k.property[b];if(d)return m(d,"onProperty",a,c);b=b.substring(0,b.lastIndexOf("-"))}while(b)}function p(b,c){var a=k.selector[b];a&&m(a,"onRule",c)}function m(b,c,e,f){if(b){var g=d,i=function(c){console.log("loaded ",b,c);c&&a.addRule(g.fullSelector(),c);--j==0&&h&&h(a)};j++;console.log("loading ",b,e,f);var s=function(b){(b=b[c](e,f,g,a))&&b.then?b.then(i):i(b)};typeof b=="string"?o([b],s):s(b)}}if(!a.addRule)a.addRule=
function(b,c,a){return this.insertRule(b+"{"+c+"}",a>=0?a:this.cssRules.length)};if(!a.deleteRule)a.deleteRule=sheet.removeRule;var k={property:{}};f("property");f("value");f("pseudo");var j=1;(a.href||location.href).replace(/[^\/]+$/,"");var u=/(?:^|\W)()(?:$|\W)/;l.prototype={eachProperty:function(b){this.cssText.replace(/\s*([^;:]+)\s*:\s*([^;]+)?/g,function(c,a,d){b(a,d)});if(this.children)for(var c=0;c<this.children.length;c++){var a=this.children[c];a.selector||b(a.property,a)}},fullSelector:function(){return(this.parent?
this.parent.fullSelector():"")+(this.selector||"")+" "},add:function(b,c){c&&(a.addRule?a.addRule(b,c):a.insertRule(b+"{"+c+"}",a.cssRules.length))},cssText:""};var d=new l;d.css=e;e.replace(/\s*(?:([^{;\s]+)\s*{)?\s*([^{}]+;)?\s*(};?)?/g,function(b,c,a,e){if(c)b=new l,(d.children||(d.children=[])).push(b),b.parent=d,c.charAt(c.length-1)==":"?b.property=c.substring(0,c.length-1):b.selector=c,d=b;a&&(d.cssText+=a);if(e){d.cssText.replace(/\s*([^;:]+)\s*:\s*([^;]+)?/g,function(a,b,c){n(b,c);c.replace(u,
function(){})});if(d.children)for(c=0;c<d.children.length;c++)a=d.children[c],a.selector||n(a.property,a);p(d.selector,d);d.selector&&d.selector.replace(/:([-\w]+)/,function(b,a){var c=k.pseudo[a];c&&m(c,"onPseudo",a,d)});d=d.parent}});--j==0&&h&&h(a)}var i=document.createElement("div"),n=navigator.userAgent,q=n.indexOf("WebKit")>-1?"-webkit-":n.indexOf("Firefox")>-1?"-moz-":n.indexOf("MSIE")>-1?"-ms-":n.indexOf("Opera")>-1?"-o-":"";h("link");h("style");return{process:g,vendorPrefix:q,onProperty:function(e,
a){if(e=="opacity"&&q=="-ms-")return"filter: alpha(opacity="+a*100+"); zoom: 1;";return q+e+":"+a+";"}}});