//>>built
define("dojox/layout/TableContainer",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/_base/array","dojo/dom-prop","dojo/dom-style","dijit/_WidgetBase","dijit/layout/_LayoutWidget"],function(d,i,s,l,c,f,p,t,u,v){d.experimental("dojox.layout.TableContainer");d=s("dojox.layout.TableContainer",v,{cols:1,labelWidth:"100",showLabels:!0,orientation:"horiz",spacing:1,customClass:"",postCreate:function(){this.inherited(arguments);this._children=[];this.connect(this,
"set",function(a,j){j&&(a=="orientation"||a=="customClass"||a=="cols")&&this.layout()})},startup:function(){if(!this._started&&(this.inherited(arguments),!this._initialized)){var a=this.getChildren();if(!(a.length<1))this._initialized=!0,l.add(this.domNode,"dijitTableLayout"),f.forEach(a,function(a){!a.started&&!a._started&&a.startup()}),this.resize(),this.layout()}},resize:function(){f.forEach(this.getChildren(),function(a){typeof a.resize=="function"&&a.resize()})},layout:function(){function a(a,
c,e){if(q.customClass!=""){var b=q.customClass+"-"+(c||a.tagName.toLowerCase());l.add(a,b);arguments.length>2&&l.add(a,b+"-"+e)}}if(this._initialized){var j=this.getChildren(),d={},q=this;f.forEach(this._children,i.hitch(this,function(a){d[a.id]=a}));f.forEach(j,i.hitch(this,function(a){d[a.id]||this._children.push(a)}));var m=c.create("table",{width:"100%","class":"tableContainer-table tableContainer-table-"+this.orientation,cellspacing:this.spacing},this.domNode),h=c.create("tbody");m.appendChild(h);
a(m,"table",this.orientation);var k=c.create("tr",{},h),r=!this.showLabels||this.orientation=="horiz"?k:c.create("tr",{},h),n=this.cols*(this.showLabels?2:1),o=0;f.forEach(this._children,i.hitch(this,function(g,f){var e=g.colspan||1;e>1&&(e=this.showLabels?Math.min(n-1,e*2-1):Math.min(n,e));if(o+e-1+(this.showLabels?1:0)>=n)o=0,k=c.create("tr",{},h),r=this.orientation=="horiz"?k:c.create("tr",{},h);var b;if(this.showLabels)if(b=c.create("td",{"class":"tableContainer-labelCell"},k),g.spanLabel)p.set(b,
this.orientation=="vert"?"rowspan":"colspan",2);else{a(b,"labelCell");var d={"for":g.get("id")},d=c.create("label",d,b);if(Number(this.labelWidth)>-1||String(this.labelWidth).indexOf("%")>-1)t.set(b,"width",String(this.labelWidth).indexOf("%")<0?this.labelWidth+"px":this.labelWidth);d.innerHTML=g.get("label")||g.get("title")}b=g.spanLabel&&b?b:c.create("td",{"class":"tableContainer-valueCell"},r);e>1&&p.set(b,"colspan",e);a(b,"valueCell",f);b.appendChild(g.domNode);o+=e+(this.showLabels?1:0)}));this.table&&
this.table.parentNode.removeChild(this.table);f.forEach(j,function(a){typeof a.layout=="function"&&a.layout()});this.table=m;this.resize()}},destroyDescendants:function(a){f.forEach(this._children,function(c){c.destroyRecursive(a)})},_setSpacingAttr:function(a){this.spacing=a;if(this.table)this.table.cellspacing=Number(a)}});i.extend(u,{label:"",title:"",spanLabel:!1,colspan:1});return d});