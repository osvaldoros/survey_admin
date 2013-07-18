//>>built
define("dojox/mobile/ToolBarButton",["dojo/_base/declare","dojo/_base/window","dojo/dom-class","dojo/dom-construct","dojo/dom-style","./common","./_ItemBase"],function(e,f,b,g,i,c,h){return e("dojox.mobile.ToolBarButton",h,{selected:!1,btnClass:"",_defaultColor:"mblColorDefault",_selColor:"mblColorDefaultSel",buildRendering:function(){this.domNode=this.containerNode=this.srcNodeRef||f.doc.createElement("div");this.inheritParams();b.add(this.domNode,"mblToolBarButton mblArrowButtonText");var a;if(this.selected)a=
this._selColor;else if(this.domNode.className.indexOf("mblColor")==-1)a=this._defaultColor;b.add(this.domNode,a);if(!this.label)this.label=this.domNode.innerHTML;this.icon&&this.icon!="none"?(this.iconNode=g.create("div",{className:"mblToolBarButtonIcon"},this.domNode),c.createIcon(this.icon,this.iconPos,null,this.alt,this.iconNode),this.iconPos&&b.add(this.iconNode.firstChild,"mblToolBarButtonSpriteIcon")):c.createDomButton(this.domNode)?b.add(this.domNode,"mblToolBarButtonDomButton"):b.add(this.domNode,
"mblToolBarButtonText");this.connect(this.domNode,"onclick","onClick")},select:function(a){b.toggle(this.domNode,this._selColor,!a);this.selected=!a},deselect:function(){this.select(!0)},onClick:function(a){this.setTransitionPos(a);this.defaultClickAction()},_setBtnClassAttr:function(a){var d=this.domNode;d.className.match(/(mblDomButton\w+)/)&&b.remove(d,RegExp.$1);b.add(d,a);c.createDomButton(this.domNode)&&b.add(this.domNode,"mblToolBarButtonDomButton")},_setLabelAttr:function(a){this.label=a;
this.domNode.innerHTML=this._cv?this._cv(a):a}})});