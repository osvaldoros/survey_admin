//>>built
define(["dijit","dojo","dojox","dojo/require!dijit/_WidgetBase"],function(e,a,f){a.provide("dojox.mobile.app.AlertDialog");a.experimental("dojox.mobile.app.AlertDialog");a.require("dijit._WidgetBase");a.declare("dojox.mobile.app.AlertDialog",e._WidgetBase,{title:"",text:"",controller:null,buttons:null,defaultButtonLabel:"OK",onChoose:null,constructor:function(){this.onClick=a.hitch(this,this.onClick);this._handleSelect=a.hitch(this,this._handleSelect)},buildRendering:function(){this.domNode=a.create("div",
{"class":"alertDialog"});var c=a.create("div",{"class":"alertDialogBody"},this.domNode);a.create("div",{"class":"alertTitle",innerHTML:this.title||""},c);a.create("div",{"class":"alertText",innerHTML:this.text||""},c);var b=a.create("div",{"class":"alertBtns"},c);if(!this.buttons||this.buttons.length==0)this.buttons=[{label:this.defaultButtonLabel,value:"ok","class":"affirmative"}];var d=this;a.forEach(this.buttons,function(c){var e=new f.mobile.Button({btnClass:c["class"]||"",label:c.label});e._dialogValue=
c.value;a.place(e.domNode,b);d.connect(e,"onClick",d._handleSelect)});c=this.controller.getWindowSize();this.mask=a.create("div",{"class":"dialogUnderlayWrapper",innerHTML:'<div class="dialogUnderlay"></div>',style:{width:c.w+"px",height:c.h+"px"}},this.controller.assistant.domNode);this.connect(this.mask,"onclick",function(){d.onChoose&&d.onChoose();d.hide()})},postCreate:function(){this.subscribe("/dojox/mobile/app/goback",this._handleSelect)},_handleSelect:function(a){var b;console.log("handleSelect");
if(a&&a.target)for(b=a.target;!e.byNode(b););if(this.onChoose)this.onChoose(b?e.byNode(b)._dialogValue:void 0);this.hide()},show:function(){this._doTransition(1)},hide:function(){this._doTransition(-1)},_doTransition:function(c){var b,d=a.marginBox(this.domNode.firstChild).h;b=this.controller.getWindowSize().h;console.log("dialog height = "+d," body height = "+b);d=b-d;b=a.fx.slideTo({node:this.domNode,duration:400,top:{start:c<0?d:b,end:c<0?b:d}});d=a[c<0?"fadeOut":"fadeIn"]({node:this.mask,duration:400});
b=a.fx.combine([b,d]);var e=this;a.connect(b,"onEnd",this,function(){if(c<0)e.domNode.style.display="none",a.destroy(e.domNode),a.destroy(e.mask)});b.play()},destroy:function(){this.inherited(arguments);a.destroy(this.mask)},onClick:function(){}})});