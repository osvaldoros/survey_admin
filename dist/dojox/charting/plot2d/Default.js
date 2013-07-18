//>>built
define("dojox/charting/plot2d/Default",["dojo/_base/lang","dojo/_base/declare","dojo/_base/array","./Base","./common","dojox/lang/functional","dojox/lang/functional/reversed","dojox/lang/utils","dojox/gfx/fx"],function(t,u,n,B,r,C,D,s,E){var F=D.lambda("item.purgeGroup()");return u("dojox.charting.plot2d.Default",B,{defaultParams:{hAxis:"x",vAxis:"y",lines:!0,areas:!1,markers:!1,tension:"",animate:!1,enableCache:!1},optionalParams:{stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:"",markerStroke:{},
markerOutline:{},markerShadow:{},markerFill:{},markerFont:"",markerFontColor:""},constructor:function(g,c){this.opt=t.clone(this.defaultParams);s.updateWithObject(this.opt,c);s.updateWithPattern(this.opt,c,this.optionalParams);this.series=[];this.hAxis=this.opt.hAxis;this.vAxis=this.opt.vAxis;this.animate=this.opt.animate},createPath:function(g,c,f){var j;this.opt.enableCache&&g._pathFreePool.length>0?(j=g._pathFreePool.pop(),j.setShape(f),c.add(j)):j=c.createPath(f);this.opt.enableCache&&g._pathUsePool.push(j);
return j},render:function(g,c){if(this.zoom&&!this.isDataDirty())return this.performZoom(g,c);this.resetEvents();if(this.dirty=this.isDirty()){n.forEach(this.series,F);this._eventSeries={};this.cleanGroup();this.group.setTransform(null);var f=this.group;C.forEachRev(this.series,function(a){a.cleanGroup(f)})}for(var j=this.chart.theme,p,i,s=this.events(),v=this.series.length-1;v>=0;--v){var a=this.series[v];if(!this.dirty&&!a.dirty)j.skip(),this._reconnectEvents(a.name);else{a.cleanGroup();if(this.opt.enableCache)a._pathFreePool=
(a._pathFreePool?a._pathFreePool:[]).concat(a._pathUsePool?a._pathUsePool:[]),a._pathUsePool=[];if(a.data.length){for(var e=j.next(this.opt.areas?"area":"line",[this.opt,a],!0),f=a.group,k=[],q=[],l=null,d,z=this._hScaler.scaler.getTransformerFromModel(this._hScaler),A=this._vScaler.scaler.getTransformerFromModel(this._vScaler),u=this._eventSeries[a.name]=Array(a.data.length),b=typeof a.data[0]=="number",m=b?Math.min(a.data.length,Math.ceil(this._hScaler.bounds.to)):a.data.length,b=b?Math.max(0,Math.floor(this._hScaler.bounds.from-
1)):0;b<m;b++)a.data[b]!=null?(l||(l=[],q.push(b),k.push(l)),l.push(a.data[b])):l=null;for(var h=0;h<k.length;h++){d=typeof k[h][0]=="number"?n.map(k[h],function(a,e){return{x:z(e+q[h]+1)+c.l,y:g.height-c.b-A(a)}},this):n.map(k[h],function(a){return{x:z(a.x)+c.l,y:g.height-c.b-A(a.y)}},this);l=this.opt.tension?r.curve(d,this.opt.tension):"";if(this.opt.areas&&d.length>1)m=e.series.fill,b=t.clone(d),this.opt.tension?a.dyn.fill=f.createPath(l+" "+("L"+b[b.length-1].x+","+(g.height-c.b)+" L"+b[0].x+
","+(g.height-c.b)+" L"+b[0].x+","+b[0].y)).setFill(m).getFill():(b.push({x:d[d.length-1].x,y:g.height-c.b}),b.push({x:d[0].x,y:g.height-c.b}),b.push(d[0]),a.dyn.fill=f.createPolyline(b).setFill(m).getFill());if(this.opt.lines||this.opt.markers)if(p=e.series.stroke,e.series.outline)i=a.dyn.outline=r.makeStroke(e.series.outline),i.width=2*i.width+p.width;if(this.opt.markers)a.dyn.marker=e.symbol;var w=null,x=null,y=null;if(p&&e.series.shadow&&d.length>1){var o=e.series.shadow,m=n.map(d,function(a){return{x:a.x+
o.dx,y:a.y+o.dy}});if(this.opt.lines)a.dyn.shadow=this.opt.tension?f.createPath(r.curve(m,this.opt.tension)).setStroke(o).getStroke():f.createPolyline(m).setStroke(o).getStroke();if(this.opt.markers&&e.marker.shadow)o=e.marker.shadow,y=n.map(m,function(d){return this.createPath(a,f,"M"+d.x+" "+d.y+" "+e.symbol).setStroke(o).setFill(o.color)},this)}if(this.opt.lines&&d.length>1){if(i)a.dyn.outline=this.opt.tension?f.createPath(l).setStroke(i).getStroke():f.createPolyline(d).setStroke(i).getStroke();
a.dyn.stroke=this.opt.tension?f.createPath(l).setStroke(p).getStroke():f.createPolyline(d).setStroke(p).getStroke()}if(this.opt.markers){w=Array(d.length);x=Array(d.length);i=null;if(e.marker.outline)i=r.makeStroke(e.marker.outline),i.width=2*i.width+(e.marker.stroke?e.marker.stroke.width:0);n.forEach(d,function(d,b){var c="M"+d.x+" "+d.y+" "+e.symbol;i&&(x[b]=this.createPath(a,f,c).setStroke(i));w[b]=this.createPath(a,f,c).setStroke(e.marker.stroke).setFill(e.marker.fill)},this);a.dyn.markerFill=
e.marker.fill;a.dyn.markerStroke=e.marker.stroke;s?n.forEach(w,function(e,b){var c={element:"marker",index:b+q[h],run:a,shape:e,outline:x[b]||null,shadow:y&&y[b]||null,cx:d[b].x,cy:d[b].y};typeof k[h][0]=="number"?(c.x=b+q[h]+1,c.y=k[h][b]):(c.x=k[h][b].x,c.y=k[h][b].y);this._connectEvents(c);u[b+q[h]]=c},this):delete this._eventSeries[a.name]}}a.dirty=!1}else a.dirty=!1,j.skip()}}this.animate&&E.animateTransform(t.delegate({shape:this.group,duration:1200,transform:[{name:"translate",start:[0,g.height-
c.b],end:[0,0]},{name:"scale",start:[1,0],end:[1,1]},{name:"original"}]},this.animate)).play();this.dirty=!1;return this}})});