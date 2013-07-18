//>>built
define("dojo/_base/xhr",["./kernel","./sniff","require","../io-query","../dom","../dom-form","./Deferred","./json","./lang","./array","../on"],function(b,m,t,n,y,l,z,u,o,v,A){m.add("native-xhr",function(){return typeof XMLHttpRequest!=="undefined"});if(m("native-xhr"))b._xhrObj=function(){try{return new XMLHttpRequest}catch(a){throw Error("XMLHTTP not available: "+a);}};else{for(var t=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],r,w=0;w<3;)try{if(r=t[w++],new ActiveXObject(r))break}catch(I){}b._xhrObj=
function(){return new ActiveXObject(r)}}var s=b.config;b.objectToQuery=n.objectToQuery;b.queryToObject=n.queryToObject;b.fieldToObject=l.fieldToObject;b.formToObject=l.toObject;b.formToQuery=l.toQuery;b.formToJson=l.toJson;b._blockAsync=!1;var p=b._contentHandlers=b.contentHandlers={text:function(a){return a.responseText},json:function(a){return u.fromJson(a.responseText||null)},"json-comment-filtered":function(a){b.config.useCommentedJson||console.warn("Consider using the standard mimetype:application/json. json-commenting can introduce security issues. To decrease the chances of hijacking, use the standard the 'json' handler and prefix your json with: {}&&\nUse djConfig.useCommentedJson=true to turn off this message.");
var a=a.responseText,c=a.indexOf("/*"),d=a.lastIndexOf("*/");if(c==-1||d==-1)throw Error("JSON was not comment filtered");return u.fromJson(a.substring(c+2,d))},javascript:function(a){return b.eval(a.responseText)},xml:function(a){var b=a.responseXML;if(m("ie")&&(!b||!b.documentElement)){var d=function(a){return"MSXML"+a+".DOMDocument"},d=["Microsoft.XMLDOM",d(6),d(4),d(3),d(2)];v.some(d,function(d){try{var e=new ActiveXObject(d);e.async=!1;e.loadXML(a.responseText);b=e}catch(g){return!1}return!0})}return b},
"json-comment-optional":function(a){return a.responseText&&/^[^{\[]*\/\*/.test(a.responseText)?p["json-comment-filtered"](a):p.json(a)}};b._ioSetArgs=function(a,c,d,f){var e={args:a,url:a.url},g=null;if(a.form){var g=y.byId(a.form),i=g.getAttributeNode("action");e.url=e.url||(i?i.value:null);g=l.toObject(g)}i=[{}];g&&i.push(g);a.content&&i.push(a.content);a.preventCache&&i.push({"dojo.preventCache":(new Date).valueOf()});e.query=n.objectToQuery(o.mixin.apply(null,i));e.handleAs=a.handleAs||"text";
var h=new z(c);h.addCallbacks(d,function(a){return f(a,h)});var j=a.load;j&&o.isFunction(j)&&h.addCallback(function(b){return j.call(a,b,e)});var k=a.error;k&&o.isFunction(k)&&h.addErrback(function(b){return k.call(a,b,e)});var m=a.handle;m&&o.isFunction(m)&&h.addBoth(function(b){return m.call(a,b,e)});s.ioPublish&&b.publish&&e.args.ioPublish!==!1&&(h.addCallbacks(function(a){b.publish("/dojo/io/load",[h,a]);return a},function(a){b.publish("/dojo/io/error",[h,a]);return a}),h.addBoth(function(a){b.publish("/dojo/io/done",
[h,a]);return a}));h.ioArgs=e;return h};var B=function(a){a.canceled=!0;var b=a.ioArgs.xhr,d=typeof b.abort;(d=="function"||d=="object"||d=="unknown")&&b.abort();a=a.ioArgs.error;if(!a)a=Error("xhr cancelled"),a.dojoType="cancel";return a},C=function(a){a=p[a.ioArgs.handleAs](a.ioArgs.xhr);return a===void 0?null:a},D=function(a,b){b.ioArgs.args.failOk||console.error(a);return a},q=null,j=[],k=0,E=function(a){k<=0&&(k=0,s.ioPublish&&b.publish&&(!a||a&&a.ioArgs.args.ioPublish!==!1)&&b.publish("/dojo/io/stop"))},
x=function(){var a=(new Date).getTime();if(!b._blockAsync)for(var c=0,d;c<j.length&&(d=j[c]);c++){var f=d.dfd;(function(){if(!f||f.canceled||!d.validCheck(f))j.splice(c--,1),k-=1;else if(d.ioCheck(f))j.splice(c--,1),d.resHandle(f),k-=1;else if(f.startTime&&f.startTime+(f.ioArgs.args.timeout||0)<a){j.splice(c--,1);var b=Error("timeout exceeded");b.dojoType="timeout";f.errback(b);f.cancel();k-=1}}).call(this)}E(f);j.length||(clearInterval(q),q=null)};b._ioCancelAll=function(){try{v.forEach(j,function(a){try{a.dfd.cancel()}catch(b){}})}catch(a){}};
m("ie")&&A(window,"unload",b._ioCancelAll);b._ioNotifyStart=function(a){s.ioPublish&&b.publish&&a.ioArgs.args.ioPublish!==!1&&(k||b.publish("/dojo/io/start"),k+=1,b.publish("/dojo/io/send",[a]))};b._ioWatch=function(a,b,d,f){var e=a.ioArgs.args;if(e.timeout)a.startTime=(new Date).getTime();j.push({dfd:a,validCheck:b,ioCheck:d,resHandle:f});q||(q=setInterval(x,50));e.sync&&x()};var F=function(a){return a.ioArgs.xhr.readyState},G=function(a){return 4==a.ioArgs.xhr.readyState},H=function(a){var c=a.ioArgs.xhr;
if(b._isDocumentOk(c))a.callback(a);else{var d=Error("Unable to load "+a.ioArgs.url+" status:"+c.status);d.status=c.status;d.responseText=c.responseText;d.xhr=c;a.errback(d)}};b._ioAddQueryToUrl=function(a){if(a.query.length)a.url+=(a.url.indexOf("?")==-1?"?":"&")+a.query,a.query=null};b.xhr=function(a,c,d){var f=b._ioSetArgs(c,B,C,D),e=f.ioArgs,g=e.xhr=b._xhrObj(e.args);if(!g)return f.cancel(),f;"postData"in c?e.query=c.postData:"putData"in c?e.query=c.putData:"rawBody"in c?e.query=c.rawBody:(arguments.length>
2&&!d||"POST|PUT".indexOf(a.toUpperCase())==-1)&&b._ioAddQueryToUrl(e);g.open(a,e.url,c.sync!==!0,c.user||void 0,c.password||void 0);if(c.headers)for(var i in c.headers)i.toLowerCase()==="content-type"&&!c.contentType?c.contentType=c.headers[i]:c.headers[i]&&g.setRequestHeader(i,c.headers[i]);c.contentType!==!1&&g.setRequestHeader("Content-Type",c.contentType||"application/x-www-form-urlencoded");(!c.headers||!("X-Requested-With"in c.headers))&&g.setRequestHeader("X-Requested-With","XMLHttpRequest");
b._ioNotifyStart(f);if(b.config.debugAtAllCosts)g.send(e.query);else try{g.send(e.query)}catch(h){e.error=h,f.cancel()}b._ioWatch(f,F,G,H);return f};b.xhrGet=function(a){return b.xhr("GET",a)};b.rawXhrPost=b.xhrPost=function(a){return b.xhr("POST",a,!0)};b.rawXhrPut=b.xhrPut=function(a){return b.xhr("PUT",a,!0)};b.xhrDelete=function(a){return b.xhr("DELETE",a)};b._isDocumentOk=function(a){a=a.status||0;return a>=200&&a<300||a==304||a==1223||!a};b._getText=function(a){var c;b.xhrGet({url:a,sync:!0,
load:function(a){c=a}});return c};o.mixin(b.xhr,{_xhrObj:b._xhrObj,fieldToObject:l.fieldToObject,formToObject:l.toObject,objectToQuery:n.objectToQuery,formToQuery:l.toQuery,formToJson:l.toJson,queryToObject:n.queryToObject,contentHandlers:p,_ioSetArgs:b._ioSetArgs,_ioCancelAll:b._ioCancelAll,_ioNotifyStart:b._ioNotifyStart,_ioWatch:b._ioWatch,_ioAddQueryToUrl:b._ioAddQueryToUrl,_isDocumentOk:b._isDocumentOk,_getText:b._getText,get:b.xhrGet,post:b.xhrPost,put:b.xhrPut,del:b.xhrDelete});return b.xhr});