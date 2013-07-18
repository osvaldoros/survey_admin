//>>built
define(["dijit","dojo","dojox","dojo/require!dojox/xml/parser,dojox/wire/Wire"],function(j,f,g){f.provide("dojox.wire.ml.util");f.require("dojox.xml.parser");f.require("dojox.wire.Wire");g.wire.ml._getValue=function(a,b){if(a){var c=void 0;if(b&&a.length>=9&&a.substring(0,9)=="arguments")return c=a.substring(9),(new g.wire.Wire({property:c})).getValue(b);var d=a.indexOf(".");d>=0&&(c=a.substring(d+1),a=a.substring(0,d));if(d=j.byId(a)||f.byId(a)||f.getObject(a))return c?(new g.wire.Wire({object:d,
property:c})).getValue():d}};g.wire.ml._setValue=function(a,b){if(a){var c=a.indexOf(".");if(!(c<0)){var d=this._getValue(a.substring(0,c));d&&(c=a.substring(c+1),(new g.wire.Wire({object:d,property:c})).setValue(b))}}};f.declare("dojox.wire.ml.XmlElement",null,{constructor:function(a){f.isString(a)&&(a=this._getDocument().createElement(a));this.element=a},getPropertyValue:function(a){var b=void 0;if(!this.element)return b;if(!a)return b;if(a.charAt(0)=="@")b=this.element.getAttribute(a.substring(1));
else if(a=="text()"){if(a=this.element.firstChild)b=a.nodeValue}else{for(var c=[],d=0;d<this.element.childNodes.length;d++){var e=this.element.childNodes[d];e.nodeType===1&&e.nodeName==a&&c.push(new g.wire.ml.XmlElement(e))}c.length>0&&(b=c.length===1?c[0]:c)}return b},setPropertyValue:function(a,b){var c;if(this.element&&a)if(a.charAt(0)=="@"){var d=a.substring(1);b?this.element.setAttribute(d,b):this.element.removeAttribute(d)}else if(a=="text()"){for(;this.element.firstChild;)this.element.removeChild(this.element.firstChild);
b&&(c=this._getDocument().createTextNode(b),this.element.appendChild(c))}else{var d=null,e;for(c=this.element.childNodes.length-1;c>=0;c--)if(e=this.element.childNodes[c],e.nodeType===1&&e.nodeName==a){if(!d)d=e.nextSibling;this.element.removeChild(e)}if(b)if(f.isArray(b))for(c in b)e=b[c],e.element&&this.element.insertBefore(e.element,d);else b instanceof g.wire.ml.XmlElement?b.element&&this.element.insertBefore(b.element,d):(e=this._getDocument().createElement(a),c=this._getDocument().createTextNode(b),
e.appendChild(c),this.element.insertBefore(e,d))}},toString:function(){var a="";if(this.element){var b=this.element.firstChild;if(b)a=b.nodeValue}return a},toObject:function(){if(!this.element)return null;var a="",b={},c=0,d;for(d=0;d<this.element.childNodes.length;d++){var e=this.element.childNodes[d];if(e.nodeType===1){c++;var h=(new g.wire.ml.XmlElement(e)).toObject(),e=e.nodeName,i=b[e];i?f.isArray(i)?i.push(h):b[e]=[i,h]:b[e]=h}else if(e.nodeType===3||e.nodeType===4)a+=e.nodeValue}h=0;if(this.element.nodeType===
1){h=this.element.attributes.length;for(d=0;d<h;d++)e=this.element.attributes[d],b["@"+e.nodeName]=e.nodeValue}if(c===0){if(h===0)return a;b["text()"]=a}return b},_getDocument:function(){return this.element?this.element.nodeType==9?this.element:this.element.ownerDocument:g.xml.parser.parse()}})});