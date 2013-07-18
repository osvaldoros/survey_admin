//>>built
define("dojox/data/PersevereStore",["dojo","dojox","require","dojox/data/JsonQueryRestStore","dojox/rpc/Client","dojo/_base/url"],function(e,c,h){c.json.ref.serializeFunctions=!0;e.declare("dojox.data.PersevereStore",c.data.JsonQueryRestStore,{useFullIdInQueries:!0,jsonQueryPagination:!1});c.data.PersevereStore.getStores=function(a,j){a=a&&(a.match(/\/$/)?a:a+"/")||"/";a.match(/^\w*:\/\//)&&(h("dojox/io/xhrScriptPlugin"),c.io.xhrScriptPlugin(a,"callback",c.io.xhrPlugins.fullHttpAdapter));var k=e.xhr;
e.xhr=function(c,a){(a.headers=a.headers||{})["Server-Methods"]="false";return k.apply(e,arguments)};var d=c.rpc.Rest(a,!0);c.rpc._sync=j;var d=d("Class/"),l,m={},n=0;d.addCallback(function(g){function d(b){if(b["extends"]&&b["extends"].prototype&&(!b.prototype||!b.prototype.isPrototypeOf(b["extends"].prototype)))d(b["extends"]),c.rpc.Rest._index[b.prototype.__id]=b.prototype=e.mixin(e.delegate(b["extends"].prototype),b.prototype)}function h(b,a){if(b&&a)for(var d in b)b[d].runAt!="client"&&!a[d]&&
(a[d]=function(a){return function(){var b=e.rawXhrPost({url:this.__id,postData:c.json.ref.toJson({method:a,id:n++,params:e._toArray(arguments)}),handleAs:"json"});b.addCallback(function(a){return a.error?Error(a.error):a.result});return b}}(d))}c.json.ref.resolveJson(g,{index:c.rpc.Rest._index,idPrefix:"/Class/",assignAbsoluteIds:!0});for(var i in g)if(typeof g[i]=="object"){var f=g[i];d(f);h(f.methods,f.prototype=f.prototype||{});h(f.staticMethods,f);m[g[i].id]=new c.data.PersevereStore({target:new e._Url(a,
g[i].id)+"/",schema:f})}return l=m});e.xhr=k;return j?l:d};c.data.PersevereStore.addProxy=function(){h("dojox/io/xhrPlugins");c.io.xhrPlugins.addProxy("/proxy/")};return c.data.PersevereStore});