//>>built
define("dgrid/extensions/ColumnResizer",["dojo/_base/declare","dojo/on","dojo/query","dojo/_base/lang","dojo/dom","dojo/dom-geometry","dojo/has","../util/misc","put-selector/put","dojo/_base/html","xstyle/css!../css/extensions/ColumnResizer.css"],function(v,j,k,w,t,x,l,y,h){function u(b){for(var a=b.length,c=a,d=b[0].length,f=Array(a);a--;)f[a]=Array(d);for(var g={},a=0;a<c;a++)for(var m=f[a],k=b[a],i=0,l=0;i<d;i++){var e=k[l],n;if(typeof m[i]=="undefined"){m[i]=e.id;if(e.rowSpan&&e.rowSpan>1){n=
f;for(var h=e.rowSpan,j=a,q=i,r=e.id,o=1;o<h;o++)n[j+o][q]=r}if(a>0&&e.colSpan&&e.colSpan>1)for(n=1;n<e.colSpan;n++)if(m[++i]=e.id,e.rowSpan&&e.rowSpan>1)for(var h=f,j=e.rowSpan,q=a,r=i,o=e.id,s=1;s<j;s++)h[q+s][r]=o;g[e.id]=b[0][i].id;l++}}return g}var z=l("touch")&&webkitConvertPointFromNodeToPage;return v([],{resizeNode:null,minWidth:40,gridWidth:null,_resizedColumns:!1,resizeColumnWidth:function(b,a){if(!(a<=0)){var c=this._columnStyles[b],d=this.styleColumn(b,"width: "+a+"px;");c&&c.remove();
this._columnStyles[b]=d}},configStructure:function(){this._resizedColumns=!1;for(var b in this._columnStyles)this._columnStyles[b].remove();this._columnStyles={};this.inherited(arguments)},renderHeader:function(){this.inherited(arguments);var b=this;b.gridWidth=b.headerNode.clientWidth-1;var a;if(this.columnSets&&this.columnSets.length)for(var c=this.columnSets.length;c--;)a=w.mixin(a||{},u(this.columnSets[c]));else this.subRows&&this.subRows.length>1&&(a=u(this.subRows));for(var c=k(".dgrid-cell",
b.headerNode),d=c.length;d--;){var f=c[d],g=f.columnId,m=f.childNodes;if(b.columns[g]){var p=h("div.dgrid-resize-header-container");for(f.contents=p;m.length>0;)h(p,m[0]);h(f,p,"div.dgrid-resize-handle.resizeNode-"+g).columnId=a?a[g]:g}}if(!b.mouseMoveListen)j(b.headerNode,".dgrid-resize-handle:mousedown"+(l("touch")?",.dgrid-resize-handle:touchstart":""),function(a){b._resizeMouseDown(a,this);b.mouseMoveListen.resume();b.mouseUpListen.resume()}),b.mouseMoveListen=j.pausable(document.body,"mousemove"+
(l("touch")?",touchmove":""),y.throttleDelayed(function(a){b._updateResizerPosition(a)})),b.mouseUpListen=j.pausable(document.body,"mouseup"+(l("touch")?",touchend":""),function(a){b._resizeMouseUp(a);b.mouseMoveListen.pause();b.mouseUpListen.pause()}),b.mouseMoveListen.pause(),b.mouseUpListen.pause()},_resizeMouseDown:function(b,a){b.preventDefault();t.setSelectable(this.domNode,!1);this._startX=this._getResizeMouseLocation(b);this._gridX=z?webkitConvertPointFromNodeToPage(this.bodyNode,new WebKitPoint(0,
0)).x:x.position(this.bodyNode).x;this._targetCell=k(".dgrid-column-"+a.columnId,this.headerNode)[0];if(!this._resizer)this._resizer=h(this.domNode,"div.dgrid-column-resizer");this._resizer.style.display="block";this._updateResizerPosition(b)},_resizeMouseUp:function(b){this._readyToResize=!1;if(!this._resizedColumns){var a=k(".dgrid-cell",this.headerNode);this.columnSets&&this.columnSets.length?a=a.filter(function(a){return a.columnId.split("-")[0]=="0"}):this.subRows&&this.subRows.length>1&&(a=
a.filter(function(a){return a.columnId.charAt(0)=="0"}));a.forEach(function(a){this.resizeColumnWidth(a.columnId,a.offsetWidth)},this);this._resizedColumns=!0}t.setSelectable(this.domNode,!0);var a=this._targetCell,b=this._getResizeMouseLocation(b)-this._startX,c=a.offsetWidth+b,d=this._getResizedColumnWidths(),f=d.totalWidth,d=d.lastColId,g=k(".dgrid-column-"+d,this.headerNode)[0].offsetWidth;a.columnId!=d&&(f+b<this.gridWidth?this.styleColumn(d,"width: auto;"):g-b<=this.minWidth&&this.resizeColumnWidth(d,
this.minWidth));if(c<this.minWidth)c=this.minWidth;this.resizeColumnWidth(a.columnId,c);this.resize();this._hideResizer()},_updateResizerPosition:function(b){var b=this._getResizeMouseLocation(b),a=this._targetCell,c=b-this._gridX;a.offsetWidth+(b-this._startX)<this.minWidth&&(c=this._startX-this._gridX-(a.offsetWidth-this.minWidth));this._resizer.style.left=c+"px"},_hideResizer:function(){this._resizer.style.display="none"},_getResizeMouseLocation:function(b){var a=0;b.pageX?a=b.pageX:b.clientX&&
(a=b.clientX+document.body.scrollLeft+document.documentElement.scrollLeft);return a},_getResizedColumnWidths:function(){var b=0,a=k(".dgrid-cell",this.headerNode);this.columnSets&&this.columnSets.length?a=a.filter(function(a){return a.columnId.split("-")[1]=="0"}):this.subRows&&this.subRows.length>1&&(a=a.filter(function(a){return a.columnId.charAt(0)=="0"}));var c=a.length;if(!c)return{};for(var d=a[c-1].columnId;c--;)b+=a[c].offsetWidth;return{totalWidth:b,lastColId:d}}})});