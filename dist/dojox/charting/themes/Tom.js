//>>built
define("dojox/charting/themes/Tom",["../Theme","dojox/gfx/gradutils","./common"],function(d,h,g){var e=d.generateGradient,f={type:"linear",space:"shape",x1:0,y1:0,x2:0,y2:100};g.Tom=new d({chart:{fill:"#181818",stroke:{color:"#181818"},pageStyle:{backgroundColor:"#181818",backgroundImage:"none",color:"#eaf2cb"}},plotarea:{fill:"#181818"},axis:{stroke:{color:"#a0a68b",width:1},tick:{color:"#888c76",position:"center",font:"normal normal normal 7pt Helvetica, Arial, sans-serif",fontColor:"#888c76"}},
series:{stroke:{width:2.5,color:"#eaf2cb"},outline:null,font:"normal normal normal 8pt Helvetica, Arial, sans-serif",fontColor:"#eaf2cb"},marker:{stroke:{width:1.25,color:"#eaf2cb"},outline:{width:1.25,color:"#eaf2cb"},font:"normal normal normal 8pt Helvetica, Arial, sans-serif",fontColor:"#eaf2cb"},seriesThemes:[{fill:e(f,"#bf9e0a","#ecc20c")},{fill:e(f,"#73b086","#95e5af")},{fill:e(f,"#c7212d","#ed2835")},{fill:e(f,"#87ab41","#b6e557")},{fill:e(f,"#b86c25","#d37d2a")}],markerThemes:[{fill:"#bf9e0a",
stroke:{color:"#ecc20c"}},{fill:"#73b086",stroke:{color:"#95e5af"}},{fill:"#c7212d",stroke:{color:"#ed2835"}},{fill:"#87ab41",stroke:{color:"#b6e557"}},{fill:"#b86c25",stroke:{color:"#d37d2a"}}]});g.Tom.next=function(a){var b=a=="line";if(b||a=="area"){var c=this.seriesThemes[this._current%this.seriesThemes.length];c.fill.space="plot";if(b)c.stroke={width:4,color:c.fill.colors[0].color};b=d.prototype.next.apply(this,arguments);delete c.outline;delete c.stroke;c.fill.space="shape";return b}return d.prototype.next.apply(this,
arguments)};g.Tom.post=function(a,b){a=d.prototype.post.apply(this,arguments);if((b=="slice"||b=="circle")&&a.series.fill&&a.series.fill.type=="radial")a.series.fill=h.reverse(a.series.fill);return a};return g.Tom});