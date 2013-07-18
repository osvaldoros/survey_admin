//>>built
define("dojo/dnd/Container",["../main","../Evented","./common","../parser"],function(c,i){c.declare("dojo.dnd.Container",i,{skipForm:!1,constructor:function(a,b){this.node=c.byId(a);b||(b={});this.creator=b.creator||null;this.skipForm=b.skipForm;this.parent=b.dropParent&&c.byId(b.dropParent);this.map={};this.current=null;this.containerState="";c.addClass(this.node,"dojoDndContainer");(!b||!b._skipStartup)&&this.startup();this.events=[c.connect(this.node,"onmouseover",this,"onMouseOver"),c.connect(this.node,
"onmouseout",this,"onMouseOut"),c.connect(this.node,"ondragstart",this,"onSelectStart"),c.connect(this.node,"onselectstart",this,"onSelectStart")]},creator:function(){},getItem:function(a){return this.map[a]},setItem:function(a,b){this.map[a]=b},delItem:function(a){delete this.map[a]},forInItems:function(a,b){var b=b||c.global,d=this.map,f=c.dnd._empty,e;for(e in d)e in f||a.call(b,d[e],e,this);return b},clearItems:function(){this.map={}},getAllNodes:function(){return c.query("> .dojoDndItem",this.parent)},
sync:function(){var a={};this.getAllNodes().forEach(function(b){if(b.id){var d=this.getItem(b.id);if(d){a[b.id]=d;return}}else b.id=c.dnd.getUniqueId();var d=b.getAttribute("dndType"),f=b.getAttribute("dndData");a[b.id]={data:f||b.innerHTML,type:d?d.split(/\s*,\s*/):["text"]}},this);this.map=a;return this},insertNodes:function(a,b,d){if(this.parent.firstChild)if(b){if(!d)d=this.parent.firstChild}else{if(d)d=d.nextSibling}else d=null;if(d)for(b=0;b<a.length;++b){var c=this._normalizedCreator(a[b]);
this.setItem(c.node.id,{data:c.data,type:c.type});this.parent.insertBefore(c.node,d)}else for(b=0;b<a.length;++b)c=this._normalizedCreator(a[b]),this.setItem(c.node.id,{data:c.data,type:c.type}),this.parent.appendChild(c.node);return this},destroy:function(){c.forEach(this.events,c.disconnect);this.clearItems();this.node=this.parent=this.current=null},markupFactory:function(a,b,c){a._skipStartup=!0;return new c(b,a)},startup:function(){if(!this.parent&&(this.parent=this.node,this.parent.tagName.toLowerCase()==
"table")){var a=this.parent.getElementsByTagName("tbody");if(a&&a.length)this.parent=a[0]}this.defaultCreator=c.dnd._defaultCreator(this.parent);this.sync()},onMouseOver:function(a){for(var b=a.relatedTarget;b;){if(b==this.node)break;try{b=b.parentNode}catch(c){b=null}}b||(this._changeState("Container","Over"),this.onOverEvent());b=this._getChildByEvent(a);if(this.current!=b)this.current&&this._removeItemClass(this.current,"Over"),b&&this._addItemClass(b,"Over"),this.current=b},onMouseOut:function(a){for(a=
a.relatedTarget;a;){if(a==this.node)return;try{a=a.parentNode}catch(b){a=null}}if(this.current)this._removeItemClass(this.current,"Over"),this.current=null;this._changeState("Container","");this.onOutEvent()},onSelectStart:function(a){(!this.skipForm||!c.dnd.isFormElement(a))&&c.stopEvent(a)},onOverEvent:function(){},onOutEvent:function(){},_changeState:function(a,b){var d="dojoDnd"+a,f=a.toLowerCase()+"State";c.replaceClass(this.node,d+b,d+this[f]);this[f]=b},_addItemClass:function(a,b){c.addClass(a,
"dojoDndItem"+b)},_removeItemClass:function(a,b){c.removeClass(a,"dojoDndItem"+b)},_getChildByEvent:function(a){if(a=a.target)for(var b=a.parentNode;b;a=b,b=a.parentNode)if(b==this.parent&&c.hasClass(a,"dojoDndItem"))return a;return null},_normalizedCreator:function(a,b){var d=(this.creator||this.defaultCreator).call(this,a,b);if(!c.isArray(d.type))d.type=["text"];if(!d.node.id)d.node.id=c.dnd.getUniqueId();c.addClass(d.node,"dojoDndItem");return d}});c.dnd._createNode=function(a){if(!a)return c.dnd._createSpan;
return function(b){return c.create(a,{innerHTML:b})}};c.dnd._createTrTd=function(a){var b=c.create("tr");c.create("td",{innerHTML:a},b);return b};c.dnd._createSpan=function(a){return c.create("span",{innerHTML:a})};c.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};c.dnd._defaultCreator=function(a){var a=a.tagName.toLowerCase(),b=a=="tbody"||a=="thead"?c.dnd._createTrTd:c.dnd._createNode(c.dnd._defaultCreatorNodes[a]);return function(a,f){var e=a&&c.isObject(a),h,g;e&&a.tagName&&a.nodeType&&
a.getAttribute?(h=a.getAttribute("dndData")||a.innerHTML,e=(e=a.getAttribute("dndType"))?e.split(/\s*,\s*/):["text"],g=a):(h=e&&a.data?a.data:a,e=e&&a.type?a.type:["text"],g=(f=="avatar"?c.dnd._createSpan:b)(String(h)));if(!g.id)g.id=c.dnd.getUniqueId();return{node:g,data:h,type:e}}};return c.dnd.Container});