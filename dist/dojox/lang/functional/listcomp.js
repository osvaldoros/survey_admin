//>>built
define(["dijit","dojo","dojox"],function(j,c,e){c.provide("dojox.lang.functional.listcomp");(function(){var g=/\bfor\b|\bif\b/gm,b=function(a){for(var b=a.split(g),a=a.match(g),c=["var r = [];"],h=[],f=0,e=a.length;f<e;){var i=a[f],d=b[++f];i=="for"&&!/^\s*\(\s*(;|var)/.test(d)&&(d=d.replace(/^\s*\(/,"(var "));c.push(i,d,"{");h.push("}")}return c.join("")+"r.push("+b[0]+");"+h.join("")+"return r;"};c.mixin(e.lang.functional,{buildListcomp:function(a){return"function(){"+b(a)+"}"},compileListcomp:function(a){return new Function([],
b(a))},listcomp:function(a){return(new Function([],b(a)))()}})})()});