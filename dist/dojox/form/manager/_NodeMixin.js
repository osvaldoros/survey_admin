//>>built
define("dojox/form/manager/_NodeMixin",["dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/dom","dojo/dom-attr","dojo/query","./_Mixin","dijit/form/_FormWidget","dijit/_base/manager","dojo/_base/declare"],function(g,f,k,l,i,h,j,r,s,t){var j=g.getObject("dojox.form.manager",!0),n=j.actionAdapter,u=j._keys,v=j.changeEvent=function(a){var c="onclick";switch(a.tagName.toLowerCase()){case "textarea":c="onkeyup";break;case "select":c="onchange";break;case "input":switch(a.type.toLowerCase()){case "text":case "password":c=
"onkeyup"}}return c},o=function(a,c){var d=i.get(a,"name"),c=c||this.domNode;if(d&&!(d in this.formWidgets)){for(var b=a;b&&b!==c;b=b.parentNode)if(i.get(b,"widgetId")&&s.byNode(b).isInstanceOf(r))return null;a.tagName.toLowerCase()=="input"&&a.type.toLowerCase()=="radio"?(b=(b=this.formNodes[d])&&b.node)&&g.isArray(b)?b.push(a):this.formNodes[d]={node:[a],connections:[]}:this.formNodes[d]={node:a,connections:[]}}else d=null;return d},p=function(a){var c={};n(function(a,b){var e=i.get(b,"observer");
e&&typeof e=="string"&&f.forEach(e.split(","),function(a){(a=g.trim(a))&&g.isFunction(this[a])&&(c[a]=1)},this)}).call(this,null,this.formNodes[a].node);return u(c)},q=function(a,c){var d=this.formNodes[a],b=d.connections;if(b.length)f.forEach(b,k.disconnect),b=d.connections=[];n(function(d,m){var g=v(m);f.forEach(c,function(c){b.push(k.connect(m,g,this,function(b){if(this.watching)this[c](this.formNodeValue(a),a,m,b)}))},this)}).call(this,null,d.node)};return t("dojox.form.manager._NodeMixin",null,
{destroy:function(){for(var a in this.formNodes)f.forEach(this.formNodes[a].connections,k.disconnect);this.formNodes={};this.inherited(arguments)},registerNode:function(a){typeof a=="string"&&(a=l.byId(a));(a=o.call(this,a))&&q.call(this,a,p.call(this,a));return this},unregisterNode:function(a){a in this.formNodes&&(f.forEach(this.formNodes[a].connections,this.disconnect,this),delete this.formNodes[a]);return this},registerNodeDescendants:function(a){typeof a=="string"&&(a=l.byId(a));h("input, select, textarea, button",
a).map(function(c){return o.call(this,c,a)},this).forEach(function(a){a&&q.call(this,a,p.call(this,a))},this);return this},unregisterNodeDescendants:function(a){typeof a=="string"&&(a=l.byId(a));h("input, select, textarea, button",a).map(function(){return i.get(a,"name")||null}).forEach(function(a){a&&this.unregisterNode(a)},this);return this},formNodeValue:function(a,c){var d=arguments.length==2&&c!==void 0,b;if(typeof a=="string"&&(a=this.formNodes[a]))a=a.node;if(!a)return null;if(g.isArray(a)){if(d)return f.forEach(a,
function(a){a.checked=""}),f.forEach(a,function(a){a.checked=a.value===c?"checked":""}),this;f.some(a,function(a){if(a.checked)return b=a,!0;return!1});return b?b.value:""}switch(a.tagName.toLowerCase()){case "select":if(a.multiple){if(d){if(g.isArray(c)){var e={};f.forEach(c,function(a){e[a]=1});h("> option",a).forEach(function(a){a.selected=a.value in e});return this}h("> option",a).forEach(function(a){a.selected=a.value===c});return this}b=h("> option",a).filter(function(a){return a.selected}).map(function(a){return a.value});
return b.length==1?b[0]:b}if(d)return h("> option",a).forEach(function(a){a.selected=a.value===c}),this;return a.value||"";case "button":if(d)return a.innerHTML=""+c,this;return a.innerHTML;case "input":if(a.type.toLowerCase()=="checkbox"){if(d)return a.checked=c?"checked":"",this;return Boolean(a.checked)}}if(d)return a.value=""+c,this;return a.value},inspectFormNodes:function(a,c,d){var b,e={};if(c)if(g.isArray(c))f.forEach(c,function(b){b in this.formNodes&&(e[b]=a.call(this,b,this.formNodes[b].node,
d))},this);else for(b in c)b in this.formNodes&&(e[b]=a.call(this,b,this.formNodes[b].node,c[b]));else for(b in this.formNodes)e[b]=a.call(this,b,this.formNodes[b].node,d);return e}})});