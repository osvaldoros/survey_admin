//>>built
define("dijit/layout/LayoutContainer",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/declare","../_WidgetBase","./_LayoutWidget","./utils"],function(b,c,d,e,f,a){c.extend(e,{layoutAlign:"none"});return d("dijit.layout.LayoutContainer",f,{baseClass:"dijitLayoutContainer",constructor:function(){b.deprecated("dijit.layout.LayoutContainer is deprecated","use BorderContainer instead",2)},layout:function(){a.layoutChildren(this.domNode,this._contentBox,this.getChildren())},addChild:function(){this.inherited(arguments);
this._started&&a.layoutChildren(this.domNode,this._contentBox,this.getChildren())},removeChild:function(){this.inherited(arguments);this._started&&a.layoutChildren(this.domNode,this._contentBox,this.getChildren())}})});