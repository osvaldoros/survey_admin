//>>built
define("dijit/DialogUnderlay",["dojo/_base/declare","dojo/dom-attr","dojo/_base/window","dojo/window","./_Widget","./_TemplatedMixin","./BackgroundIframe"],function(d,e,f,g,h,i,j){return d("dijit.DialogUnderlay",[h,i],{templateString:"<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' data-dojo-attach-point='node'></div></div>",dialogId:"","class":"",_setDialogIdAttr:function(a){e.set(this.node,"id",a+"_underlay");this._set("dialogId",a)},_setClassAttr:function(a){this.node.className=
"dijitDialogUnderlay "+a;this._set("class",a)},postCreate:function(){f.body().appendChild(this.domNode)},layout:function(){var a=this.node.style,b=this.domNode.style;b.display="none";var c=g.getBox();b.top=c.t+"px";b.left=c.l+"px";a.width=c.w+"px";a.height=c.h+"px";b.display="block"},show:function(){this.domNode.style.display="block";this.layout();this.bgIframe=new j(this.domNode)},hide:function(){this.bgIframe.destroy();delete this.bgIframe;this.domNode.style.display="none"}})});