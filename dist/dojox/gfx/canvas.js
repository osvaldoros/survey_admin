//>>built
define("dojox/gfx/canvas",["./_base","dojo/_base/lang","dojo/_base/array","dojo/_base/declare","dojo/_base/window","dojo/dom-geometry","dojo/dom","./_base","./shape","./path","./arc","./matrix","./decompose"],function(h,s,v,f,t,x,y,j,g,n,w,o){var e=h.canvas={},l=null,i=o.multiplyPoint,p=Math.PI,z=2*p,u=p/2,j=s.extend;f("dojox.gfx.canvas.Shape",g.Shape,{_render:function(c){c.save();this._renderTransform(c);this._renderShape(c);this._renderFill(c,!0);this._renderStroke(c,!0);c.restore()},_renderTransform:function(c){if("canvasTransform"in
this){var a=this.canvasTransform;c.translate(a.dx,a.dy);c.rotate(a.angle2);c.scale(a.sx,a.sy);c.rotate(a.angle1)}},_renderShape:function(){},_renderFill:function(c,a){if("canvasFill"in this){var b=this.fillStyle;if("canvasFillImage"in this){var d=b.width,e=b.height,q=this.canvasFillImage.width,f=this.canvasFillImage.height,g=Math.min(d==q?1:d/q,e==f?1:e/f),h=(d-g*q)/2,j=(e-g*f)/2;l.width=d;l.height=e;var i=l.getContext("2d");i.clearRect(0,0,d,e);i.drawImage(this.canvasFillImage,0,0,q,f,h,j,g*q,g*
f);this.canvasFill=c.createPattern(l,"repeat");delete this.canvasFillImage}c.fillStyle=this.canvasFill;a&&(b.type==="pattern"&&(b.x!==0||b.y!==0)&&c.translate(b.x,b.y),c.fill())}else c.fillStyle="rgba(0,0,0,0.0)"},_renderStroke:function(c,a){var b=this.strokeStyle;if(b)c.strokeStyle=b.color.toString(),c.lineWidth=b.width,c.lineCap=b.cap,typeof b.join=="number"?(c.lineJoin="miter",c.miterLimit=b.join):c.lineJoin=b.join,a&&c.stroke();else if(!a)c.strokeStyle="rgba(0,0,0,0.0)"},getEventSource:function(){return null},
connect:function(){},disconnect:function(){}});var m=function(c,a,b){var d=c.prototype[a];c.prototype[a]=b?function(){this.surface.makeDirty();d.apply(this,arguments);b.call(this);return this}:function(){this.surface.makeDirty();return d.apply(this,arguments)}};m(e.Shape,"setTransform",function(){this.matrix?this.canvasTransform=h.decompose(this.matrix):delete this.canvasTransform});m(e.Shape,"setFill",function(){var c=this.fillStyle,a;if(c){if(typeof c=="object"&&"type"in c){var b=this.surface.rawNode.getContext("2d");
switch(c.type){case "linear":case "radial":a=c.type=="linear"?b.createLinearGradient(c.x1,c.y1,c.x2,c.y2):b.createRadialGradient(c.cx,c.cy,0,c.cx,c.cy,c.r);v.forEach(c.colors,function(b){a.addColorStop(b.offset,h.normalizeColor(b.color).toString())});break;case "pattern":l||(l=document.createElement("canvas")),b=new Image,this.surface.downloadImage(b,c.src),this.canvasFillImage=b}}else a=c.toString();this.canvasFill=a}else delete this.canvasFill});m(e.Shape,"setStroke");m(e.Shape,"setShape");f("dojox.gfx.canvas.Group",
e.Shape,{constructor:function(){g.Container._init.call(this)},_render:function(c){c.save();this._renderTransform(c);for(var a=0;a<this.children.length;++a)this.children[a]._render(c);c.restore()}});f("dojox.gfx.canvas.Rect",[e.Shape,g.Rect],{_renderShape:function(c){var a=this.shape,b=Math.min(a.r,a.height/2,a.width/2),d=a.x,e=d+a.width,f=a.y,a=f+a.height,g=d+b,h=e-b,i=f+b,j=a-b;c.beginPath();c.moveTo(g,f);b?(c.arc(h,i,b,-u,0,!1),c.arc(h,j,b,0,u,!1),c.arc(g,j,b,u,p,!1),c.arc(g,i,b,p,p+u,!1)):(c.lineTo(h,
f),c.lineTo(e,j),c.lineTo(g,a),c.lineTo(d,i));c.closePath()}});var k=[];(function(){var c=w.curvePI4;k.push(c.s,c.c1,c.c2,c.e);for(var a=45;a<360;a+=45){var b=o.rotateg(a);k.push(i(b,c.c1),i(b,c.c2),i(b,c.e))}})();f("dojox.gfx.canvas.Ellipse",[e.Shape,g.Ellipse],{setShape:function(){this.inherited(arguments);var c=this.shape,a,b,d=[],e=o.normalize([o.translate(c.cx,c.cy),o.scale(c.rx,c.ry)]),c=i(e,k[0]);d.push([c.x,c.y]);for(var f=1;f<k.length;f+=3)a=i(e,k[f]),b=i(e,k[f+1]),c=i(e,k[f+2]),d.push([a.x,
a.y,b.x,b.y,c.x,c.y]);this.canvasEllipse=d;return this},_renderShape:function(c){var a=this.canvasEllipse;c.beginPath();c.moveTo.apply(c,a[0]);for(var b=1;b<a.length;++b)c.bezierCurveTo.apply(c,a[b]);c.closePath()}});f("dojox.gfx.canvas.Circle",[e.Shape,g.Circle],{_renderShape:function(c){var a=this.shape;c.beginPath();c.arc(a.cx,a.cy,a.r,0,z,1)}});f("dojox.gfx.canvas.Line",[e.Shape,g.Line],{_renderShape:function(c){var a=this.shape;c.beginPath();c.moveTo(a.x1,a.y1);c.lineTo(a.x2,a.y2)}});f("dojox.gfx.canvas.Polyline",
[e.Shape,g.Polyline],{setShape:function(){this.inherited(arguments);var c=this.shape.points,a=c[0],b,d;this.bbox=null;this._normalizePoints();if(c.length)if(typeof a=="number")a=c;else{a=[];for(d=0;d<c.length;++d)b=c[d],a.push(b.x,b.y)}else a=[];this.canvasPolyline=a;return this},_renderShape:function(c){var a=this.canvasPolyline;if(a.length){c.beginPath();c.moveTo(a[0],a[1]);for(var b=2;b<a.length;b+=2)c.lineTo(a[b],a[b+1])}}});f("dojox.gfx.canvas.Image",[e.Shape,g.Image],{setShape:function(){this.inherited(arguments);
var c=new Image;this.surface.downloadImage(c,this.shape.src);this.canvasImage=c;return this},_renderShape:function(c){var a=this.shape;c.drawImage(this.canvasImage,a.x,a.y,a.width,a.height)}});f("dojox.gfx.canvas.Text",[e.Shape,g.Text],{_setFont:function(){this.fontStyle?this.canvasFont=h.makeFontString(this.fontStyle):delete this.canvasFont},getTextWidth:function(){var c=this.shape,a=0,b;if(c.text&&c.text.length>0){b=this.surface.rawNode.getContext("2d");b.save();this._renderTransform(b);this._renderFill(b,
!1);this._renderStroke(b,!1);if(this.canvasFont)b.font=this.canvasFont;a=b.measureText(c.text).width;b.restore()}return a},_render:function(c){c.save();this._renderTransform(c);this._renderFill(c,!1);this._renderStroke(c,!1);this._renderShape(c);c.restore()},_renderShape:function(c){var a=this.shape;if(a.text&&a.text.length!=0){c.textAlign=a.align==="middle"?"center":a.align;if(this.canvasFont)c.font=this.canvasFont;this.canvasFill&&c.fillText(a.text,a.x,a.y);this.strokeStyle&&(c.beginPath(),c.strokeText(a.text,
a.x,a.y),c.closePath())}}});m(e.Text,"setFont");t.global.CanvasRenderingContext2D&&(t=t.doc.createElement("canvas").getContext("2d"))&&typeof t.fillText!="function"&&e.Text.extend({getTextWidth:function(){return 0},_renderShape:function(){}});var A={M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",
a:"_arcTo",Z:"_closePath",z:"_closePath"};f("dojox.gfx.canvas.Path",[e.Shape,n.Path],{constructor:function(){this.lastControl={}},setShape:function(){this.canvasPath=[];return this.inherited(arguments)},_updateWithSegment:function(c){var a=s.clone(this.last);this[A[c.action]](this.canvasPath,c.action,c.args);this.last=a;this.inherited(arguments)},_renderShape:function(c){var a=this.canvasPath;c.beginPath();for(var b=0;b<a.length;b+=2)c[a[b]].apply(c,a[b+1])},_moveToA:function(c,a,b){c.push("moveTo",
[b[0],b[1]]);for(a=2;a<b.length;a+=2)c.push("lineTo",[b[a],b[a+1]]);this.last.x=b[b.length-2];this.last.y=b[b.length-1];this.lastControl={}},_moveToR:function(c,a,b){"x"in this.last?c.push("moveTo",[this.last.x+=b[0],this.last.y+=b[1]]):c.push("moveTo",[this.last.x=b[0],this.last.y=b[1]]);for(a=2;a<b.length;a+=2)c.push("lineTo",[this.last.x+=b[a],this.last.y+=b[a+1]]);this.lastControl={}},_lineToA:function(c,a,b){for(a=0;a<b.length;a+=2)c.push("lineTo",[b[a],b[a+1]]);this.last.x=b[b.length-2];this.last.y=
b[b.length-1];this.lastControl={}},_lineToR:function(c,a,b){for(a=0;a<b.length;a+=2)c.push("lineTo",[this.last.x+=b[a],this.last.y+=b[a+1]]);this.lastControl={}},_hLineToA:function(c,a,b){for(a=0;a<b.length;++a)c.push("lineTo",[b[a],this.last.y]);this.last.x=b[b.length-1];this.lastControl={}},_hLineToR:function(c,a,b){for(a=0;a<b.length;++a)c.push("lineTo",[this.last.x+=b[a],this.last.y]);this.lastControl={}},_vLineToA:function(c,a,b){for(a=0;a<b.length;++a)c.push("lineTo",[this.last.x,b[a]]);this.last.y=
b[b.length-1];this.lastControl={}},_vLineToR:function(c,a,b){for(a=0;a<b.length;++a)c.push("lineTo",[this.last.x,this.last.y+=b[a]]);this.lastControl={}},_curveToA:function(c,a,b){for(a=0;a<b.length;a+=6)c.push("bezierCurveTo",b.slice(a,a+6));this.last.x=b[b.length-2];this.last.y=b[b.length-1];this.lastControl.x=b[b.length-4];this.lastControl.y=b[b.length-3];this.lastControl.type="C"},_curveToR:function(c,a,b){for(a=0;a<b.length;a+=6)c.push("bezierCurveTo",[this.last.x+b[a],this.last.y+b[a+1],this.lastControl.x=
this.last.x+b[a+2],this.lastControl.y=this.last.y+b[a+3],this.last.x+b[a+4],this.last.y+b[a+5]]),this.last.x+=b[a+4],this.last.y+=b[a+5];this.lastControl.type="C"},_smoothCurveToA:function(c,a,b){for(a=0;a<b.length;a+=4){var d=this.lastControl.type=="C";c.push("bezierCurveTo",[d?2*this.last.x-this.lastControl.x:this.last.x,d?2*this.last.y-this.lastControl.y:this.last.y,b[a],b[a+1],b[a+2],b[a+3]]);this.lastControl.x=b[a];this.lastControl.y=b[a+1];this.lastControl.type="C"}this.last.x=b[b.length-2];
this.last.y=b[b.length-1]},_smoothCurveToR:function(c,a,b){for(a=0;a<b.length;a+=4){var d=this.lastControl.type=="C";c.push("bezierCurveTo",[d?2*this.last.x-this.lastControl.x:this.last.x,d?2*this.last.y-this.lastControl.y:this.last.y,this.last.x+b[a],this.last.y+b[a+1],this.last.x+b[a+2],this.last.y+b[a+3]]);this.lastControl.x=this.last.x+b[a];this.lastControl.y=this.last.y+b[a+1];this.lastControl.type="C";this.last.x+=b[a+2];this.last.y+=b[a+3]}},_qCurveToA:function(c,a,b){for(a=0;a<b.length;a+=
4)c.push("quadraticCurveTo",b.slice(a,a+4));this.last.x=b[b.length-2];this.last.y=b[b.length-1];this.lastControl.x=b[b.length-4];this.lastControl.y=b[b.length-3];this.lastControl.type="Q"},_qCurveToR:function(c,a,b){for(a=0;a<b.length;a+=4)c.push("quadraticCurveTo",[this.lastControl.x=this.last.x+b[a],this.lastControl.y=this.last.y+b[a+1],this.last.x+b[a+2],this.last.y+b[a+3]]),this.last.x+=b[a+2],this.last.y+=b[a+3];this.lastControl.type="Q"},_qSmoothCurveToA:function(c,a,b){for(a=0;a<b.length;a+=
2){var d=this.lastControl.type=="Q";c.push("quadraticCurveTo",[this.lastControl.x=d?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=d?2*this.last.y-this.lastControl.y:this.last.y,b[a],b[a+1]]);this.lastControl.type="Q"}this.last.x=b[b.length-2];this.last.y=b[b.length-1]},_qSmoothCurveToR:function(c,a,b){for(a=0;a<b.length;a+=2){var d=this.lastControl.type=="Q";c.push("quadraticCurveTo",[this.lastControl.x=d?2*this.last.x-this.lastControl.x:this.last.x,this.lastControl.y=d?2*this.last.y-
this.lastControl.y:this.last.y,this.last.x+b[a],this.last.y+b[a+1]]);this.lastControl.type="Q";this.last.x+=b[a];this.last.y+=b[a+1]}},_arcTo:function(c,a,b){for(var a=a=="a",d=0;d<b.length;d+=7){var e=b[d+5],f=b[d+6];a&&(e+=this.last.x,f+=this.last.y);var g=w.arcAsBezier(this.last,b[d],b[d+1],b[d+2],b[d+3]?1:0,b[d+4]?1:0,e,f);v.forEach(g,function(a){c.push("bezierCurveTo",a)});this.last.x=e;this.last.y=f}this.lastControl={}},_closePath:function(c){c.push("closePath",[]);this.lastControl={}}});v.forEach(["moveTo",
"lineTo","hLineTo","vLineTo","curveTo","smoothCurveTo","qCurveTo","qSmoothCurveTo","arcTo","closePath"],function(c){m(e.Path,c)});f("dojox.gfx.canvas.TextPath",[e.Shape,n.TextPath],{_renderShape:function(){},_setText:function(){},_setFont:function(){}});f("dojox.gfx.canvas.Surface",g.Surface,{constructor:function(){g.Container._init.call(this);this.pendingImageCount=0;this.makeDirty()},setDimensions:function(c,a){this.width=h.normalizedLength(c);this.height=h.normalizedLength(a);if(!this.rawNode)return this;
var b=!1;if(this.rawNode.width!=this.width)this.rawNode.width=this.width,b=!0;if(this.rawNode.height!=this.height)this.rawNode.height=this.height,b=!0;b&&this.makeDirty();return this},getDimensions:function(){return this.rawNode?{width:this.rawNode.width,height:this.rawNode.height}:null},_render:function(){if(!this.pendingImageCount){var c=this.rawNode.getContext("2d");c.save();c.clearRect(0,0,this.rawNode.width,this.rawNode.height);for(var a=0;a<this.children.length;++a)this.children[a]._render(c);
c.restore();"pendingRender"in this&&(clearTimeout(this.pendingRender),delete this.pendingRender)}},makeDirty:function(){if(!this.pendingImagesCount&&!("pendingRender"in this))this.pendingRender=setTimeout(s.hitch(this,this._render),0)},downloadImage:function(c,a){var b=s.hitch(this,this.onImageLoad);!this.pendingImageCount++&&"pendingRender"in this&&(clearTimeout(this.pendingRender),delete this.pendingRender);c.onload=b;c.onerror=b;c.onabort=b;c.src=a},onImageLoad:function(){--this.pendingImageCount||
this._render()},getEventSource:function(){return null},connect:function(){},disconnect:function(){}});e.createSurface=function(c,a,b){if(!a&&!b)var d=x.position(c),a=a||d.w,b=b||d.h;typeof a=="number"&&(a+="px");typeof b=="number"&&(b+="px");var d=new e.Surface,c=y.byId(c),f=c.ownerDocument.createElement("canvas");f.width=h.normalizedLength(a);f.height=h.normalizedLength(b);c.appendChild(f);d.rawNode=f;d._parent=c;return d.surface=d};var r=g.Container,f={add:function(){this.surface.makeDirty();return r.add.apply(this,
arguments)},remove:function(){this.surface.makeDirty();return r.remove.apply(this,arguments)},clear:function(){this.surface.makeDirty();return r.clear.apply(this,arguments)},_moveChildToFront:function(){this.surface.makeDirty();return r._moveChildToFront.apply(this,arguments)},_moveChildToBack:function(){this.surface.makeDirty();return r._moveChildToBack.apply(this,arguments)}},n={createObject:function(c,a){var b=new c;b.surface=this.surface;b.setShape(a);this.add(b);return b}};j(e.Group,f);j(e.Group,
g.Creator);j(e.Group,n);j(e.Surface,f);j(e.Surface,g.Creator);j(e.Surface,n);e.fixTarget=function(){return!0};return e});