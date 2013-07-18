//>>built
define("dojox/mobile/_ScrollableMixin",["dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/window","dojo/dom","dojo/dom-class","dijit/registry","./scrollable"],function(i,d,j,e,f,g,h,k){d=d("dojox.mobile._ScrollableMixin",null,{fixedHeader:"",fixedFooter:"",scrollableParams:null,allowNestedScrolls:!0,constructor:function(){this.scrollableParams={}},destroy:function(){this.cleanup();this.inherited(arguments)},startup:function(){if(!this._started){var a,b=this.scrollableParams;if(this.fixedHeader){a=
f.byId(this.fixedHeader);if(a.parentNode==this.domNode)this.isLocalHeader=!0;b.fixedHeaderHeight=a.offsetHeight}if(this.fixedFooter){a=f.byId(this.fixedFooter);if(a.parentNode==this.domNode)this.isLocalFooter=!0,a.style.bottom="0px";b.fixedFooterHeight=a.offsetHeight}this.init(b);if(this.allowNestedScrolls)for(a=this.getParent();a;a=a.getParent())if(a&&a.scrollableParams){this.dirLock=this.isNested=!0;a.dirLock=!0;break}this.inherited(arguments)}},findAppBars:function(){var a,b,c;a=0;for(b=e.body().childNodes.length;a<
b;a++)c=e.body().childNodes[a],this.checkFixedBar(c,!1);if(this.domNode.parentNode){a=0;for(b=this.domNode.parentNode.childNodes.length;a<b;a++)c=this.domNode.parentNode.childNodes[a],this.checkFixedBar(c,!1)}this.fixedFooterHeight=this.fixedFooter?this.fixedFooter.offsetHeight:0},checkFixedBar:function(a,b){if(a.nodeType===1){var c=a.getAttribute("fixed")||h.byNode(a)&&h.byNode(a).fixed;if(c==="top"){g.add(a,"mblFixedHeaderBar");if(b)a.style.top="0px",this.fixedHeader=a;return c}else if(c==="bottom")return g.add(a,
"mblFixedBottomBar"),this.fixedFooter=a,c}return null}});j.extend(d,new k(i,dojox));return d});