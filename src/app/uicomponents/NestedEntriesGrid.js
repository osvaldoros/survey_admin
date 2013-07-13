define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/topic",
	"dijit/_WidgetBase", 
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",
	"dojo/text!./templates/NestedEntriesGrid.html", // this is what includes the html template
	"dojo/_base/lang",
	"dojo/_base/array",
	"dijit/Dialog",
	
	"dojo/store/Memory", 
	"dojo/parser", 
	"dijit/form/Button",
	
	"dojox/validate",
	"dojox/validate/web",
	"dijit/form/Textarea",
	"dijit/form/TextBox",
	"dijit/form/TimeTextBox",
	"dijit/form/DateTextBox",
	"app/form/FilteringSelect",
	"dijit/form/CheckBox",
	"dijit/form/RadioButton",
	"dijit/form/ValidationTextBox",
	
	"dojox/form/CheckedMultiSelect",
	"dojox/form/BusyButton",
	"app/form/Manager",
	"app/mixins/FormManager",	
	"app/store/UIStores",
	"app/store/StoreManager",
	"app/utils/ChangeTracker",
	"app/utils/ArrayUtils",
	"app/mixins/GridManager",
	"app/store/GridFormatters",
	"app/loader/DialogLauncher"
	
	
	],
	function(declare, on, topic, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, template, lang, baseArray, Dialog, Memory, parser, Button,
			Validate, ValidateWeb, Textarea, TextBox, TimeTextBox, DateTextBox, FilteringSelect, CheckBox, RadioButton, ValidationTextBox, 
			CheckedMultiSelect, BusyButton, Manager, DCFormManager, UIStores, StoreManager, ChangeTracker, ArrayUtils, GridManager,GridFormatters,DialogLauncher){
	
	
	return declare("app.uicomponents.NestedEntriesGrid", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, DCFormManager], {

			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!
			changeTracker: ChangeTracker.getInstance(),
			uiStores: UIStores.getInstance(),
			storeManager: StoreManager.getInstance(),
			propertiesToMatchDuplicates:[
      			"service",
      			"subtest_type",
      			"collection_type",
      			"sample_type",
      			"site_category",
      			"lab"
      		],
      		entriesProperty:"entries",
      		storeURL: "", // storeURL of the parentEntity where the entries are embedded

			/**
			 * 
			 * startup is called by the framework as part of the livecycle of all widgets, it happens after the children widgets have been created and are ready to be used
			 * Notice we don't use postCreate because the child widgets haven't been created yet, and we need to wait for the dgrid to attach the store to it
			 * 
			 */
			startup:function(){
				this.inherited(arguments);				
				// get a reference to the form and set the storeURL on it ( the store to which this form would commit data )				
				var PortableGridManager = declare([StatefulModule, GridManager]);
		
				this.entryGridMgr = new PortableGridManager();

				this.entryGrid = this.getWidget('entryGrid');
				this.removeEntryBtn = this.getWidget('removeEntryBtn');
				this.editEntryBtn = this.getWidget('editEntryBtn');
				this.newEntryBtn = this.getWidget('newEntryBtn');
				
				var entryConfig ={
					grid:this.entryGrid,
					rowRenderer:"entryRenderer",
					store:[], 
					arrayStoreDataChangeCallBack: lang.hitch(this, "entryArrayChange"),
					deleteButton:this.removeEntryBtn,
					editButton:this.editEntryBtn,
					addButton: this.newEntryBtn,
					gridSelectionChangeCallBack: lang.hitch(this, "entrySelectionChange"),
					selectionMode: "single",
					columns: this.getColumns()
				}	

				this.entryGridMgr.configureGrid(entryConfig);									
        		this.setupDialog = this.getSetupDialog();
				this.entryGridMgr.setupDialog = this.setupDialog;
			},

			/*
			*
			* override me!
			*
			*/
			getColumns:function(){
				return [];
			},

			/*
			*
			* override me!
			*
			*/
			getSetupDialog:function(){
				return null
			},
			entrySelectionChange:function(entry){
			},

			
			entryArrayChange:function(object, removedFrom, insertedInto){
				var removedIndex = baseArray.indexOf(this.entriesArray, object);
				if(removedIndex != -1){
					this.entriesArray.splice(removedIndex, 1)
					this.addArrayToGrid();
					this.changeTracker.setChange(this.storeURL, this.entriesProperty, this.entriesArray);
				}
			},

			onActivate:function(){
    			this.inherited(arguments);	
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}	    			

				this.entryGridMgr.activate();

				this.loadEntriesFromParentEntity();

				this.setupDialog.set("parentEntity", this.parentEntity, true);
				this.setupDialog.set("entries_component", this, true);

			},

			executeAfterNavigate:function(){
				this.loadEntriesFromParentEntity();
			},


			loadEntriesFromParentEntity:function(){
				this.parentEntity = this.getUpdatingEntity();
				if(typeof(this.parentEntity) == "undefined" || this.parentEntity == null){
					this.parentEntity = {};
				}
				this.entriesArray =  (lang.isArray(this.parentEntity[this.entriesProperty])) ? lang.clone(this.parentEntity[this.entriesProperty]) : [];
				
				var entryArray = this.addArrayToGrid(); 
				this.setupDialog.set("entries", entryArray, true);
			},

			addArrayToGrid:function(){

				this.entryMap = {};
				var entryArray = [];
				if(typeof(this.parentEntity) == "object" && this.parentEntity != null){
					if(lang.isArray(this.entriesArray)){
						for (var f=0; f<this.entriesArray.length; f++) {
							var entry = this.entriesArray[f];
							if(this.addEntryToMap(entry)){
								entry.__parent_entity = {name:this.parentEntity.name, id:this.parentEntity.id};
								entryArray.push(entry);
							}else{
								console.log("duplicate entry");
								console.log(entry)
							}
						}
					}					
				}

				ArrayUtils.addIds(entryArray);

				var entryStoreConfig ={
					store:entryArray
				}	
				this.entryGridMgr.setStore(entryStoreConfig)					
				this.entryGrid.refresh();

				return entryArray;
			},

			addEntryToMap:function(entry){
				var key = this.computedKeyForEntry(entry);
				var entityInMap = this.isEntryInMap(entry, key);
				if(!entityInMap){
					this.entryMap[key] = entry;
					return true
				}

				return false;
			},

			computedKeyForEntry:function(entry){
				var entryKeyArray = [];
				for (var i = 0; i < this.propertiesToMatchDuplicates.length; i++) {
					var propName = this.propertiesToMatchDuplicates[i];
					if(entry.hasOwnProperty(propName)){
						if(typeof(entry[propName]) == "string" && entry[propName] != ""){
							entryKeyArray.push( entry[propName] );
						}else if(typeof(entry[propName]) == "object"){
							entryKeyArray.push( entry[propName].id );
						}
					}
				};
				var key = entryKeyArray.join("|");
				return key;
			},

			isEntryInMap:function(entry, key){
				if(typeof(key) == "undefined") var key = this.computedKeyForEntry(entry);
				var exists = this.entryMap.hasOwnProperty(key);
				return exists;
			},

			getDuplicate:function(entry){
				var key = this.computedKeyForEntry(entry);
				var entityInMap = this.isEntryInMap(entry, key);
				if(entityInMap){
					return this.entryMap[key];
				}
				return null;

			},
			
			onDeactivate:function(){
				
				this.entryGridMgr.deactivate();
				
				//remove event handlers
				for (var i=0; i < this.eventHandlers.length; i++) {
					var thisHandler = this.eventHandlers[i];
					if(typeof(thisHandler) != 'undefined'){
						thisHandler.remove();
					}
				};
				
				this.eventHandlers = []				
			},
			
			onEntryEntitySaved:function(entry) {
				if(!entry.__stay_open){
					this.setupDialog.confirmHide();
				}

				if(!entry.hasOwnProperty("id")){
					var newEntry = entry;
					this.entriesArray.push(newEntry)
				}else{
					this.entriesArray[entry.id] = entry;
				}

				this.addArrayToGrid();
				this.changeTracker.setChange(this.storeURL, this.entriesProperty, ArrayUtils.cleanEmbeddedArrayForSaving(this.entriesArray, lang.hitch(this, "removeEmptyRefs") ));
			},

			removeEmptyRefs:function(obj){
				var newObj = {};

				for(var p in obj){
					if(obj[p] != ""){
						newObj[p] = obj[p];
					}
				}

				return newObj;
			}
			
		});
});
