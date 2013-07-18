//>>built
define("dojo/_base/loader",["./kernel","../has","require","module","./json","./lang","./array"],function(e,w,i,F,P,k,r){var o=function(a){return a.replace(/\./g,"/")},G=/\/\/>>built/,s=[],p=[],q,y=function(a){if(q[a.mid]||/loadInit\!/.test(a.mid))return!0;q[a.mid]=1;if(a.injected!==x&&!a.executed)return!1;for(var a=a.deps||[],c=0;c<a.length;c++)if(!y(a[c]))return!1;return!0},t=function(){q={};p=r.filter(p,function(a){return!y(a)});if(!p.length){d.holdIdle();var a=s;s=[];r.forEach(a,function(a){a(1)});
d.releaseIdle()}},H=function(a,c,b){var f=/\(|\)/g,n=1;for(f.lastIndex=c;c=f.exec(a);)if(c[0]==")"?n-=1:n+=1,n==0)break;if(n!=0)throw"unmatched paren around character "+f.lastIndex+" in: "+a;return[e.trim(a.substring(b,f.lastIndex))+";\n",f.lastIndex]},I=/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,j=/(^|\s)dojo\.(loadInit|require|provide|requireLocalization|requireIf|requireAfterIf|platformRequire)\s*\(/mg,u=/(^|\s)(require|define)\s*\(/m,z=function(a,c){var b,f,n,e=[],d=[];b=[];for(c=c||a.replace(I,function(a){j.lastIndex=
u.lastIndex=0;return j.test(a)||u.test(a)?"":a});b=j.exec(c);)f=j.lastIndex,n=f-b[0].length,f=H(c,f,n),b[2]=="loadInit"?e.push(f[0]):d.push(f[0]),j.lastIndex=f[1];b=e.concat(d);return b.length||!u.test(c)?[a.replace(/(^|\s)dojo\.loadInit\s*\(/g,"\n0 && dojo.loadInit("),b.join(""),b]:0},d=i.initSyncLoader(function(a,c,b){s.push(b);r.forEach(a.split(","),function(a){a=l(a,c.module);p.push(a);v(a)});t()},t,function(a,c){var b,f,d=[],J=[];if(G.test(c)||!(b=z(c)))return 0;f=a.mid+"-*loadInit";for(var g in l("dojo",
a).result.scopeMap)d.push(g),J.push('"'+g+'"');return"// xdomain rewrite of "+a.path+"\ndefine('"+f+"',{\n\tnames:"+e.toJson(d)+",\n\tdef:function("+d.join(",")+"){"+b[1]+"}});\n\ndefine("+e.toJson(d.concat(["dojo/loadInit!"+f]))+", function("+d.join(",")+"){\n"+b[0]+"});"}),K=d.sync,x=d.arrived,A=d.nonmodule,L=d.executing,B=d.executed,h=d.syncExecStack,C=d.execQ,l=d.getModule,v=d.injectModule,D=d.setArrived,M=d.signal,N=d.finishExec,O=d.execModule,E=d.getLegacyMode;e.provide=function(a){var c=h[0],
b=k.mixin(l(o(a),i.module),{executed:L,result:k.getObject(a,!0)});D(b);if(c)(c.provides||(c.provides=[])).push(function(){b.result=k.getObject(a);delete b.provides;b.executed!==B&&N(b)});return b.result};w.add("config-publishRequireResult",1,0,0);e.require=function(a,c){var b=function(a,c){var b=l(o(a),i.module);if(h.length&&h[0].finish)h[0].finish.push(a);else{if(b.executed)return b.result;c&&(b.result=A);var e=E();v(b);e=E();b.executed!==B&&b.injected===x&&(d.holdIdle(),O(b),d.releaseIdle());if(b.executed)return b.result;
e==K?b.cjs?C.unshift(b):h.length&&(h[0].finish=[a]):C.push(b)}}(a,c);w("config-publishRequireResult")&&!k.exists(a)&&b!==void 0&&k.setObject(a,b);return b};e.loadInit=function(a){a()};e.registerModulePath=function(a,c){var b={};b[a.replace(/\./g,"/")]=c;i({paths:b})};e.platformRequire=function(a){for(var a=(a.common||[]).concat(a[e._name]||a["default"]||[]),c;a.length;)k.isArray(c=a.shift())?e.require.apply(e,c):e.require(c)};e.requireIf=e.requireAfterIf=function(a,c,b){a&&e.require(c,b)};e.requireLocalization=
function(a,c,b){i(["../i18n"],function(d){d.getLocalization(a,c,b)})};return{extractLegacyApiApplications:z,require:d.dojoRequirePlugin,loadInit:function(a,c,b){c([a],function(a){c(a.names,function(){for(var d="",k=[],g=0;g<arguments.length;g++)d+="var "+a.names[g]+"= arguments["+g+"]; ",k.push(arguments[g]);eval(d);var h=c.module,i=[],d={},j=[],m,g={provide:function(a){a=o(a);a=l(a,h);a!==h&&D(a)},require:function(a,b){a=o(a);b&&(l(a,h).result=A);j.push(a)},requireLocalization:function(a,b,c){i.length||
(i=["dojo/i18n"]);c=(c||e.locale).toLowerCase();a=o(a)+"/nls/"+(/root/i.test(c)?"":c+"/")+o(b);l(a,h).isXd&&i.push("dojo/i18n!"+a)},loadInit:function(a){a()}};try{for(m in g)d[m]=e[m],e[m]=g[m];a.def.apply(null,k)}catch(q){M("error",[{src:F.id,id:"failedDojoLoadInit"},q])}finally{for(m in g)e[m]=d[m]}j.length&&i.push("dojo/require!"+j.join(","));s.push(b);r.forEach(j,function(a){a=l(a,c.module);p.push(a);v(a)});t()})})}}});