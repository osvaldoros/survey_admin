//>>built
define(["dijit","dojo","dojox"],function(d,c,a){c.provide("dojox.drawing.tools.Arrow");a.drawing.tools.Arrow=a.drawing.util.oo.declare(a.drawing.tools.Line,function(b){if(this.arrowStart)this.begArrow=new a.drawing.annotations.Arrow({stencil:this,idx1:0,idx2:1});if(this.arrowEnd)this.endArrow=new a.drawing.annotations.Arrow({stencil:this,idx1:1,idx2:0});this.points.length&&(this.render(),b.label&&this.setLabel(b.label))},{draws:!0,type:"dojox.drawing.tools.Arrow",baseRender:!1,arrowStart:!1,arrowEnd:!0,
labelPosition:function(){var b=this.data,b=a.drawing.util.positioning.label({x:b.x1,y:b.y1},{x:b.x2,y:b.y2});return{x:b.x,y:b.y}},onUp:function(b){if(!this.created&&this.shape){var a=this.points;this.util.distance(a[0].x,a[0].y,a[1].x,a[1].y)<this.minimumSize?this.remove(this.shape,this.hit):(b=this.util.snapAngle(b,this.angleSnap/180),this.setPoints([{x:a[0].x,y:a[0].y},{x:b.x,y:b.y}]),this.renderedOnce=!0,this.onRender(this))}}});a.drawing.tools.Arrow.setup={name:"dojox.drawing.tools.Arrow",tooltip:"Arrow Tool",
iconClass:"iconArrow"};a.drawing.register(a.drawing.tools.Arrow.setup,"tool")});