//>>built
define("dojox/charting/themes/ThreeD",["dojox","dojo/_base/kernel","dojo/_base/lang","dojo/_base/array","../Theme","./gradientGenerator","./PrimaryColors","dojo/colors","./common"],function(l,m,d,f,e,g,h,b){var i={type:"linear",space:"shape",x1:0,y1:0,x2:100,y2:0},j=[{o:0,i:174},{o:0.08,i:231},{o:0.18,i:237},{o:0.3,i:231},{o:0.39,i:221},{o:0.49,i:206},{o:0.58,i:187},{o:0.68,i:165},{o:0.8,i:128},{o:0.9,i:102},{o:1,i:174}],k=f.map(["#f00","#0f0","#00f","#ff0","#0ff","#f0f","./common"],function(a){var c=
d.delegate(i),a=(c.colors=g.generateGradientByIntensity(a,j))[2].color;a.r+=100;a.g+=100;a.b+=100;a.sanitize();return c});b.ThreeD=h.clone();b.ThreeD.series.shadow={dx:1,dy:1,width:3,color:[0,0,0,0.15]};b.ThreeD.next=function(a){if(a=="bar"||a=="column"){var c=this._current%this.seriesThemes.length,b=this.seriesThemes[c],d=b.fill;b.fill=k[c];c=e.prototype.next.apply(this,arguments);b.fill=d;return c}return e.prototype.next.apply(this,arguments)};return b.ThreeD});