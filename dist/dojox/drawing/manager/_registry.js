//>>built
define(["dijit","dojo","dojox"],function(f,e,d){e.provide("dojox.drawing.manager._registry");(function(){var c={tool:{},stencil:{},drawing:{},plugin:{},button:{}};d.drawing.register=function(a,b){b=="drawing"?c.drawing[a.id]=a:b=="tool"?c.tool[a.name]=a:b=="stencil"?c.stencil[a.name]=a:b=="plugin"?c.plugin[a.name]=a:b=="button"&&(c.button[a.toolType]=a)};d.drawing.getRegistered=function(a,b){return b?c[a][b]:c[a]}})()});