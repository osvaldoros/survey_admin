//>>built
define("dijit/_WidgetBase",["require","dojo/_base/array","dojo/aspect","dojo/_base/config","dojo/_base/connect","dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/kernel","dojo/_base/lang","dojo/on","dojo/ready","dojo/Stateful","dojo/topic","dojo/_base/window","./registry"],function(l,g,q,r,s,t,u,k,m,i,v,n,w,h,B,x,y,z,A,e){function o(a){return function(b){k[b?"set":"remove"](this.domNode,a,b);this._set(a,b)}}w.isAsync||
x(0,function(){l(["dijit/_base/manager"])});var p={};return t("dijit._WidgetBase",y,{id:"",_setIdAttr:"domNode",lang:"",_setLangAttr:o("lang"),dir:"",_setDirAttr:o("dir"),textDir:"","class":"",_setClassAttr:{node:"domNode",type:"class"},style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{},_blankGif:r.blankGif||l.toUrl("dojo/resources/blank.gif"),postscript:function(a,b){this.create(a,b)},create:function(a,b){this.srcNodeRef=u.byId(b);this._connects=
[];this._supportingWidgets=[];if(this.srcNodeRef&&typeof this.srcNodeRef.id=="string")this.id=this.srcNodeRef.id;if(a)this.params=a,h.mixin(this,a);this.postMixInProperties();if(!this.id)this.id=e.getUniqueId(this.declaredClass.replace(/\./g,"_"));e.add(this);this.buildRendering();if(this.domNode){this._applyAttributes();var c=this.srcNodeRef;c&&c.parentNode&&this.domNode!==c&&c.parentNode.replaceChild(this.domNode,c)}this.domNode&&this.domNode.setAttribute("widgetId",this.id);this.postCreate();this.srcNodeRef&&
!this.srcNodeRef.parentNode&&delete this.srcNodeRef;this._created=!0},_applyAttributes:function(){var a=this.constructor,b=a._setterAttrs;if(!b){var b=a._setterAttrs=[],c;for(c in this.attributeMap)b.push(c);var a=a.prototype,d;for(d in a)d in this.attributeMap||"_set"+d.replace(/^[a-z]|-[a-zA-Z]/g,function(a){return a.charAt(a.length-1).toUpperCase()})+"Attr"in a&&b.push(d)}g.forEach(b,function(a){this.params&&a in this.params||this[a]&&this.set(a,this[a])},this);for(var f in this.params)this.set(f,
this[f])},postMixInProperties:function(){},buildRendering:function(){if(!this.domNode)this.domNode=this.srcNodeRef||i.create("div");if(this.baseClass){var a=this.baseClass.split(" ");this.isLeftToRight()||(a=a.concat(g.map(a,function(a){return a+"Rtl"})));m.add(this.domNode,a)}},postCreate:function(){},startup:function(){if(!this._started)this._started=!0,g.forEach(this.getChildren(),function(a){if(!a._started&&!a._destroyed&&h.isFunction(a.startup))a.startup(),a._started=!0})},destroyRecursive:function(a){this._beingDestroyed=
!0;this.destroyDescendants(a);this.destroy(a)},destroy:function(a){this._beingDestroyed=!0;this.uninitialize();for(var b;b=this._connects.pop();)b.remove();for(;b=this._supportingWidgets.pop();)b.destroyRecursive?b.destroyRecursive():b.destroy&&b.destroy();this.destroyRendering(a);e.remove(this.id);this._destroyed=!0},destroyRendering:function(a){this.bgIframe&&(this.bgIframe.destroy(a),delete this.bgIframe);this.domNode&&(a?k.remove(this.domNode,"widgetId"):i.destroy(this.domNode),delete this.domNode);
this.srcNodeRef&&(a||i.destroy(this.srcNodeRef),delete this.srcNodeRef)},destroyDescendants:function(a){g.forEach(this.getChildren(),function(b){b.destroyRecursive&&b.destroyRecursive(a)})},uninitialize:function(){return!1},_setStyleAttr:function(a){var b=this.domNode;h.isObject(a)?n.set(b,a):b.style.cssText?b.style.cssText+="; "+a:b.style.cssText=a;this._set("style",a)},_attrToDom:function(a,b,c){c=arguments.length>=3?c:this.attributeMap[a];g.forEach(h.isArray(c)?c:[c],function(c){var f=this[c.node||
c||"domNode"];switch(c.type||"attribute"){case "attribute":h.isFunction(b)&&(b=h.hitch(this,b));c=c.attribute?c.attribute:/^on[A-Z][a-zA-Z]*$/.test(a)?a.toLowerCase():a;k.set(f,c,b);break;case "innerText":f.innerHTML="";f.appendChild(A.doc.createTextNode(b));break;case "innerHTML":f.innerHTML=b;break;case "class":m.replace(f,b,this[a])}},this)},get:function(a){var b=this._getAttrNames(a);return this[b.g]?this[b.g]():this[a]},set:function(a,b){if(typeof a==="object"){for(var c in a)this.set(c,a[c]);
return this}c=this._getAttrNames(a);var d=this[c.s];if(h.isFunction(d))var f=d.apply(this,Array.prototype.slice.call(arguments,1));else{var d=this.focusNode&&!h.isFunction(this.focusNode)?"focusNode":"domNode",g=this[d].tagName,e;if(!(e=p[g])){e=this[d];var i={},j;for(j in e)i[j.toLowerCase()]=!0;e=p[g]=i}j=a in this.attributeMap?this.attributeMap[a]:c.s in this?this[c.s]:c.l in e&&typeof b!="function"||/^aria-|^data-|^role$/.test(a)?d:null;j!=null&&this._attrToDom(a,b,j);this._set(a,b)}return f||
this},_attrPairNames:{},_getAttrNames:function(a){var b=this._attrPairNames;if(b[a])return b[a];var c=a.replace(/^[a-z]|-[a-zA-Z]/g,function(a){return a.charAt(a.length-1).toUpperCase()});return b[a]={n:a+"Node",s:"_set"+c+"Attr",g:"_get"+c+"Attr",l:c.toLowerCase()}},_set:function(a,b){var c=this[a];this[a]=b;this._watchCallbacks&&this._created&&b!==c&&this._watchCallbacks(a,c,b)},on:function(a,b){return q.after(this,this._onMap(a),b,!0)},_onMap:function(a){var b=this.constructor,c=b._onMap;if(!c){var c=
b._onMap={},d;for(d in b.prototype)/^on/.test(d)&&(c[d.replace(/^on/,"").toLowerCase()]=d)}return c[a.toLowerCase()]},toString:function(){return"[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]"},getChildren:function(){return this.containerNode?e.findWidgets(this.containerNode):[]},getParent:function(){return e.getEnclosingWidget(this.domNode.parentNode)},connect:function(a,b,c){a=s.connect(a,b,this,c);this._connects.push(a);return a},disconnect:function(a){var b=g.indexOf(this._connects,a);
b!=-1&&(a.remove(),this._connects.splice(b,1))},subscribe:function(a,b){var c=z.subscribe(a,h.hitch(this,b));this._connects.push(c);return c},unsubscribe:function(a){this.disconnect(a)},isLeftToRight:function(){return this.dir?this.dir=="ltr":v.isBodyLtr()},isFocusable:function(){return this.focus&&n.get(this.domNode,"display")!="none"},placeAt:function(a,b){a.declaredClass&&a.addChild?a.addChild(this,b):i.place(this.domNode,a,b);return this},getTextDir:function(a,b){return b},applyTextDir:function(){}})});