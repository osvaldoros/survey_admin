//>>built
define("dojox/mobile/_ListTouchMixin",["dojo/_base/declare","dojo/_base/event","dijit/form/_ListBase"],function(b,c,d){return b("dojox.mobile._ListTouchMixin",d,{postCreate:function(){this.inherited(arguments);this.connect(this.domNode,"onclick","_onClick")},_onClick:function(a){c.stop(a);if(a=this._getTarget(a))this._setSelectedAttr(a),this.onClick(a)}})});