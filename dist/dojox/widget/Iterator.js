//>>built
define(["dijit","dojo","dojox","dojo/require!dijit/Declaration"],function(e,c,f){c.provide("dojox.widget.Iterator");c.require("dijit.Declaration");c.experimental("dojox.widget.Iterator");c.declare("dojox.widget.Iterator",[e.Declaration],{constructor:function(){var a=0;return function(){this.attrs=[];this.children=[];this.widgetClass="dojox.widget.Iterator._classes._"+a++}}(),start:0,fetchMax:1E3,query:{name:"*"},attrs:[],defaultValue:"",widgetCtor:null,dataValues:[],data:null,store:null,_srcIndex:0,
_srcParent:null,_setSrcIndex:function(a){this._srcIndex=0;for(this._srcParent=a.parentNode;a.previousSibling;)this._srcIndex++,a=a.previousSibling},postscript:function(a,d){this._setSrcIndex(d);this.inherited("postscript",arguments);var b=this.widgetCtor=c.getObject(this.widgetClass);this.attrs=c.map(b.prototype.templateString.match(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g),function(a){return a.slice(2,-1)});c.forEach(this.attrs,function(a){b.prototype[a]=""});this.update()},clear:function(){this.children.length&&
this._setSrcIndex(this.children[0].domNode);c.forEach(this.children,"item.destroy();");this.children=[]},update:function(){if(this.store)this.fetch();else this.onDataAvailable(this.data||this.dataValues)},_addItem:function(a,d){c.isString(a)&&(a={value:a});var b=new this.widgetCtor(a);this.children.push(b);c.place(b.domNode,this._srcParent,this._srcIndex+d)},getAttrValuesObj:function(a){var d={};c.isString(a)?c.forEach(this.attrs,function(b){d[b]=b=="value"?a:this.defaultValue},this):c.forEach(this.attrs,
function(b){d[b]=this.store?this.store.getValue(a,b)||this.defaultValue:a[b]||this.defaultValue},this);return d},onDataAvailable:function(a){this.clear();c.forEach(a,function(a,b){this._addItem(this.getAttrValuesObj(a),b)},this)},fetch:function(a,d,b){this.store.fetch({query:a||this.query,start:d||this.start,count:b||this.fetchMax,onComplete:c.hitch(this,"onDataAvailable")})}});f.widget.Iterator._classes={}});