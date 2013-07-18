//>>built
define("app/store/JsonRest",["dojo/_base/declare","dojo/_base/xhr","dojo/store/JsonRest","app/store/QueryResults","dojo/_base/lang","dojo/on","dojo/topic"],function(k,f,l,m,h,o,n){return k(l,{findArrayProperty:function(a){if(Array.isArray(a))return a;for(var b in a){var c=a[b];if(Array.isArray(c))return c;if(typeof c=="object"&&(c=this.findArrayProperty(c),Array.isArray(c)))return c}return!1},get:function(a,b){var c=b||{};c.Accept=this.accepts;if(typeof __.user.auth_token!=="undefined")c["X-Auth-Token"]=
__.user.auth_token;if(typeof a=="object")a=(a=f.objectToQuery(a))?this.getFirstDivider()+a:"";else if(typeof a=="string"||typeof a=="number")a=this.getFirstDivider()+"id="+a;return f("GET",{url:this.target+a,handleAs:"json",failOk:!0,headers:c})},put:function(a,b){var b=b||{},c="id"in b?b.id:this.getIdentity(a),d=typeof c!="undefined",e={"Content-Type":"application/json",Accept:this.accepts,"If-Match":b.overwrite===!0?"*":null,"If-None-Match":b.overwrite===!1?"*":null};if(typeof __.user.auth_token!==
"undefined")e["X-Auth-Token"]=__.user.auth_token;return f(d&&!b.incremental?"PUT":"POST",{url:d?this.target+"?id="+c:this.target,postData:JSON.stringify(a),handleAs:"json",failOk:!0,headers:e})},remove:function(a){var b={};if(typeof __.user.auth_token!=="undefined")b["X-Auth-Token"]=__.user.auth_token;return f("DELETE",{url:this.target+"?id="+a,headers:b})},query:function(a,b){var c={Accept:this.accepts},b=b||{};if(b.start>=0&&b.count>=0&&b.count!=Infinity)c.Range="items="+(b.start||"0")+"-"+("count"in
b&&b.count!=Infinity?b.count+(b.start||0)-1:"");__.entities.addOptionsToContext(a,this.target);a&&typeof a=="object"&&(a=(a=f.objectToQuery(a))?this.getFirstDivider()+a:"");if(b&&b.sort){var d=this.sortParam;__.entities.addOptionsToContext({sortParam:d,sort:b.sort},this.target);a+=this.getFirstDivider(a)+(d?d+"=":"sort(");for(var e=0;e<b.sort.length;e++){var i=b.sort[e];a+=(e>0?",":"")+(i.descending?"-":"+")+encodeURIComponent(i.attribute)}d||(a+=")")}if(typeof __.user.auth_token!=="undefined")c["X-Auth-Token"]=
__.user.auth_token;var j=f("GET",{url:this.target+(a||""),handleAs:"json",failOk:!0,headers:c}),g=this,c=j.then(function(a){a=h.isArray(a)?a:[];g._rawData=a;var b=j.ioArgs.xhr.getResponseHeader("Content-Range");a.total=b&&(b=b.match(/\/(.*)/))&&+b[1];if(a.total==null)a.total=a.length;g.total=a.total;n.publish(g.target+"-loadedComplete",a);return a});return m(c)},getFirstValue:function(){var a=this._rawData;if(h.isArray(a)&&a.length>0)if(a=a[0],typeof a=="object"&&a!=null)return a.id;else if(typeof a==
"string")return a;return null},getFirstDivider:function(a){if(this.target.split(dojoConfig.appSpecific.api_host).join("").indexOf("?")!=-1)return"&";return a?"&":"?"}})});