//>>built
define("dojox/mvc/_patches",["dojo/_base/lang","dojo/_base/array","dijit/_WidgetBase","./_DataBindingMixin","dijit/form/ValidationTextBox","dijit/form/NumberTextBox"],function(e,b,a,f,c,d){e.extend(a,new f);var g=a.prototype.startup;a.prototype.startup=function(){this._dbstartup();g.apply(this)};var h=a.prototype.destroy;a.prototype.destroy=function(a){this._modelWatchHandles&&b.forEach(this._modelWatchHandles,function(a){a.unwatch()});this._viewWatchHandles&&b.forEach(this._viewWatchHandles,function(a){a.unwatch()});
h.apply(this,[a])};var i=c.prototype.isValid;c.prototype.isValid=function(a){return this.inherited("isValid",arguments)!==!1&&i.apply(this,[a])};var j=d.prototype.isValid;d.prototype.isValid=function(a){return this.inherited("isValid",arguments)!==!1&&j.apply(this,[a])}});