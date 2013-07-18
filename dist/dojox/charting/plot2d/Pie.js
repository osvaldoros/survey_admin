//>>built
define("dojox/charting/plot2d/Pie",["dojo/_base/lang","dojo/_base/array","dojo/_base/declare","../Element","./_PlotEvents","./common","../axis2d/common","dojox/gfx","dojox/gfx/matrix","dojox/lang/functional","dojox/lang/utils"],function(A,p,H,I,J,x,B,l,F,i,G){return H("dojox.charting.plot2d.Pie",[I,J],{defaultParams:{labels:!0,ticks:!1,fixed:!0,precision:1,labelOffset:20,labelStyle:"default",htmlLabels:!0,radGrad:"native",fanSize:5,startAngle:0},optionalParams:{radius:0,stroke:{},outline:{},shadow:{},
fill:{},font:"",fontColor:"",labelWiring:{}},constructor:function(h,c){this.opt=A.clone(this.defaultParams);G.updateWithObject(this.opt,c);G.updateWithPattern(this.opt,c,this.optionalParams);this.run=null;this.dyn=[]},clear:function(){this.dirty=!0;this.dyn=[];this.run=null;return this},setAxis:function(){return this},addSeries:function(h){this.run=h;return this},getSeriesStats:function(){return A.delegate(x.defaultStats)},initializeScalers:function(){return this},getRequiredColors:function(){return this.run?
this.run.data.length:0},render:function(h,c){if(!this.dirty)return this;this.resetEvents();this.dirty=!1;this._eventSeries={};this.cleanGroup();var t=this.group,b=this.chart.theme;if(!this.run||!this.run.data.length)return this;var d=(h.width-c.l-c.r)/2,e=(h.height-c.t-c.b)/2,g=Math.min(d,e),m="font"in this.opt?this.opt.font:b.axis.font,u=m?l.normalizedLength(l.splitFontString(m).size):0,y=F._degToRad(this.opt.startAngle),j=y,n,q,r,z,v=this.run.data,A=this.events();if(typeof v[0]=="number"){n=i.map(v,
"x ? Math.max(x, 0) : 0");if(i.every(n,"<= 0"))return this;q=i.map(n,"/this",i.foldl(n,"+",0));this.opt.labels&&(r=p.map(q,function(a){return a>0?this._getLabel(a*100)+"%":""},this))}else{n=i.map(v,"x ? Math.max(x.y, 0) : 0");if(i.every(n,"<= 0"))return this;q=i.map(n,"/this",i.foldl(n,"+",0));this.opt.labels&&(r=p.map(q,function(a,c){if(a<=0)return"";var k=v[c];return"text"in k?k.text:this._getLabel(a*100)+"%"},this))}var D=i.map(v,function(a){if(a===null||typeof a=="number")return b.next("slice",
[this.opt,this.run],!0);return b.next("slice",[this.opt,this.run,a],!0)},this);this.opt.labels&&(n=i.foldl1(i.map(r,function(a,c){return l._base._getTextBox(a,{font:D[c].series.font}).w},this),"Math.max(a, b)")/2,this.opt.labelOffset<0&&(g=Math.min(d-2*n,e-u)+this.opt.labelOffset),z=g-this.opt.labelOffset);if("radius"in this.opt)g=this.opt.radius,z=g-this.opt.labelOffset;var a={cx:c.l+d,cy:c.t+e,r:g};this.dyn=[];var E=Array(q.length);p.some(q,function(d,b){if(d<0)return!1;if(d==0)return this.dyn.push({fill:null,
stroke:null}),!1;var k=v[b],s=D[b],f;if(d>=1){f=this._plotFill(s.series.fill,h,c);f=this._shapeFill(f,{x:a.cx-a.r,y:a.cy-a.r,width:2*a.r,height:2*a.r});f=this._pseudoRadialFill(f,{x:a.cx,y:a.cy},a.r);var e=t.createCircle(a).setFill(f).setStroke(s.series.stroke);this.dyn.push({fill:f,stroke:s.series.stroke});A&&(k={element:"slice",index:b,run:this.run,shape:e,x:b,y:typeof k=="number"?k:k.y,cx:a.cx,cy:a.cy,cr:g},this._connectEvents(k),E[b]=k);return!0}var i=j+d*2*Math.PI;b+1==q.length&&(i=y+2*Math.PI);
var e=i-j,m=a.cx+g*Math.cos(j),n=a.cy+g*Math.sin(j),l=a.cx+g*Math.cos(i),u=a.cy+g*Math.sin(i);f=F._degToRad(this.opt.fanSize);if(s.series.fill&&s.series.fill.type==="radial"&&this.opt.radGrad==="fan"&&e>f){var r=t.createGroup(),p=Math.ceil(e/f),w=e/p;f=this._shapeFill(s.series.fill,{x:a.cx-a.r,y:a.cy-a.r,width:2*a.r,height:2*a.r});for(var o=0;o<p;++o){var x=o==0?m:a.cx+g*Math.cos(j+(o-0.2)*w),z=o==0?n:a.cy+g*Math.sin(j+(o-0.2)*w),B=o==p-1?l:a.cx+g*Math.cos(j+(o+1+0.2)*w),C=o==p-1?u:a.cy+g*Math.sin(j+
(o+1+0.2)*w);r.createPath().moveTo(a.cx,a.cy).lineTo(x,z).arcTo(g,g,0,w>Math.PI,!0,B,C).lineTo(a.cx,a.cy).closePath().setFill(this._pseudoRadialFill(f,{x:a.cx,y:a.cy},g,j+(o+0.5)*w,j+(o+0.5)*w))}r.createPath().moveTo(a.cx,a.cy).lineTo(m,n).arcTo(g,g,0,e>Math.PI,!0,l,u).lineTo(a.cx,a.cy).closePath().setStroke(s.series.stroke);e=r}else e=t.createPath().moveTo(a.cx,a.cy).lineTo(m,n).arcTo(g,g,0,e>Math.PI,!0,l,u).lineTo(a.cx,a.cy).closePath().setStroke(s.series.stroke),(f=s.series.fill)&&f.type==="radial"?
(f=this._shapeFill(f,{x:a.cx-a.r,y:a.cy-a.r,width:2*a.r,height:2*a.r}),this.opt.radGrad==="linear"&&(f=this._pseudoRadialFill(f,{x:a.cx,y:a.cy},g,j,i))):f&&f.type==="linear"&&(f=this._plotFill(f,h,c),f=this._shapeFill(f,e.getBoundingBox())),e.setFill(f);this.dyn.push({fill:f,stroke:s.series.stroke});A&&(k={element:"slice",index:b,run:this.run,shape:e,x:b,y:typeof k=="number"?k:k.y,cx:a.cx,cy:a.cy,cr:g},this._connectEvents(k),E[b]=k);j=i;return!1},this);if(this.opt.labels)if(this.opt.labelStyle=="default")j=
y,p.some(q,function(b,c){if(b<=0)return!1;var k=D[c];if(b>=1)return k=B.createText[this.opt.htmlLabels&&l.renderer!="vml"?"html":"gfx"](this.chart,t,a.cx,a.cy+u/2,"middle",r[c],k.series.font,k.series.fontColor),this.opt.htmlLabels&&this.htmlElements.push(k),!0;var d=j+b*2*Math.PI;c+1==q.length&&(d=y+2*Math.PI);var f=(j+d)/2,k=B.createText[this.opt.htmlLabels&&l.renderer!="vml"?"html":"gfx"](this.chart,t,a.cx+z*Math.cos(f),a.cy+z*Math.sin(f)+u/2,"middle",r[c],k.series.font,k.series.fontColor);this.opt.htmlLabels&&
this.htmlElements.push(k);j=d;return!1},this);else if(this.opt.labelStyle=="columns"){var j=y,C=[];p.forEach(q,function(a,c){var b=j+a*2*Math.PI;c+1==q.length&&(b=y+2*Math.PI);var d=(j+b)/2;C.push({angle:d,left:Math.cos(d)<0,theme:D[c],index:c,omit:b-j<0.001});j=b});d=l._base._getTextBox("a",{font:m}).h;this._getProperLabelRadius(C,d,a.r*1.1);p.forEach(C,function(b,c){if(!b.omit){var d=a.cx-a.r*2,e=a.cx+a.r*2,f=l._base._getTextBox(r[c],{font:m}).w,h=a.cx+b.labelR*Math.cos(b.angle),g=a.cy+b.labelR*
Math.sin(b.angle),e=b.left?d+f:e-f,d=b.left?d:e,j=t.createPath().moveTo(a.cx+a.r*Math.cos(b.angle),a.cy+a.r*Math.sin(b.angle));Math.abs(b.labelR*Math.cos(b.angle))<a.r*2-f&&j.lineTo(h,g);j.lineTo(e,g).setStroke(b.theme.series.labelWiring);f=B.createText[this.opt.htmlLabels&&l.renderer!="vml"?"html":"gfx"](this.chart,t,d,g,"left",r[c],b.theme.series.font,b.theme.series.fontColor);this.opt.htmlLabels&&this.htmlElements.push(f)}},this)}var x=0;this._eventSeries[this.run.name]=i.map(v,function(a){return a<=
0?null:E[x++]});return this},_getProperLabelRadius:function(h,c,i){var b={},d={},e=1,g=1;if(h.length==1)h[0].labelR=i;else{for(var m=0;m<h.length;m++){var l=Math.abs(Math.sin(h[m].angle));h[m].left?e>l&&(e=l,b=h[m]):g>l&&(g=l,d=h[m])}b.labelR=d.labelR=i;this._calculateLabelR(b,h,c);this._calculateLabelR(d,h,c)}},_calculateLabelR:function(h,c,i){for(var b=h.index,d=c.length,e=h.labelR;!(c[b%d].left^c[(b+1)%d].left);){if(!c[(b+1)%d].omit)e=(Math.sin(c[b%d].angle)*e+(c[b%d].left?-i:i))/Math.sin(c[(b+
1)%d].angle),e=e<h.labelR?h.labelR:e,c[(b+1)%d].labelR=e;b++}b=h.index;for(d=b==0?d-1:b-1;!(c[b].left^c[d].left);){if(!c[d].omit)e=(Math.sin(c[b].angle)*e+(c[b].left?i:-i))/Math.sin(c[d].angle),e=e<h.labelR?h.labelR:e,c[d].labelR=e;b--;d--;b=b<0?b+c.length:b;d=d<0?d+c.length:d}},_getLabel:function(h){return x.getLabel(h,this.opt.fixed,this.opt.precision)}})});