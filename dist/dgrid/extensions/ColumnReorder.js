//>>built
define("dgrid/extensions/ColumnReorder",["dojo/_base/lang","dojo/_base/declare","dojo/_base/array","dojo/query","dojo/dnd/Source","put-selector/put","xstyle/css!../css/extensions/ColumnReorder.css"],function(d,a,e,i,g,h){d=a(g,{copyState:function(){return!1},checkAcceptance:function(c){return c==this},_legalMouseDown:function(c){return c.target.className.indexOf("dgrid-resize-handle")>-1?!1:this.inherited(arguments)},onDropInternal:function(c){var f=this.grid,b=f.get("columns"),a=[];this.inherited(arguments);
setTimeout(function(){e.forEach(c[0].parentNode.childNodes,function(c){a.push(b[c.columnId])});f.set("subRows",[a])},0)}});a=a([],{columnDndConstructor:d,renderHeader:function(){this.columnDndSource&&this.columnDndSource.destroy();this.inherited(arguments);var c=this._columnDndType="dgrid-"+this.id+"-column",a;if(this.subRows.length==1&&!this.columnSets)e.forEach(this.subRows[0],function(b){if(b.reorderable!==!1){b=b.headerNode;if(b.tagName!="TH")b=b.parentNode;h(b,".dojoDndItem[dndType="+c+"]");
if(!a)a=b.parentNode}}),a?this.columnDndSource=new this.columnDndConstructor(a,{horizontal:!0,grid:this}):delete this.columnDndSource}});a.ColumnDndSource=d;return a});