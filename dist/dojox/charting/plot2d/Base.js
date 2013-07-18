//>>built
define("dojox/charting/plot2d/Base",["dojo/_base/lang","dojo/_base/declare","dojo/_base/connect","../Element","./_PlotEvents","dojo/_base/array","../scaler/primitive","./common","dojox/gfx/fx"],function(k,m,n,o,p,q,l,r,s){return m("dojox.charting.plot2d.Base",[o,p],{constructor:function(){this.zoom=null;this.zoomQueue=[];this.lastWindow={vscale:1,hscale:1,xoffset:0,yoffset:0}},clear:function(){this.series=[];this._vAxis=this._hAxis=null;this.dirty=!0;return this},setAxis:function(a){a&&(this[a.vertical?
"_vAxis":"_hAxis"]=a);return this},toPage:function(a){var c=this._hAxis,f=this._vAxis,b=c.getScaler(),d=f.getScaler(),e=b.scaler.getTransformerFromModel(b),g=d.scaler.getTransformerFromModel(d),h=this.chart.getCoords(),i=this.chart.offsets,j=this.chart.dim,b=function(a){var b={};b.x=e(a[c.name])+h.x+i.l;b.y=h.y+j.height-i.b-g(a[f.name]);return b};return a?b(a):b},toData:function(a){var c=this._hAxis,f=this._vAxis,b=c.getScaler(),d=f.getScaler(),e=b.scaler.getTransformerFromPlot(b),g=d.scaler.getTransformerFromPlot(d),
h=this.chart.getCoords(),i=this.chart.offsets,j=this.chart.dim,b=function(a){var b={};b[c.name]=e(a.x-h.x-i.l);b[f.name]=g(h.y+j.height-a.y-i.b);return b};return a?b(a):b},addSeries:function(a){this.series.push(a);return this},getSeriesStats:function(){return r.collectSimpleStats(this.series)},calculateAxes:function(a){this.initializeScalers(a,this.getSeriesStats());return this},isDirty:function(){return this.dirty||this._hAxis&&this._hAxis.dirty||this._vAxis&&this._vAxis.dirty},isDataDirty:function(){return q.some(this.series,
function(a){return a.dirty})},performZoom:function(a,c){var f=this._vAxis.scale||1,b=this._hAxis.scale||1,d=this._hScaler.bounds,d=(d.from-d.lower)*d.scale,e=this._vScaler.bounds,e=(e.from-e.lower)*e.scale,g=f/this.lastWindow.vscale,h=b/this.lastWindow.hscale,g=s.animateTransform(k.delegate({shape:this.group,duration:1200,transform:[{name:"translate",start:[0,0],end:[c.l*(1-h),(a.height-c.b)*(1-g)]},{name:"scale",start:[1,1],end:[h,g]},{name:"original"},{name:"translate",start:[0,0],end:[(this.lastWindow.xoffset-
d)/(this.lastWindow.hscale==1?b:this.lastWindow.hscale),(e-this.lastWindow.yoffset)/(this.lastWindow.vscale==1?f:this.lastWindow.vscale)]}]},this.zoom));k.mixin(this.lastWindow,{vscale:f,hscale:b,xoffset:d,yoffset:e});this.zoomQueue.push(g);n.connect(g,"onEnd",this,function(){this.zoom=null;this.zoomQueue.shift();this.zoomQueue.length>0&&this.zoomQueue[0].play()});this.zoomQueue.length==1&&this.zoomQueue[0].play();return this},render:function(){return this},getRequiredColors:function(){return this.series.length},
initializeScalers:function(a,c){this._hAxis?(this._hAxis.initialized()||this._hAxis.calculate(c.hmin,c.hmax,a.width),this._hScaler=this._hAxis.getScaler()):this._hScaler=l.buildScaler(c.hmin,c.hmax,a.width);this._vAxis?(this._vAxis.initialized()||this._vAxis.calculate(c.vmin,c.vmax,a.height),this._vScaler=this._vAxis.getScaler()):this._vScaler=l.buildScaler(c.vmin,c.vmax,a.height);return this}})});