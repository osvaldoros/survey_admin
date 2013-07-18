//>>built
define("dojox/widget/FisheyeLite",["dojo","dojox","dijit/_Widget","dojo/fx/easing"],function(a,d,i,b){a.getObject("widget",!0,d);a.experimental("dojox.widget.FisheyeLite");return a.declare("dojox.widget.FisheyeLite",dijit._Widget,{durationIn:350,easeIn:b.backOut,durationOut:1420,easeOut:b.elasticOut,properties:null,units:"px",constructor:function(a){this.properties=a.properties||{fontSize:2.75}},postCreate:function(){this.inherited(arguments);this._target=a.query(".fisheyeTarget",this.domNode)[0]||
this.domNode;this._makeAnims();this.connect(this.domNode,"onmouseover","show");this.connect(this.domNode,"onmouseout","hide");this.connect(this._target,"onclick","onClick")},show:function(){this._runningOut.stop();this._runningIn.play()},hide:function(){this._runningIn.stop();this._runningOut.play()},_makeAnims:function(){var b={},f={},d=a.getComputedStyle(this._target),c;for(c in this.properties){var e=this.properties[c],h=a.isObject(e),g=parseInt(d[c]);f[c]={end:g,units:this.units};b[c]=h?e:{end:e*
g,units:this.units}}this._runningIn=a.animateProperty({node:this._target,easing:this.easeIn,duration:this.durationIn,properties:b});this._runningOut=a.animateProperty({node:this._target,duration:this.durationOut,easing:this.easeOut,properties:f});this.connect(this._runningIn,"onEnd",a.hitch(this,"onSelected",this))},onClick:function(){},onSelected:function(){}})});