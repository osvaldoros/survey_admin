//>>built
define("dojox/gfx/fx",["dojo/_base/lang","./_base","./matrix","dojo/_base/Color","dojo/_base/array","dojo/_base/fx","dojo/_base/connect"],function(x,n,l,o,r,j,k){function p(b,a){this.start=b;this.end=a}function s(b,a,c){this.start=b;this.end=a;this.units=c}function t(b,a){this.start=b;this.end=a;this.temp=new o}function g(b){this.values=b;this.length=b.length}function q(b,a){this.values=b;this.def=a?a:{}}function u(b,a){this.stack=b;this.original=a}function v(b,a,c,e){if(b.values)return new g(b.values);
var d,h;h=b.start?n.normalizeColor(b.start):d=a?c?a[c]:a:e;b.end?b=n.normalizeColor(b.end):(d||(d=a?c?a[c]:a:e),b=d);return new t(h,b)}var m=n.fx={};p.prototype.getValue=function(b){return(this.end-this.start)*b+this.start};s.prototype.getValue=function(b){return(this.end-this.start)*b+this.start+this.units};t.prototype.getValue=function(b){return o.blendColors(this.start,this.end,b,this.temp)};g.prototype.getValue=function(b){return this.values[Math.min(Math.floor(b*this.length),this.length-1)]};
q.prototype.getValue=function(b){var a=x.clone(this.def),c;for(c in this.values)a[c]=this.values[c].getValue(b);return a};u.prototype.getValue=function(b){var a=[];r.forEach(this.stack,function(c){if(c instanceof l.Matrix2D)a.push(c);else if(c.name=="original"&&this.original)a.push(this.original);else if(c.name in l){var e=l[c.name];if(typeof e!="function")a.push(e);else{var d=r.map(c.start,function(d,a){return(c.end[a]-d)*b+d}),e=e.apply(l,d);e instanceof l.Matrix2D&&a.push(e)}}},this);return a};
var w=new o(0,0,0,0);m.animateStroke=function(b){if(!b.easing)b.easing=j._defaultEasing;var a=new j.Animation(b),c=b.shape,e;k.connect(a,"beforeBegin",a,function(){e=c.getStroke();var d=b.color,a={},f;if(d)a.color=v(d,e,"color",w);if((d=b.style)&&d.values)a.style=new g(d.values);if(d=b.width){var i=d;i.values?f=new g(i.values):(d=i.start?i.start:f=e?e.width:1,i.end?f=i.end:typeof f!="number"&&(f=e?e.width:1),f=new p(d,f));a.width=f}if((d=b.cap)&&d.values)a.cap=new g(d.values);if(d=b.join)if(d.values)a.join=
new g(d.values);else if(f=d.start?d.start:e&&e.join||0,d=d.end?d.end:e&&e.join||0,typeof f=="number"&&typeof d=="number")a.join=new p(f,d);this.curve=new q(a,e)});k.connect(a,"onAnimate",c,"setStroke");return a};m.animateFill=function(b){if(!b.easing)b.easing=j._defaultEasing;var a=new j.Animation(b),c=b.shape,e;k.connect(a,"beforeBegin",a,function(){e=c.getFill();var a=b.color;if(a)this.curve=v(a,e,"",w)});k.connect(a,"onAnimate",c,"setFill");return a};m.animateFont=function(b){if(!b.easing)b.easing=
j._defaultEasing;var a=new j.Animation(b),c=b.shape,e;k.connect(a,"beforeBegin",a,function(){e=c.getFont();var a=b.style,h={},f,i;if(a&&a.values)h.style=new g(a.values);if((a=b.variant)&&a.values)h.variant=new g(a.values);if((a=b.weight)&&a.values)h.weight=new g(a.values);if((a=b.family)&&a.values)h.family=new g(a.values);if((a=b.size)&&a.units)f=parseFloat(a.start?a.start:c.font&&c.font.size||"0"),i=parseFloat(a.end?a.end:c.font&&c.font.size||"0"),h.size=new s(f,i,a.units);this.curve=new q(h,e)});
k.connect(a,"onAnimate",c,"setFont");return a};m.animateTransform=function(b){if(!b.easing)b.easing=j._defaultEasing;var a=new j.Animation(b),c=b.shape,e;k.connect(a,"beforeBegin",a,function(){e=c.getTransform();this.curve=new u(b.transform,e)});k.connect(a,"onAnimate",c,"setTransform");return a};return m});