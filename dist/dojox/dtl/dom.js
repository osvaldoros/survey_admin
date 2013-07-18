//>>built
define("dojox/dtl/dom",["dojo/_base/lang","./_base","dojox/string/tokenize","./Context","dojo/dom","dojo/dom-construct","dojo/_base/html","dojo/_base/array","dojo/_base/connect","dojo/_base/sniff"],function(k,c,w,A,v,x,u,y,z,r){c.BOOLS={checked:1,disabled:1,readonly:1};c.TOKEN_CHANGE=-11;c.TOKEN_ATTR=-12;c.TOKEN_CUSTOM=-13;c.TOKEN_NODE=1;var q=c.text,p=c.dom={_attributes:{},_uppers:{},_re4:/^function anonymous\(\)\s*{\s*(.*)\s*}$/,_reTrim:/(?:^[\n\s]*(\{%)?\s*|\s*(%\})?[\n\s]*$)/g,_reSplit:/\s*%\}[\n\s]*\{%\s*/g,
getTemplate:function(a){if(typeof this._commentable=="undefined"){this._commentable=!1;var b=document.createElement("div");b.innerHTML="<\!--Test comment handling, and long comments, using comments whenever possible.--\>";if(b.childNodes.length&&b.firstChild.nodeType==8&&b.firstChild.data=="Test comment handling, and long comments, using comments whenever possible.")this._commentable=!0}this._commentable||(a=a.replace(/<\!--({({|%).*?(%|})})--\>/g,"$1"));r("ie")&&(a=a.replace(/\b(checked|disabled|readonly|style)="/g,
't$1="'));for(var a=a.replace(/\bstyle="/g,'tstyle="'),b=r("webkit"),g=[[!0,"select","option"],[b,"tr","td|th"],[b,"thead","tr","th"],[b,"tbody","tr","td"],[b,"table","tbody|thead|tr","tr","td"]],d=[],e=0,c;c=g[e];e++)if(c[0]&&a.indexOf("<"+c[1])!=-1){var f=RegExp("<"+c[1]+"(?:.|\n)*?>((?:.|\n)+?)</"+c[1]+">","ig");for(;b=f.exec(a);){for(var i=c[2].split("|"),n=[],j=0,l;l=i[j];j++)n.push("<"+l+"(?:.|\n)*?>(?:.|\n)*?</"+l+">");var s=[],i=w(b[1],RegExp("("+n.join("|")+")","ig"),function(a){var b=/<(\w+)/.exec(a)[1];
s[b]||(s[b]=!0,s.push(b));return{data:a}});if(s.length){n=s.length==1?s[0]:c[2].split("|")[0];l=[];for(var j=0,q=i.length;j<q;j++){var o=i[j];if(k.isObject(o))l.push(o.data);else if(o=o.replace(this._reTrim,""))for(var o=o.split(this._reSplit),p=0,u=o.length;p<u;p++){for(var t="",m=2,v=c.length;m<v;m++)m==2?t+="<"+n+' dtlinstruction="{% '+o[p].replace('"','\\"')+' %}">':n!=c[m]&&(t+="<"+c[m]+">");t+="DTL";for(m=c.length-1;m>1;m--)m==2?t+="</"+n+">":n!=c[m]&&(t+="</"+c[m]+">");l.push("\u00ff"+d.length);
d.push(t)}}a=a.replace(b[1],l.join(""))}}}for(e=d.length;e--;)a=a.replace("\u00ff"+e,d[e]);for(g=/\b([a-zA-Z_:][a-zA-Z0-9_\-\.:]*)=['"]/g;b=g.exec(a);)d=b[1].toLowerCase(),d!="dtlinstruction"&&(d!=b[1]&&(this._uppers[d]=b[1]),this._attributes[d]=!0);b=document.createElement("div");b.innerHTML=a;for(a={nodes:[]};b.childNodes.length;)a.nodes.push(b.removeChild(b.childNodes[0]));return a},tokenize:function(a){for(var b=[],g=0,d;d=a[g++];)d.nodeType!=1?this.__tokenize(d,b):this._tokenize(d,b);return b},
_swallowed:[],_tokenize:function(a,b){var g=!1,d=this._swallowed,e,h,f;if(!b.first){var g=b.first=!0,i=c.register.getAttributeTags();for(e=0;h=i[e];e++)try{h[2]({swallowNode:function(){throw 1;}},new c.Token(c.TOKEN_ATTR,""))}catch(n){d.push(h)}}for(e=0;h=d[e];e++)if(i=a.getAttribute(h[0]))if(d=!1,h=h[2]({swallowNode:function(){d=!0;return a}},new c.Token(c.TOKEN_ATTR,h[0]+" "+i)),d){a.parentNode&&a.parentNode.removeChild&&a.parentNode.removeChild(a);b.push([c.TOKEN_CUSTOM,h]);return}h=[];if(r("ie")&&
a.tagName=="SCRIPT")h.push({nodeType:3,data:a.text}),a.text="";else for(e=0;f=a.childNodes[e];e++)h.push(f);b.push([c.TOKEN_NODE,a]);i=!1;h.length&&(b.push([c.TOKEN_CHANGE,a]),i=!0);for(var j in this._attributes){e=!1;f="";if(j=="class")f=a.className||f;else if(j=="for")f=a.htmlFor||f;else if(j=="value"&&a.value==a.innerHTML)continue;else if(a.getAttribute)if(f=a.getAttribute(j,2)||f,j=="href"||j=="src"){if(r("ie")){var l=location.href.lastIndexOf(location.hash),l=location.href.substring(0,l).split("/");
l.pop();l=l.join("/")+"/";f.indexOf(l)==0&&(f=f.replace(l,""));f=decodeURIComponent(f)}}else j=="tstyle"?(e=j,j="style"):c.BOOLS[j.slice(1)]&&k.trim(f)?j=j.slice(1):this._uppers[j]&&k.trim(f)&&(e=this._uppers[j]);e&&(a.setAttribute(e,""),a.removeAttribute(e));typeof f=="function"&&(f=f.toString().replace(this._re4,"$1"));i||(b.push([c.TOKEN_CHANGE,a]),i=!0);b.push([c.TOKEN_ATTR,a,j,f])}for(e=0;f=h[e];e++){if(f.nodeType==1&&(j=f.getAttribute("dtlinstruction")))f.parentNode.removeChild(f),f={nodeType:8,
data:j};this.__tokenize(f,b)}!g&&a.parentNode&&a.parentNode.tagName?(i&&b.push([c.TOKEN_CHANGE,a,!0]),b.push([c.TOKEN_CHANGE,a.parentNode]),a.parentNode.removeChild(a)):b.push([c.TOKEN_CHANGE,a,!0,!0])},__tokenize:function(a,b){var g=a.data;switch(a.nodeType){case 1:this._tokenize(a,b);break;case 3:if(g.match(/[^\s\n]/)&&(g.indexOf("{{")!=-1||g.indexOf("{%")!=-1))for(var g=q.tokenize(g),d=0,e;e=g[d];d++)typeof e=="string"?b.push([c.TOKEN_TEXT,e]):b.push(e);else b.push([a.nodeType,a]);a.parentNode&&
a.parentNode.removeChild(a);break;case 8:if(g.indexOf("{%")==0){e=k.trim(g.slice(2,-2));if(e.substr(0,5)=="load ")for(var d=k.trim(e).split(/\s+/g),h=1,f;f=d[h];h++)/\./.test(f)&&(f=f.replace(/\./g,"/")),require([f]);b.push([c.TOKEN_BLOCK,e])}g.indexOf("{{")==0&&b.push([c.TOKEN_VAR,k.trim(g.slice(2,-2))]);a.parentNode&&a.parentNode.removeChild(a)}}};c.DomTemplate=k.extend(function(a){if(!a.nodes){var b=v.byId(a);b&&b.nodeType==1?(y.forEach(["class","src","href","name","value"],function(a){p._attributes[a]=
!0}),a={nodes:[b]}):(typeof a=="object"&&(a=q.getTemplateString(a)),a=p.getTemplate(a))}a=p.tokenize(a.nodes);if(c.tests)this.tokens=a.slice(0);this.nodelist=(new c._DomParser(a)).parse()},{_count:0,_re:/\bdojo:([a-zA-Z0-9_]+)\b/g,setClass:function(a){this.getRootNode().className=a},getRootNode:function(){return this.buffer.rootNode},getBuffer:function(){return new c.DomBuffer},render:function(a,b){b=this.buffer=b||this.getBuffer();this.rootNode=null;for(var g=this.nodelist.render(a||new c.Context({}),
b),d=0,e;e=b._cache[d];d++)if(e._cache)e._cache.length=0;return g},unrender:function(a,b){return this.nodelist.unrender(a,b)}});c.DomBuffer=k.extend(function(a){this._parent=a;this._cache=[]},{concat:function(a){var b=this._parent;if(b&&a.parentNode&&a.parentNode===b&&!b._dirty)return this;if(a.nodeType==1&&!this.rootNode)return this.rootNode=a||!0,this;if(!b){if(a.nodeType==3&&k.trim(a.data))throw Error("Text should not exist outside of the root node in template");return this}if(this._closed)if(a.nodeType==
3&&!k.trim(a.data))return this;else throw Error("Content should not exist outside of the root node in template");if(b._dirty){if(a._drawn&&a.parentNode==b){var c=b._cache;if(c){for(var d=0,e;e=c[d];d++)this.onAddNode&&this.onAddNode(e),b.insertBefore(e,a),this.onAddNodeComplete&&this.onAddNodeComplete(e);c.length=0}}b._dirty=!1}if(!b._cache)b._cache=[],this._cache.push(b);b._dirty=!0;b._cache.push(a);return this},remove:function(a){if(typeof a=="string")this._parent&&this._parent.removeAttribute(a);
else{if(a.nodeType==1&&!this.getRootNode()&&!this._removed)return this._removed=!0,this;a.parentNode&&(this.onRemoveNode&&this.onRemoveNode(a),a.parentNode&&a.parentNode.removeChild(a))}return this},setAttribute:function(a,b){var c=u.attr(this._parent,a);if(this.onChangeAttribute&&c!=b)this.onChangeAttribute(this._parent,a,c,b);a=="style"?this._parent.style.cssText=b:(u.attr(this._parent,a,b),a=="value"&&this._parent.setAttribute(a,b));return this},addEvent:function(a,b,c,d){if(!a.getThis())throw Error("You must use Context.setObject(instance)");
this.onAddEvent&&this.onAddEvent(this.getParent(),b,c);var e=c;k.isArray(d)&&(e=function(a){this[c].apply(this,[a].concat(d))});return z.connect(this.getParent(),b,a.getThis(),e)},setParent:function(a,b,c){if(!this._parent)this._parent=this._first=a;if(b&&c&&a===this._first)this._closed=!0;if(b){var d=this._parent,e="",h=r("ie")&&d.tagName=="SCRIPT";if(h)d.text="";if(d._dirty){for(var f=d._cache,i=d.tagName=="SELECT"&&!d.options.length,k=0,j;j=f[k];k++)j!==d&&(this.onAddNode&&this.onAddNode(j),h?
e+=j.data:(d.appendChild(j),i&&j.defaultSelected&&k&&(i=k)),this.onAddNodeComplete&&this.onAddNodeComplete(j));if(i)d.options.selectedIndex=typeof i=="number"?i:0;f.length=0;d._dirty=!1}if(h)d.text=e}this._parent=a;this.onSetParent&&this.onSetParent(a,b,c);return this},getParent:function(){return this._parent},getRootNode:function(){return this.rootNode}});c._DomNode=k.extend(function(a){this.contents=a},{render:function(a,b){this._rendered=!0;return b.concat(this.contents)},unrender:function(a,b){if(!this._rendered)return b;
this._rendered=!1;return b.remove(this.contents)},clone:function(){return new this.constructor(this.contents)}});c._DomNodeList=k.extend(function(a){this.contents=a||[]},{push:function(a){this.contents.push(a)},unshift:function(a){this.contents.unshift(a)},render:function(a,b,g){b=b||c.DomTemplate.prototype.getBuffer();if(g)var d=b.getParent();for(g=0;g<this.contents.length;g++)if(b=this.contents[g].render(a,b),!b)throw Error("Template node render functions must return their buffer");d&&b.setParent(d);
return b},dummyRender:function(a,b,g){var d=document.createElement("div"),e=b.getParent(),h=e._clone;e._clone=d;var f=this.clone(b,d);e._clone=h?h:null;b=c.DomTemplate.prototype.getBuffer();f.unshift(new c.ChangeNode(d));f.unshift(new c._DomNode(d));f.push(new c.ChangeNode(d,!0));f.render(a,b);if(g)return b.getRootNode();a=d.innerHTML;return r("ie")?x.replace(/\s*_(dirty|clone)="[^"]*"/g,""):a},unrender:function(a,b,c){if(c)var d=b.getParent();for(c=0;c<this.contents.length;c++)if(b=this.contents[c].unrender(a,
b),!b)throw Error("Template node render functions must return their buffer");d&&b.setParent(d);return b},clone:function(a){for(var b=a.getParent(),g=this.contents,d=new c._DomNodeList,e=[],h=0;h<g.length;h++){var f=g[h].clone(a);if(f instanceof c.ChangeNode||f instanceof c._DomNode){var i=f.contents._clone;if(i)f.contents=i;else if(b!=f.contents&&f instanceof c._DomNode)i=f.contents,f.contents=f.contents.cloneNode(!1),a.onClone&&a.onClone(i,f.contents),e.push(i),i._clone=f.contents}d.push(f)}for(h=
0;f=e[h];h++)f._clone=null;return d},rtrim:function(){for(;;){var a=this.contents.length-1;if(this.contents[a]instanceof c._DomTextNode&&this.contents[a].isEmpty())this.contents.pop();else break}return this}});c._DomVarNode=k.extend(function(a){this.contents=new c._Filter(a)},{render:function(a,b){var g=this.contents.resolve(a),d="text";g&&(g.render&&g.getRootNode?d="injection":g.safe&&(g.nodeType?d="node":g.toString&&(g=g.toString(),d="html")));this._type&&d!=this._type&&this.unrender(a,b);this._type=
d;switch(d){case "text":this._rendered=!0;this._txt=this._txt||document.createTextNode(g);if(this._txt.data!=g)d=this._txt.data,this._txt.data=g,b.onChangeData&&b.onChangeData(this._txt,d,this._txt.data);return b.concat(this._txt);case "injection":d=g.getRootNode();this._rendered&&d!=this._root&&(b=this.unrender(a,b));this._root=d;var e=this._injected=new c._DomNodeList;e.push(new c.ChangeNode(b.getParent()));e.push(new c._DomNode(d));e.push(g);e.push(new c.ChangeNode(b.getParent()));this._rendered=
!0;return e.render(a,b);case "node":return this._rendered=!0,this._node&&this._node!=g&&this._node.parentNode&&this._node.parentNode===b.getParent()&&this._node.parentNode.removeChild(this._node),this._node=g,b.concat(g);case "html":this._rendered&&this._src!=g&&(b=this.unrender(a,b));this._src=g;if(!this._rendered){this._rendered=!0;this._html=this._html||[];d=this._div=this._div||document.createElement("div");d.innerHTML=g;for(g=d.childNodes;g.length;)e=d.removeChild(g[0]),this._html.push(e),b=
b.concat(e)}return b;default:return b}},unrender:function(a,b){if(!this._rendered)return b;this._rendered=!1;switch(this._type){case "text":return b.remove(this._txt);case "injection":return this._injection.unrender(a,b);case "node":if(this._node.parentNode===b.getParent())return b.remove(this._node);return b;case "html":for(var c=0,d=this._html.length;c<d;c++)b=b.remove(this._html[c]);return b;default:return b}},clone:function(){return new this.constructor(this.contents.getExpression())}});c.ChangeNode=
k.extend(function(a,b,c){this.contents=a;this.up=b;this.root=c},{render:function(a,b){return b.setParent(this.contents,this.up,this.root)},unrender:function(a,b){if(!b.getParent())return b;return b.setParent(this.contents)},clone:function(){return new this.constructor(this.contents,this.up,this.root)}});c.AttributeNode=k.extend(function(a,b){this.key=a;this.contents=this.value=b;if(this._pool[b])this.nodelist=this._pool[b];else{if(!(this.nodelist=c.quickFilter(b)))this.nodelist=(new c.Template(b,
!0)).nodelist;this._pool[b]=this.nodelist}this.contents=""},{_pool:{},render:function(a,b){var g=this.key,d=this.nodelist.dummyRender(a);c.BOOLS[g]&&(d=!(d=="false"||d=="undefined"||!d));if(d!==this.contents)return this.contents=d,b.setAttribute(g,d);return b},unrender:function(a,b){this.contents="";return b.remove(this.key)},clone:function(){return new this.constructor(this.key,this.value)}});c._DomTextNode=k.extend(function(a){this.contents=document.createTextNode(a);this.upcoming=a},{set:function(a){this.upcoming=
a;return this},render:function(a,b){if(this.contents.data!=this.upcoming){var c=this.contents.data;this.contents.data=this.upcoming;b.onChangeData&&b.onChangeData(this.contents,c,this.upcoming)}return b.concat(this.contents)},unrender:function(a,b){return b.remove(this.contents)},isEmpty:function(){return!k.trim(this.contents.data)},clone:function(){return new this.constructor(this.contents.data)}});c._DomParser=k.extend(function(a){this.contents=a},{i:0,parse:function(a){var b={},g=this.contents;
a||(a=[]);for(var d=0;d<a.length;d++)b[a[d]]=!0;for(d=new c._DomNodeList;this.i<g.length;){var e=g[this.i++],h=e[0],f=e[1];if(h==c.TOKEN_CUSTOM)d.push(f);else if(h==c.TOKEN_CHANGE)h=new c.ChangeNode(f,e[2],e[3]),f[h.attr]=h,d.push(h);else if(h==c.TOKEN_ATTR){var i=q.getTag("attr:"+e[2],!0);if(i&&e[3])(e[3].indexOf("{%")!=-1||e[3].indexOf("{{")!=-1)&&f.setAttribute(e[2],""),d.push(i(null,new c.Token(h,e[2]+" "+e[3])));else if(k.isString(e[3]))if(e[2]=="style"||e[3].indexOf("{%")!=-1||e[3].indexOf("{{")!=
-1)d.push(new c.AttributeNode(e[2],e[3]));else if(k.trim(e[3]))try{u.attr(f,e[2],e[3])}catch(n){}}else if(h==c.TOKEN_NODE)(i=q.getTag("node:"+f.tagName.toLowerCase(),!0))&&d.push(i(null,new c.Token(h,f),f.tagName.toLowerCase())),d.push(new c._DomNode(f));else if(h==c.TOKEN_VAR)d.push(new c._DomVarNode(f));else if(h==c.TOKEN_TEXT)d.push(new c._DomTextNode(f.data||f));else if(h==c.TOKEN_BLOCK){if(b[f])return--this.i,d;e=f.split(/\s+/g);if(e.length){e=e[0];i=q.getTag(e);if(typeof i!="function")throw Error("Function not found for "+
e);(f=i(this,new c.Token(h,f)))&&d.push(f)}}}if(a.length)throw Error("Could not find closing tag(s): "+a.toString());return d},next_token:function(){var a=this.contents[this.i++];return new c.Token(a[0],a[1])},delete_first_token:function(){this.i++},skip_past:function(a){return c._Parser.prototype.skip_past.call(this,a)},create_variable_node:function(a){return new c._DomVarNode(a)},create_text_node:function(a){return new c._DomTextNode(a||"")},getTemplate:function(a){return new c.DomTemplate(p.getTemplate(a))}});
return dojox.dtl.dom});