//>>built
define("xstyle/load-css",[],function(){function q(a,b){var c=a[l]("link");c.rel="stylesheet";c.type="text/css";if(b)c.href=b;return c}function r(a){for(var a=a.split("!"),b,c=1;b=a[c++];)b=b.split("=",2),a[b[0]]=b.length==2?b[1]:!0;return a}function s(a){if(g["dom-create-style-element"])return b=document.createElement("style"),b.setAttribute("type","text/css"),b.appendChild(document.createTextNode(a)),k.insertBefore(b,k.firstChild),b;else{var b=document.createStyleSheet();b.cssText=a;return b.owningElement}}
var m="onreadystatechange",n="onload",l="createElement",o=!1,h=document,t=typeof _css_cache=="undefined"?{}:_css_cache,g={"event-link-onload":!1,"dom-create-style-element":!document.createStyleSheet},k=h.head||(h.head=h.getElementsByTagName("head")[0]);if(!g["bundled-css"])var u=function(a,b){function c(e){var a,b,c=!1;try{if(a=e.sheet||e.styleSheet)if((c=(b=a.cssRules||a.rules)?b.length>0:b!==void 0)&&navigator.userAgent.indexOf("Chrome")>=0){a.insertRule("#_cssx_load_test{margin-top:-5px;}",0);
if(!f)f=document[l]("div"),f.id="_cssx_load_test",f.style.cssText="position:absolute;top:-999px;left:-999px;",h.body.appendChild(f);c=h.defaultView.getComputedStyle(f,null).marginTop=="-5px";a.deleteRule(0)}}catch(d){c=d.code==1E3||d.message.match(/security|denied/i)}return c}function i(a,b){c(a.link)?(p(a),b()):o||setTimeout(function(){i(a,b)},a.wait)}function p(a){a=a.link;a[m]=a[n]=null}function j(){d||(d=!0,b())}if(require.onError)require.onError=function(a){return function(){o=!0;a.apply(this,
arguments)}}(require.onError);var f,d;(function(a,b){var c=a.link;c[m]=c[n]=function(){if(!c.readyState||c.readyState=="complete")g["event-link-onload"]=!0,p(a),b()}})(a,j);g["event-link-onload"]||i(a,j)};return function(a,b,c){for(var i=a.split(","),g=i.length,j=function(){--g==0&&b(e.sheet||e.styleSheet)},f=0;f<i.length;f++){var a=i[f],d=t[a];if(d)return e=s(d),j();var a=r(a),d=a.shift(),d=d.lastIndexOf(".")<=d.lastIndexOf("/")?d+".css":d,e=q(h),a="nowait"in a?a.nowait!="false":!(!c||!c.cssDeferLoad);
u({link:e,url:d,wait:c&&c.cssWatchPeriod||50},j);a&&b(e);e.href=d;k.appendChild(e)}}});