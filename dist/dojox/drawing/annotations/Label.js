//>>built
define(["dijit","dojo","dojox","dojo/require!dojox/drawing/stencil/Text"],function(f,b,e){b.provide("dojox.drawing.annotations.Label");b.require("dojox.drawing.stencil.Text");e.drawing.annotations.Label=e.drawing.util.oo.declare(e.drawing.stencil.Text,function(a){this.master=a.stencil;this.labelPosition=a.labelPosition||"BR";if(b.isFunction(this.labelPosition))this.setLabel=this.setLabelCustom;this.setLabel(a.text||"");this.connect(this.master,"onTransform",this,"setLabel");this.connect(this.master,
"destroy",this,"destroy");this.style.labelSameColor&&this.connect(this.master,"attr",this,"beforeAttr")},{_align:"start",drawingType:"label",setLabelCustom:function(a){var c=b.hitch(this.master,this.labelPosition)();this.setData({x:c.x,y:c.y,width:c.w||this.style.text.minWidth,height:c.h||this._lineHeight});a&&!a.split&&(a=this.getText());this.render(this.typesetter(a))},setLabel:function(a){var c,d,b=this.master.getBounds();d=/B/.test(this.labelPosition)?b.y2-this._lineHeight:b.y1;/R/.test(this.labelPosition)?
c=b.x2:(d=b.y1,this._align="end");!this.labelWidth||a&&a.split&&a!=this.getText()?(this.setData({x:c,y:d,height:this._lineHeight,width:this.style.text.minWidth}),this.labelWidth=this.style.text.minWidth,this.render(this.typesetter(a))):(this.setData({x:c,y:d,height:this.data.height,width:this.data.width}),this.render())},beforeAttr:function(a,c){if(c!==void 0){var b=a,a={};a[b]=c}delete a.x;delete a.y;delete a.width;delete a.height;this.attr(a);!this.created&&this.render()}})});