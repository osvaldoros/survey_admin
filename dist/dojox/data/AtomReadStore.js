//>>built
define("dojox/data/AtomReadStore",["dojo","dojox","dojo/data/util/filter","dojo/data/util/simpleFetch","dojo/date/stamp"],function(f,i){f.experimental("dojox.data.AtomReadStore");f.declare("dojox.data.AtomReadStore",null,{constructor:function(a){if(a&&(this.url=a.url,this.rewriteUrl=a.rewriteUrl,this.label=a.label||this.label,this.sendQuery=a.sendQuery||a.sendquery||this.sendQuery,this.unescapeHTML=a.unescapeHTML,"urlPreventCache"in a))this.urlPreventCache=a.urlPreventCache?!0:!1;if(!this.url)throw Error("AtomReadStore: a URL must be specified when creating the data store");
},url:"",label:"title",sendQuery:!1,unescapeHTML:!1,urlPreventCache:!1,getValue:function(a,b,c){this._assertIsItem(a);this._assertIsAttribute(b);this._initItem(a);b=b.toLowerCase();if(!a._attribs[b]&&!a._parsed)this._parseItem(a),a._parsed=!0;var d=a._attribs[b];!d&&b=="summary"&&(d=this.getValue(a,"content").text.replace(/\/(<([^>]+)>)\/g/i,""),d={text:d.substring(0,Math.min(400,d.length)),type:"text"},a._attribs[b]=d);if(d&&this.unescapeHTML&&(b=="content"||b=="summary"||b=="subtitle")&&!a["_"+
b+"Escaped"])d.text=this._unescapeHTML(d.text),a["_"+b+"Escaped"]=!0;return d?f.isArray(d)?d[0]:d:c},getValues:function(a,b){this._assertIsItem(a);this._assertIsAttribute(b);this._initItem(a);b=b.toLowerCase();a._attribs[b]||this._parseItem(a);var c=a._attribs[b];return c?c.length!==void 0&&typeof c!=="string"?c:[c]:void 0},getAttributes:function(a){this._assertIsItem(a);a._attribs||(this._initItem(a),this._parseItem(a));var b=[],c;for(c in a._attribs)b.push(c);return b},hasAttribute:function(a,b){return this.getValue(a,
b)!==void 0},containsValue:function(a,b,c){a=this.getValues(a,b);for(b=0;b<a.length;b++)if(typeof c==="string"){if(a[b].toString&&a[b].toString()===c)return!0}else if(a[b]===c)return!0;return!1},isItem:function(a){if(a&&a.element&&a.store&&a.store===this)return!0;return!1},isItemLoaded:function(a){return this.isItem(a)},loadItem:function(){},getFeatures:function(){return{"dojo.data.api.Read":!0}},getLabel:function(a){if(this.label!==""&&this.isItem(a))if((a=this.getValue(a,this.label))&&a.text)return a.text;
else if(a)return a.toString()},getLabelAttributes:function(){if(this.label!=="")return[this.label];return null},getFeedValue:function(a,b){var c=this.getFeedValues(a,b);if(f.isArray(c))return c[0];return c},getFeedValues:function(a,b){if(!this.doc)return b;if(!this._feedMetaData)this._feedMetaData={element:this.doc.getElementsByTagName("feed")[0],store:this,_attribs:{}},this._parseItem(this._feedMetaData);return this._feedMetaData._attribs[a]||b},_initItem:function(a){if(!a._attribs)a._attribs={}},
_fetchItems:function(a,b,c){var d=this._getFetchUrl(a);if(d){var e=!this.sendQuery?a:null,g=this,h=function(d){g.doc=d;var d=g._getItems(d,e),c=a.query;c&&(c.id?d=f.filter(d,function(a){return g.getValue(a,"id")==c.id}):c.category&&(d=f.filter(d,function(a){a=g.getValues(a,"category");if(!a)return!1;return f.some(a,"return item.term=='"+c.category+"'")})));d&&d.length>0?b(d,a):b([],a)};this.doc?h(this.doc):(d=f.xhrGet({url:d,handleAs:"xml",preventCache:this.urlPreventCache}),d.addCallback(h),d.addErrback(function(d){c(d,
a)}))}else c(Error("No URL specified."))},_getFetchUrl:function(a){if(!this.sendQuery)return this.url;var b=a.query;if(!b)return this.url;if(f.isString(b))return this.url+b;var a="",c;for(c in b){var d=b[c];d&&(a&&(a+="&"),a+=c+"="+d)}if(!a)return this.url;c=this.url;c+=c.indexOf("?")<0?"?":"&";return c+a},_getItems:function(a,b){if(this._items)return this._items;var c=[],d=[];if(a.childNodes.length<1)return this._items=c,console.log("dojox.data.AtomReadStore: Received an invalid Atom document. Check the content type header"),
c;d=f.filter(a.childNodes,"return item.tagName && item.tagName.toLowerCase() == 'feed'");if(!d||d.length!=1)return console.log("dojox.data.AtomReadStore: Received an invalid Atom document, number of feed tags = "+(d?d.length:0)),c;d=f.filter(d[0].childNodes,"return item.tagName && item.tagName.toLowerCase() == 'entry'");if(b.onBegin)b.onBegin(d.length,this.sendQuery?b:{});for(var e=0;e<d.length;e++){var g=d[e];g.nodeType==1&&c.push(this._getItem(g))}return this._items=c},close:function(){},_getItem:function(a){return{element:a,
store:this}},_parseItem:function(a){function b(a){var b=a.textContent||a.innerHTML||a.innerXML;if(!b&&a.childNodes[0]){var c=a.childNodes[0];if(c&&(c.nodeType==3||c.nodeType==4))b=a.childNodes[0].nodeValue}return b}var c=a._attribs;f.forEach(a.element.childNodes,function(a){var e=a.tagName?a.tagName.toLowerCase():"";switch(e){case "title":c[e]={text:b(a),type:a.getAttribute("type")};break;case "subtitle":case "summary":case "content":c[e]={text:b(a),type:a.getAttribute("type")};break;case "author":var g,
h;f.forEach(a.childNodes,function(a){if(a.tagName)switch(a.tagName.toLowerCase()){case "name":g=a;break;case "uri":h=a}});a={};if(g&&g.length==1)a.name=b(g[0]);if(h&&h.length==1)a.uri=b(h[0]);c[e]=a;break;case "id":c[e]=b(a);break;case "updated":c[e]=f.date.stamp.fromISOString(b(a));break;case "published":c[e]=f.date.stamp.fromISOString(b(a));break;case "category":c[e]||(c[e]=[]);c[e].push({scheme:a.getAttribute("scheme"),term:a.getAttribute("term")});break;case "link":c[e]||(c[e]=[]),a={rel:a.getAttribute("rel"),
href:a.getAttribute("href"),type:a.getAttribute("type")},c[e].push(a),a.rel=="alternate"&&(c.alternate=a)}})},_unescapeHTML:function(a){return a=a.replace(/&#8217;/m,"'").replace(/&#8243;/m,'"').replace(/&#60;/m,">").replace(/&#62;/m,"<").replace(/&#38;/m,"&")},_assertIsItem:function(a){if(!this.isItem(a))throw Error("dojox.data.AtomReadStore: Invalid item argument.");},_assertIsAttribute:function(a){if(typeof a!=="string")throw Error("dojox.data.AtomReadStore: Invalid attribute argument.");}});f.extend(i.data.AtomReadStore,
f.data.util.simpleFetch);return i.data.AtomReadStore});