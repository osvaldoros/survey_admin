//>>built
define("dojox/mdnd/LazyManager",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/declare","dojo/_base/html","dojo/dnd/Manager","./PureSource"],function(c){return c.declare("dojox.mdnd.LazyManager",null,{constructor:function(){this._registry={};this._fakeSource=new dojox.mdnd.PureSource(c.create("div"),{copyOnly:!1});this._fakeSource.startup();c.addOnUnload(c.hitch(this,"destroy"));this.manager=c.dnd.manager()},getItem:function(b){var a=b.getAttribute("dndType");return{data:b.getAttribute("dndData")||
b.innerHTML,type:a?a.split(/\s*,\s*/):["text"]}},startDrag:function(b,a){if(a=a||b.target){var d=this.manager,e=this.getItem(a);a.id==""&&c.attr(a,"id",c.dnd.getUniqueId());c.addClass(a,"dojoDndItem");this._fakeSource.setItem(a.id,e);d.startDrag(this._fakeSource,[a],!1);d.onMouseMove(b)}},cancelDrag:function(){var b=this.manager;b.target=null;b.onMouseUp()},destroy:function(){this._fakeSource.destroy()}})});