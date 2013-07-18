//>>built
require({cache:{"url:app/uicomponents/templates/NestedEntriesGrid.html":'<div class="moduleContainer, centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: \'center\'" >   \t\n\n\t<div class="edgePanel">\n\t\t\n\t\t<table data-dojo-type="dgrid.Grid" data-dojo-attach-point="entryGrid" style="height: 300px;"></table>\n\n\t\t<div class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: \'center\'">\n\t\t\t<div class="floatLeft" data-dojo-type="dijit.form.Button" data-dojo-attach-point="removeEntryBtn">Remove Entry</div>\n\t\t\t<div class="floatRight" data-dojo-type="dijit.form.Button" data-dojo-attach-point="editEntryBtn">Edit Entry</div>\n\t\t\t<div class="floatRight" data-dojo-type="dijit.form.Button" data-dojo-attach-point="newEntryBtn">New Entry</div>\n\t\t</div>\n\t</div>\n\n</div>\n'}});
define("app/uicomponents/NestedEntriesGrid",["dojo/_base/declare","dojo/on","dojo/topic","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","app/mixins/StatefulModule","dojo/text!./templates/NestedEntriesGrid.html","dojo/_base/lang","dojo/_base/array","dijit/Dialog","dojo/store/Memory","dojo/parser","dijit/form/Button","dojox/validate","dojox/validate/web","dijit/form/Textarea","dijit/form/TextBox","dijit/form/TimeTextBox","dijit/form/DateTextBox","app/form/FilteringSelect",
"dijit/form/CheckBox","dijit/form/RadioButton","dijit/form/ValidationTextBox","dojox/form/CheckedMultiSelect","dojox/form/BusyButton","app/form/Manager","app/mixins/FormManager","app/store/UIStores","app/store/StoreManager","app/utils/ChangeTracker","app/utils/ArrayUtils","app/mixins/GridManager","app/store/GridFormatters","app/loader/DialogLauncher"],function(e,r,s,h,i,j,f,k,c,l,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,m,n,o,p,g,q){return e("app.uicomponents.NestedEntriesGrid",[h,i,j,f,m],{widgetsInTemplate:!0,
templateString:k,changeTracker:p.getInstance(),uiStores:n.getInstance(),storeManager:o.getInstance(),propertiesToMatchDuplicates:["service","subtest_type","collection_type","sample_type","site_category","lab"],entriesProperty:"entries",storeURL:"",startup:function(){this.inherited(arguments);this.entryGridMgr=new (e([f,q]));this.entryGrid=this.getWidget("entryGrid");this.removeEntryBtn=this.getWidget("removeEntryBtn");this.editEntryBtn=this.getWidget("editEntryBtn");this.newEntryBtn=this.getWidget("newEntryBtn");
this.entryGridMgr.configureGrid({grid:this.entryGrid,rowRenderer:"entryRenderer",store:[],arrayStoreDataChangeCallBack:c.hitch(this,"entryArrayChange"),deleteButton:this.removeEntryBtn,editButton:this.editEntryBtn,addButton:this.newEntryBtn,gridSelectionChangeCallBack:c.hitch(this,"entrySelectionChange"),selectionMode:"single",columns:this.getColumns()});this.setupDialog=this.getSetupDialog();this.entryGridMgr.setupDialog=this.setupDialog},getColumns:function(){return[]},getSetupDialog:function(){return null},
entrySelectionChange:function(){},entryArrayChange:function(a){a=l.indexOf(this.entriesArray,a);a!=-1&&(this.entriesArray.splice(a,1),this.addArrayToGrid(),this.changeTracker.setChange(this.storeURL,this.entriesProperty,this.entriesArray))},onActivate:function(){this.inherited(arguments);if(typeof this.eventHandlers=="undefined")this.eventHandlers=[];this.entryGridMgr.activate();this.loadEntriesFromParentEntity();this.setupDialog.set("parentEntity",this.parentEntity,!0);this.setupDialog.set("entries_component",
this,!0)},executeAfterNavigate:function(){this.loadEntriesFromParentEntity()},loadEntriesFromParentEntity:function(){this.parentEntity=this.getUpdatingEntity();if(typeof this.parentEntity=="undefined"||this.parentEntity==null)this.parentEntity={};this.entriesArray=c.isArray(this.parentEntity[this.entriesProperty])?c.clone(this.parentEntity[this.entriesProperty]):[];this.setupDialog.set("entries",this.addArrayToGrid(),!0)},addArrayToGrid:function(){this.entryMap={};var a=[];if(typeof this.parentEntity==
"object"&&this.parentEntity!=null&&c.isArray(this.entriesArray))for(var b=0;b<this.entriesArray.length;b++){var d=this.entriesArray[b];this.addEntryToMap(d)?(d.__parent_entity={name:this.parentEntity.name,id:this.parentEntity.id},a.push(d)):(console.log("duplicate entry"),console.log(d))}g.addIds(a);this.entryGridMgr.setStore({store:a});this.entryGrid.refresh();return a},addEntryToMap:function(a){var b=this.computedKeyForEntry(a);if(!this.isEntryInMap(a,b))return this.entryMap[b]=a,!0;return!1},computedKeyForEntry:function(a){for(var b=
[],d=0;d<this.propertiesToMatchDuplicates.length;d++){var c=this.propertiesToMatchDuplicates[d];a.hasOwnProperty(c)&&(typeof a[c]=="string"&&a[c]!=""?b.push(a[c]):typeof a[c]=="object"&&b.push(a[c].id))}return b.join("|")},isEntryInMap:function(a,b){typeof b=="undefined"&&(b=this.computedKeyForEntry(a));return this.entryMap.hasOwnProperty(b)},getDuplicate:function(a){var b=this.computedKeyForEntry(a);if(this.isEntryInMap(a,b))return this.entryMap[b];return null},onDeactivate:function(){this.entryGridMgr.deactivate();
for(var a=0;a<this.eventHandlers.length;a++){var b=this.eventHandlers[a];typeof b!="undefined"&&b.remove()}this.eventHandlers=[]},onEntryEntitySaved:function(a){a.__stay_open||this.setupDialog.confirmHide();a.hasOwnProperty("id")?this.entriesArray[a.id]=a:this.entriesArray.push(a);this.addArrayToGrid();this.changeTracker.setChange(this.storeURL,this.entriesProperty,g.cleanEmbeddedArrayForSaving(this.entriesArray,c.hitch(this,"removeEmptyRefs")))},removeEmptyRefs:function(a){var b={},c;for(c in a)a[c]!=
""&&(b[c]=a[c]);return b}})});