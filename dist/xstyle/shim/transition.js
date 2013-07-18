//>>built
define("xstyle/shim/transition",["../xstyle","../elemental"],function(z,s){function t(a){if(a.propertyName=="className"){var a=a.srcElement,b=a._transitions,d=a._previousStyle,c=a.runtimeStyle,u=a.currentStyle,e;for(e in d){var g=c[e];if(!b)a._transitions=b={};var f=d[e],k=u[e];c[e]=g;if(f!=k&&(f||g)){var h=i(k);if(h.units){var l=i(g),l=n(h,l),o=i(f),p=n(h,o);if(p&&l&&o.units==h.units){if(h=b[e])h.at=1;var q=q||(m=(new Date).getTime()),h=b[e]={from:f||g,element:a,to:k,startTime:q,duration:a._transitionDuration*
l/p,timing:v[a._transitionTiming||"ease"],property:e,t:0};r(h)||j.push(h);d[e]=k}}}}}}function i(a){var b=a.match(w);if(b){a=b[1].split(",");for(b=0;b<4;b++)a[0]=+(a[0]||0)}else if(b=a.match(x)){var b=b[1],a=[],d=b.length==3;a[0]=parseInt(b[0]+b[d?0:1],16);a[1]=parseInt(b[d?1:2]+b[d?1:3],16);a[2]=parseInt(b[d?2:4]+b[d?2:5],16);a.units="rgb";return a}else return(b=a.match(y))?(a=[b[1]],a.units=b[2],a):[];a.units="rgb";return a}function n(a,b){for(var d=0,c=0;c<a.length;c++)d+=Math.abs((b[c]||0)-(a[c]||
0));return d}function r(a){runtimeStyle=a.element.runtimeStyle;if((a.t=(m-a.startTime)/1E3/a.duration)>=1)return runtimeStyle[a.property]="",!0;var b=runtimeStyle,d=a.property,c;c=i(a.from);for(var f=i(a.to),a=a.timing(a.t),e=[],g=0;g<c.length;g++)e[g]=f[g]*a-c[g]*(a-1);c=c.units=="rgb"?"#"+e[0].toString(16)+e[1].toString(16)+e[2].toString(16)+e[3].toString(16):e[0]+c.units;b[d]=c}function f(a,b,d,c){var f=(b+0.01)/(a+0.01)/3,e=1-(1.01-c)/(1.01-d)/3;return function(a){return 3*(1-a)*(1-a)*a*f+3*(1-
a)*a*a*e+a*a*a}}var j=[],w=/^rgba?\(([0-9,]+)\)/i,x=/#([0-9a-f]+)/i,y=/([-0-9\.]+)([\w]+)/,j=[],m=(new Date).getTime();setInterval(function(){m=(new Date).getTime();for(var a=0,b=j.length;a<b;a++)r(j[a])&&(j.splice(a--,1),b--)},30);var v={ease:f(0.25,0.1,0.25,1),linear:f(0,0,1,1),"ease-in":f(0.42,0,1,1),"ease-out":f(0,0,0.58,1),"ease-in-out":f(0.42,0,0.58,1)};return{onProperty:function(a,b,d){return s.addRenderer(a,b,d,function(c){var d=c.currentStyle,e=c._previousStyle={};if(a=="transition-duration")c._transitionDuration=
parseFloat(b);for(var f in d)e[f]=d[f];c.attachEvent("onpropertychange",t)})}}});