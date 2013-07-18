//>>built
define(["dijit","dojo","dojox","dojo/require!dojox/grid/DataGrid,dojox/data/ItemExplorer,dijit/layout/BorderContainer,dijit/layout/ContentPane"],function(j,d,l){d.provide("dojox.data.StoreExplorer");d.require("dojox.grid.DataGrid");d.require("dojox.data.ItemExplorer");d.require("dijit.layout.BorderContainer");d.require("dijit.layout.ContentPane");d.declare("dojox.data.StoreExplorer",j.layout.BorderContainer,{constructor:function(a){d.mixin(this,a)},store:null,columnWidth:"",stringQueries:!1,showAllColumns:!1,
postCreate:function(){function a(e,a){var b=new j.form.Button({label:e});m.containerNode.appendChild(b.domNode);b.onClick=a;return b}var b=this;this.inherited(arguments);var m=(new j.layout.ContentPane({region:"top"})).placeAt(this),g=m.containerNode.appendChild(document.createElement("span"));g.innerHTML="Enter query: &nbsp;";g.id="queryText";var k=m.containerNode.appendChild(document.createElement("input"));k.type="text";k.id="queryTextBox";a("Query",function(){var e=k.value;b.setQuery(b.stringQueries?
e:d.fromJson(e))});m.containerNode.appendChild(document.createElement("span")).innerHTML="&nbsp;&nbsp;&nbsp;";var o=a("Create New",d.hitch(this,"createNew")),f=a("Delete",function(){for(var e=c.selection.getSelected(),a=0;a<e.length;a++)b.store.deleteItem(e[a])});this.setItemName=function(a){o.attr("label","<img style='width:12px; height:12px' src='"+d.moduleUrl("dijit.themes.tundra.images","dndCopy.png")+"' /> Create New "+a);f.attr("label","Delete "+a)};a("Save",function(){b.store.save({onError:function(a){alert(a)}});
b.tree.refreshItem()});a("Revert",function(){b.store.revert()});a("Add Column",function(){var a=prompt("Enter column name:","property");a&&(b.gridLayout.push({field:a,name:a,formatter:d.hitch(b,"_formatCell"),editable:!0}),b.grid.attr("structure",b.gridLayout))});var g=(new j.layout.ContentPane({region:"center"})).placeAt(this),c=this.grid=new l.grid.DataGrid({store:this.store});g.attr("content",c);c.canEdit=function(a,b){var c=this._copyAttr(b,a.field);return!(c&&typeof c=="object")||c instanceof
Date};var g=(new j.layout.ContentPane({region:"trailing",splitter:!0,style:"width: 300px"})).placeAt(this),h=this.tree=new l.data.ItemExplorer({store:this.store});g.attr("content",h);d.connect(c,"onCellClick",function(){var a=c.selection.getSelected()[0];h.setItem(a)});this.gridOnFetchComplete=c._onFetchComplete;this.setStore(this.store)},setQuery:function(a,b){this.grid.setQuery(a,b)},_formatCell:function(a){if(this.store.isItem(a))return this.store.getLabel(a)||this.store.getIdentity(a);return a},
setStore:function(a){function b(a){return d._formatCell(a)}this.store=a;var d=this,g=this.grid;g._pending_requests[0]=!1;var k=this.gridOnFetchComplete;g._onFetchComplete=function(j){var f=d.gridLayout=[],c,h,e,i,l;c=a.getIdentityAttributes();for(e=0;e<c.length;e++)h=c[e],f.push({field:h,name:h,_score:100,formatter:b,editable:!1});for(e=0;h=j[e++];){var p=a.getAttributes(h);for(l=0;h=p[l++];){var n=!1;for(i=0;c=f[i++];)if(c.field==h){c._score++;n=!0;break}n||f.push({field:h,name:h,_score:1,formatter:b,
styles:"white-space:nowrap; ",editable:!0})}}f=f.sort(function(a,b){return b._score-a._score});if(!d.showAllColumns)for(i=0;c=f[i];i++)if(c._score<j.length/40*i){f.splice(i,f.length-i);break}for(i=0;c=f[i++];)c.width=d.columnWidth||Math.round(100/f.length)+"%";g._onFetchComplete=k;g.attr("structure",f);k.apply(this,arguments)};g.setStore(a);this.queryOptions={cache:!0};this.tree.setStore(a)},createNew:function(){var a=prompt("Enter any properties (in JSON literal form) to put in the new item (passed to the newItem constructor):",
"{ }");if(a)try{this.store.newItem(d.fromJson(a))}catch(b){alert(b)}}})});