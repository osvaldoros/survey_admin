//>>built
define(["dijit","dojo","dojox","dojo/require!dijit/layout/StackContainer"],function(c,b){b.provide("dojox.layout.ext-dijit.layout.StackContainer-touch");b.experimental("dojox.layout.ext-dijit.layout.StackContainer-touch");b.require("dijit.layout.StackContainer");b.connect(c.layout.StackContainer.prototype,"postCreate",function(){this.axis=this.baseClass=="dijitAccordionContainer"?"Y":"X";b.forEach(["touchstart","touchmove","touchend","touchcancel"],function(b){this.connect(this.domNode,b,function(a){switch(a.type){case "touchmove":a.preventDefault();
this.touchPosition&&(a=a.touches[0]["page"+this.axis]-this.touchPosition,Math.abs(a)>100&&(this.axis=="Y"&&(a*=-1),delete this.touchPosition,a>0?!this.selectedChildWidget.isLastChild&&this.forward():!this.selectedChildWidget.isFirstChild&&this.back()));break;case "touchstart":if(a.touches.length==1){this.touchPosition=a.touches[0]["page"+this.axis];break}case "touchend":case "touchcancel":delete this.touchPosition}})},this)})});