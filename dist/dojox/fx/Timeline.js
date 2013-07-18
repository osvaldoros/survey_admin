//>>built
define("dojox/fx/Timeline",["dojo/_base/lang","dojo/fx/easing","dojo/_base/fx","dojo/dom","./_base","dojo/_base/connect","dojo/_base/html","dojo/_base/array","dojo/_base/Color"],function(p,k,q,r,m,o,s,t,n){m.animateTimeline=function(d,i){var f=new l(d.keys),a=q.animateProperty({node:r.byId(i||d.node),duration:d.duration||1E3,properties:f._properties,easing:k.linear,onAnimate:function(){}});o.connect(a,"onEnd",function(c){var e=a.curve.getValue(a.reversed?0:1);s.style(c,e)});o.connect(a,"beforeBegin",
function(){a.curve&&delete a.curve;a.curve=f;f.ani=a});return a};var l=function(d){this.keys=p.isArray(d)?this.flatten(d):d};l.prototype.flatten=function(d){var i=function(a,e){if(a=="from")return 0;if(a=="to")return 1;if(a===void 0)return e==0?0:e/(d.length-1);return parseInt(a,10)*0.01},f={},a={};t.forEach(d,function(c,e){var d=i(c.step,e),h=k[c.ease]||k.linear,b;for(b in c)if(!(b=="step"||b=="ease"||b=="from"||b=="to")){if(!a[b])a[b]={steps:[],values:[],eases:[],ease:h},f[b]={},f[b].units=/#/.test(c[b])?
a[b].units="isColor":a[b].units=/\D{1,}/.exec(c[b]).join("");a[b].eases.push(k[c.ease||"linear"]);a[b].steps.push(d);f[b].units=="isColor"?a[b].values.push(new n(c[b])):a[b].values.push(parseInt(/\d{1,}/.exec(c[b]).join("")));f[b].start===void 0?f[b].start=a[b].values[a[b].values.length-1]:f[b].end=a[b].values[a[b].values.length-1]}});this._properties=f;return a};l.prototype.getValue=function(d){var d=this.ani._reversed?1-d:d,i={},f=this,a=function(a,b){return f._properties[a].units!="isColor"?f.keys[a].values[b]+
f._properties[a].units:f.keys[a].values[b].toCss()},c;for(c in this.keys)for(var e=this.keys[c],g=0;g<e.steps.length;g++){var h=e.steps[g],b=e.steps[g+1],j=g<e.steps.length?!0:!1,k=e.eases[g]||function(a){return a};if(d==h){if(i[c]=a(c,g),!j||j&&this.ani._reversed)break}else if(d>h)if(j&&d<e.steps[g+1]){j=e.values[g+1];e=e.values[g];h=1/(b-h)*(d-h);h=k(h);i[c]=e instanceof n?n.blendColors(e,j,h).toCss(!1):e+h*(j-e)+this._properties[c].units;break}else i[c]=a(c,g);else if(j&&!this.ani._reversed||!j&&
this.ani._reversed)i[c]=a(c,g)}return i};m._Timeline=l;return m});