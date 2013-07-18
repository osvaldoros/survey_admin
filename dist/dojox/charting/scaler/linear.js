//>>built
define("dojox/charting/scaler/linear",["dojo/_base/lang","./common"],function(o,m){var r=o.getObject("dojox.charting.scaler.linear",!0),k=m.findString,n=m.getNumericLabel,j=function(b,e,a,d,c,f,g){a=o.delegate(a);if(!d){if(a.fixUpper=="major")a.fixUpper="minor";if(a.fixLower=="major")a.fixLower="minor"}if(!c){if(a.fixUpper=="minor")a.fixUpper="micro";if(a.fixLower=="minor")a.fixLower="micro"}if(!f){if(a.fixUpper=="micro")a.fixUpper="none";if(a.fixLower=="micro")a.fixLower="none"}var i=k(a.fixLower,
["major"])?Math.floor(a.min/d)*d:k(a.fixLower,["minor"])?Math.floor(a.min/c)*c:k(a.fixLower,["micro"])?Math.floor(a.min/f)*f:a.min,h=k(a.fixUpper,["major"])?Math.ceil(a.max/d)*d:k(a.fixUpper,["minor"])?Math.ceil(a.max/c)*c:k(a.fixUpper,["micro"])?Math.ceil(a.max/f)*f:a.max;a.useMin&&(b=i);a.useMax&&(e=h);var j=!d||a.useMin&&k(a.fixLower,["major"])?b:Math.ceil(b/d)*d,p=!c||a.useMin&&k(a.fixLower,["major","minor"])?b:Math.ceil(b/c)*c,l=!f||a.useMin&&k(a.fixLower,["major","minor","micro"])?b:Math.ceil(b/
f)*f,m=!d?0:(a.useMax&&k(a.fixUpper,["major"])?Math.round((e-j)/d):Math.floor((e-j)/d))+1,n=!c?0:(a.useMax&&k(a.fixUpper,["major","minor"])?Math.round((e-p)/c):Math.floor((e-p)/c))+1,a=!f?0:(a.useMax&&k(a.fixUpper,["major","minor","micro"])?Math.round((e-l)/f):Math.floor((e-l)/f))+1,s=c?Math.round(d/c):0,t=f?Math.round(c/f):0,u=d?Math.floor(Math.log(d)/Math.LN10):0,v=c?Math.floor(Math.log(c)/Math.LN10):0,q=g/(e-b);isFinite(q)||(q=1);return{bounds:{lower:i,upper:h,from:b,to:e,scale:q,span:g},major:{tick:d,
start:j,count:m,prec:u},minor:{tick:c,start:p,count:n,prec:v},micro:{tick:f,start:l,count:a,prec:0},minorPerMajor:s,microPerMinor:t,scaler:r}};return o.mixin(r,{buildScaler:function(b,e,a,d){var c={fixUpper:"none",fixLower:"none",natural:!1};if(d){if("fixUpper"in d)c.fixUpper=String(d.fixUpper);if("fixLower"in d)c.fixLower=String(d.fixLower);if("natural"in d)c.natural=Boolean(d.natural)}if("min"in d)b=d.min;if("max"in d)e=d.max;d.includeZero&&(b>0&&(b=0),e<0&&(e=0));c.min=b;c.useMin=!0;c.max=e;c.useMax=
!0;if("from"in d)b=d.from,c.useMin=!1;if("to"in d)e=d.to,c.useMax=!1;if(e<=b)return j(b,e,c,0,0,0,a);var f=Math.floor(Math.log(e-b)/Math.LN10),f=d&&"majorTickStep"in d?d.majorTickStep:Math.pow(10,f),g=0,i=0,h;if(d&&"minorTickStep"in d)g=d.minorTickStep;else{do{g=f/10;if(!c.natural||g>0.9)if(h=j(b,e,c,f,g,0,a),h.bounds.scale*h.minor.tick>3)break;g=f/5;if(!c.natural||g>0.9)if(h=j(b,e,c,f,g,0,a),h.bounds.scale*h.minor.tick>3)break;g=f/2;if(!c.natural||g>0.9)if(h=j(b,e,c,f,g,0,a),h.bounds.scale*h.minor.tick>
3)break;return j(b,e,c,f,0,0,a)}while(0)}if(d&&"microTickStep"in d)i=d.microTickStep,h=j(b,e,c,f,g,i,a);else{do{i=g/10;if(!c.natural||i>0.9)if(h=j(b,e,c,f,g,i,a),h.bounds.scale*h.micro.tick>3)break;i=g/5;if(!c.natural||i>0.9)if(h=j(b,e,c,f,g,i,a),h.bounds.scale*h.micro.tick>3)break;i=g/2;if(!c.natural||i>0.9)if(h=j(b,e,c,f,g,i,a),h.bounds.scale*h.micro.tick>3)break;i=0}while(0)}return i?h:j(b,e,c,f,g,0,a)},buildTicks:function(b,e){var a,d,c,f=b.major.start,g=b.minor.start,i=b.micro.start;if(e.microTicks&&
b.micro.tick)a=b.micro.tick,d=i;else if(e.minorTicks&&b.minor.tick)a=b.minor.tick,d=g;else if(b.major.tick)a=b.major.tick,d=f;else return null;var h=1/b.bounds.scale;if(b.bounds.to<=b.bounds.from||isNaN(h)||!isFinite(h)||a<=0||isNaN(a)||!isFinite(a))return null;for(var j=[],k=[],l=[];d<=b.bounds.to+h;){if(Math.abs(f-d)<a/2){c={value:f};if(e.majorLabels)c.label=n(f,b.major.prec,e);j.push(c);f+=b.major.tick;g+=b.minor.tick}else if(Math.abs(g-d)<a/2){if(e.minorTicks){c={value:g};if(e.minorLabels&&b.minMinorStep<=
b.minor.tick*b.bounds.scale)c.label=n(g,b.minor.prec,e);k.push(c)}g+=b.minor.tick}else e.microTicks&&l.push({value:i});i+=b.micro.tick;d+=a}return{major:j,minor:k,micro:l}},getTransformerFromModel:function(b){var e=b.bounds.from,a=b.bounds.scale;return function(b){return(b-e)*a}},getTransformerFromPlot:function(b){var e=b.bounds.from,a=b.bounds.scale;return function(b){return b/a+e}}})});