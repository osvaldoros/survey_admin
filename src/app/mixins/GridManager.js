/*
 * 
 * This mixin provides typical facilities for handling grids of stuff to avoid repeating a lot of code everywhere that grids are used
 * 
 * Usage:
 * 
 * At the end of startup ( once references to the different components needed ) call configureGrid and pass those references in.
 * 
 * This will automatically listen in to onActivate events and wire stuff up for you. It performs the following tasks:
 * 
 * 		- monitors grid selection and enable/disable edit and delete buttons respectively
 * 		- monitors searchFld 'enter' events and sets the value as a query in the grid/store
 * 		- full deletion process with integrated confirm dialog
 * 		- double click on grid AND clicking the edit button will result in this component calling 'editEntity' in the host component
 * 			- You implement editEntity like:  getEntity:function(myEntity){ this.myEditMethod(myEntity)};
 * 
 * This component does not wire the add/new button since this will vary tremendously and is not much that can be abstracted
 * 		
 * 
 */
define([
	"dojo/_base/declare",
	"dojo/on",	
	"dojo/dom-attr",
	"dojo/aspect",
	"dojo/_base/lang",
	"dojo/topic",
	"dojo/store/JsonRest", // used to compare via isInstanceOf to figure out if the store is async
	"app/store/StoreManager",
	"app/utils/ChangeTracker",
	"app/utils/HashManager",
	"app/store/GridFormatters"
	],
	function(declare, on, domAttr, aspect, lang, topic, JsonRest, StoreManager, ChangeTracker, HashManager, GridFormatters){
	
	return declare([], {
			storeManager:StoreManager.getInstance(),
			changeTracker:ChangeTracker.getInstance(),
			hashManager:HashManager.getInstance(),
			_gridHandlersAttached: false,
			_rowAspect:null,
			_selectAspect:null,
			runDefaultEdit:true,
			editable:true,
			/**
			 *
			 * configureGrid
			 *  
			 * Stores references to the different components needed, configures up the grid the proper a new store and inits buttons
			 */
			configureGrid:function(configObject){
				this.__grid = configObject.grid;
				this.__editButton = configObject.editButton;
				this.__addButton = configObject.addButton;
				this.__deleteButton = configObject.deleteButton;
				this.__searchFld = configObject.searchFld;
				this.__storeURL = null;
				this.__requiredPermissions = configObject.requiredPermissions;

				if(this._selectAspect != null){
					this._selectAspect.remove();
				}

				aspect.after(this.__grid, "select", lang.hitch(this, "afterSelection"), true);
				

				if(typeof(configObject.rowRenderer) == "undefined"){
					configObject.rowRenderer = "defaultRenderer";
				}
				
				if(typeof(configObject.rowRenderer) == "string"){
					if(this._rowAspect != null) this._rowAspect.remove(); // remove any previous aspect
					this._rowAspect = GridFormatters.addRowRenderer(this.__grid, configObject.rowRenderer);
				}

				if(typeof(configObject.gridSelectionChangeCallBack) != "undefined"){
					this.__gridSelectionChangeCallBack = configObject.gridSelectionChangeCallBack;
				}
				if(typeof(configObject.editEntityCallBack) != "undefined"){
					this.__editEntityCallBack= configObject.editEntityCallBack;
				}
				if(typeof(configObject.arrayStoreDataChangeCallBack) != "undefined"){
					this.__arrayStoreDataChangeCallBack = configObject.arrayStoreDataChangeCallBack;
				}
				
				if(typeof(configObject.runDefaultEdit) != "undefined"){
					this.runDefaultEdit = configObject.runDefaultEdit;
				}
				
				this.setStore(configObject);
							
				this.__grid.on("dgrid-error", function(evt) {
					console.warn("error on grid: ", evt.error);
				});
				
				// start with edit and delete buttons disabled
				if(typeof(this.__editButton) != 'undefined' && this.__editButton != null){
					this.__editButton.set('disabled', true);
				}
				if(typeof(this.__deleteButton) != 'undefined' && this.__deleteButton != null){
					this.__deleteButton.set('disabled', true);
				}
				
			},
      
      
			getStore:function() {
				return this.__store;
			},
			
			/**
			 * 
			 * Sets the store property on the grid underneath via the storeManager
			 * 
			 */
			setStore:function(configObject, filtering){
				this.__configObject = configObject; // save the config object so it may be used later

				if(typeof(configObject.filterFunction) != "function"){
					configObject.filterFunction = lang.hitch(this, "arrayStoreSearch");
				}

				if(typeof(configObject.store) != "undefined" && lang.isArray(configObject.store)){
					this.__store = this.storeManager.getArrayStore(configObject.store, lang.hitch(this, "arrayStoreDataChange"), configObject.getChildren, configObject.filterFunction, configObject.mayHaveChildren);
					this.isREST = false;
				}else if(typeof(configObject.store) == "string"){
					this.__storeURL = configObject.store;
					this.isREST = true;
					this.__store = this.storeManager.getStore(configObject.store, configObject.base_query);
				}				


				if(typeof(configObject.edit_store) != "undefined" && lang.isArray(configObject.edit_store)){
					this.__edit_store = this.storeManager.getArrayStore(configObject.edit_store, lang.hitch(this, "arrayStoreDataChange"), configObject.edit_getChildren, configObject.edit_filterFunction, configObject.edit_mayHaveChildren);
				}else if(typeof(configObject.edit_store) == "string"){
					this.__edit_storeURL = configObject.edit_store;
					this.__edit_store = this.storeManager.getStore(configObject.edit_store, configObject.edit_base_query);
				}
				
				
				if(typeof(configObject.columns) != "undefined" && lang.isArray(configObject.columns)){
					this.__grid.set("columns", configObject.columns);
				}

				if(typeof(configObject.selectionMode) != "undefined"){
					this.__grid.set('selectionMode', configObject.selectionMode);
				}else{
					this.__grid.set('selectionMode', 'single');
				}
				
				if(typeof(this.__store) != "undefined"){
					this.__grid.set("store", this.__store);
					this.__grid.set("getBeforePut", false);
					this.__grid.set("noDataMessage", "No records found");
				}
				if(typeof(configObject.query) != "undefined" && configObject.query != null){
					this.__grid.set("query", configObject.query);
				}
				
				if(filtering != true){
					if(typeof(this.__searchFld) != 'undefined' && this.__searchFld != null){
						this.__searchFld.set("value", "");
					}
				}
				
				this.__updateButtonsEnable();
				
			},
			
			/*
			 * 
			 * onActivate
			 * 
			 * wires up all the different events for the components
			 * 
			 */
			onActivate:function(){
				this.inherited(arguments);

				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}
				
				// mandatory listeners
				if(this.__storeURL != null){
					this.eventHandlers.push( topic.subscribe(this.__storeURL + "-loadedComplete", lang.hitch(this, "storeDataLoaded")) );
				}
								
				// optional listeners
				if(typeof(this.__deleteButton) != 'undefined' && this.__deleteButton != null && !this._deleteButtonHandler) this._deleteButtonHandler = on(this.__deleteButton, 'click', lang.hitch(this, "onDeleteClicked")) ;
				if(typeof(this.__editButton) != 'undefined' && this.__editButton != null && !this._editButtonHandler) this._editButtonHandler = on(this.__editButton, 'click', lang.hitch(this, "onEditClicked"));
				if(typeof(this.__addButton) != 'undefined' && this.__addButton != null && !this._addButtonHandler) this._addButtonHandler = on(this.__addButton, 'click', lang.hitch(this, "onAddClicked"));
				if(typeof(this.__searchFld) != 'undefined' && this.__searchFld != null ) this.eventHandlers.push( on(this.__searchFld, 'keypress', lang.hitch(this, "onSearchFieldKeyUp")) );
				
				// grid listeners
				// FIXME Currently Dgrid doesn't return a handler when using on for the events. This is seriously fucked up because it means we can't remove the handler once added. 
				//       In order to avoid adding several handlers we use a simple flag which means that this component once it starts listening it will always be listening until it is detroyed!				
				if(typeof(this.__grid) != 'undefined' && this.__grid != null){
					if(!this._gridHandlersAttached) {
						//console.log("adding Grid listeners to " + this.id)
						// don't bother with the handler, Dgrid returns undefined!
						on(this.__grid, 'dgrid-select', lang.hitch(this, "__gridSelectionChange"));
						on(this.__grid, 'dgrid-deselect', lang.hitch(this, "__gridSelectionChange"));
						on(this.__grid, 'dblclick', lang.hitch(this, "gridDoubleClick"));
						this._gridHandlersAttached = true;
					}
					this.__grid.set("showHeader", true);
				}
				
			},
			
			
			onDeactivate:function(){
				this.inherited(arguments);
				//remove event handlers
				for (var i=0; i < this.eventHandlers.length; i++) {
					var thisHandler = this.eventHandlers[i];
					if(typeof(thisHandler) != 'undefined'){
						thisHandler.remove();
					}
				};
				
				this.eventHandlers = []				
			},
			
			/**
			 * 
			 * storeDataLoaded
			 * 
			 * This event handler is called whenever data is loaded in the store
			 * 
			 */
			storeDataLoaded:function(data){
			},
			
			/**
			 * 
			 * arrayStoreDataChange
			 * 
			 */
			arrayStoreDataChange:function(object, removedFrom, insertedInto){
				if(typeof(this.__arrayStoreDataChangeCallBack) == "function") this.__arrayStoreDataChangeCallBack(object, removedFrom, insertedInto);
			},
			
			/**
			 * 
			 * __gridSelectionChange
			 * 
			 * Handler for whenever the selection in the grid changes, all we do here is enable/disable the buttons that relate to a selection
			 * 
 			 * @param {Object} event
			 */
			__gridSelectionChange:function(event){
				this.__checkForDisabledRows();
				this.__updateButtonsEnable();
				if(typeof(this.__gridSelectionChangeCallBack) == "function") {
					this.getSelectedEntities(lang.hitch(this, "__gridSelectionChangeCallBack"), true); // return the selectedEntity with the callBack ( getSelectedEntities does an HTTP request if necessary )
				}
			},

			afterSelection:function(row, toRow, value){

				if(typeof(value) == "undefined"){
					value = true;
				}
				if(typeof(row) == "string"){
					row = this.__grid.row(row).element;
				}
				domAttr.set(row, "data-selected", value.toString());
			},

			refresh:function(){
				this.__grid.refresh();
			},

			__checkForDisabledRows:function(){
				for(var i in this.__grid.selection){
					var data = this.__grid.row(i).data;
					if(data.disabled == true){
						this.__grid.deselect(i);
					}
				}
			},
			
			__updateButtonsEnable:function(){
				var items = 0;
				for(var i in this.__grid.selection){
					items++;
				}

				if(this.hasPermission("edit") && this.editable){
					if(typeof(this.__editButton) != 'undefined' && this.__editButton != null) this.__editButton.domNode.style.visibility = "visible";
				}else{
					if(typeof(this.__editButton) != 'undefined' && this.__editButton != null) this.__editButton.domNode.style.visibility = "hidden";
				}

				if(this.hasPermission("delete")){
					if(typeof(this.__deleteButton) != 'undefined' && this.__deleteButton != null) this.__deleteButton.domNode.style.visibility = "visible";
				}else{
					if(typeof(this.__deleteButton) != 'undefined' && this.__deleteButton != null) this.__deleteButton.domNode.style.visibility = "hidden";
				}
				
				if(items > 0){
					if(typeof(this.__deleteButton) != 'undefined' && this.__deleteButton != null) this.__deleteButton.set('disabled', false);
					if(typeof(this.__editButton) != 'undefined' && this.__editButton != null) this.__editButton.set('disabled', false);
				}else{
					if(typeof(this.__deleteButton) != 'undefined' && this.__deleteButton != null)this.__deleteButton.set('disabled', true);
					if(typeof(this.__editButton) != 'undefined' && this.__editButton != null) this.__editButton.set('disabled', true);
				}
			},

			hasPermission:function(type){
				if(typeof(this.__requiredPermissions) != "object" || this.__requiredPermissions == null){
					return true;
				}
				if(!this.__requiredPermissions.hasOwnProperty(type)){
					return true;
				}
				return __.authManager.hasPermission(this.__requiredPermissions[type]);
			},
			
			/**
			 *
			 * onDeleteClicked
			 * 
			 * Handler for deleteButton, at this point all we do is show the confirm dialog and pass it a reference to the entity the user wants to delete
			 * 
 			 * @param {Object} event
			 */
			onDeleteClicked: function(event){
				if(this.hasPermission("delete")){
					/*var entityNames = "";
					var entityId;
					
					for(var i in this.__grid.selection){
						entityId = i;
					}
					var entity;
					if(typeof(this.__edit_store) == "object" && this.__edit_store != null){
						entity = this.__edit_store.get(entityId);
					}else{
						entity = this.__store.get(entityId)
					}
					
					var owner = this;
					// account for asynchrounisity of the store
					if(entity.then){
						entity.then(function(data){
							owner.__entityReadyForDelete(data);
						})
					}else{
						this.__entityReadyForDelete(entity);
					}*/
					this.getSingleEntity(lang.hitch(this,"__entityReadyForDelete"));
				}else{
					__.alert.set("message", "You don't have permission to delete this item");
					__.alert.show();
				}
				
			},
			
			__entityReadyForDelete:function(entity){
				if(typeof(this._deleteConfirmMessage) != "undefined"){
					__.confirmDialog.set("confirmMessage", this._deleteConfirmMessage);
				}else{
					
					var itemDisplay = "";
					
					if(typeof(this._entityLabel) != "undefined"){
						itemDisplay +=  this._entityLabel.toLowerCase();
					}else if(typeof(entity.$ref) != "undefined"){
						itemDisplay +=  entity.$ref;
					}
					
					if(typeof(entity.name) != "undefined"){
						itemDisplay += ' "' + entity.name + '"';
					}else{
						itemDisplay = "this " + itemDisplay;
					}
					
					__.confirmDialog.set("confirmMessage", 'Are you sure you want to delete <br/> ' + itemDisplay + ' ?');
				}
				__.confirmDialog.show(lang.hitch(this, "deleteSelected"));
				
			},
			
			/*
			 * deleteSelected
			 * 
			 * Performs the actual deletion of an item after the user has confirm she really wants to delete it
			 * 
			 */
			deleteSelected:function(){
				for(var i in this.__grid.selection){
					this.__store.remove(i);
				}
			},
			
			/**
			 *
			 * onEditClicked
			 * 
			 * Handler for the editButton, since both this method and double clicking the grid have the same effect we defer the heavy-lifting to __editEntity
			 * 
 			 * @param {Object} event
			 */
			onEditClicked:function(event){
				if(this.hasPermission("edit")){
					if(this.editable){
						this.__editEntity();
					}else{
						__.alert.set("message", "This item is not editable");
						__.alert.show();
					}
				}else{
					__.alert.set("message", "You don't have permission to edit this item");
					__.alert.show();
				}
			},


			/**
			 *
			 * onAddClicked
			 * 
			 * Handler for the addButton
			 * 
 			 * @param {Object} event
			 */
			onAddClicked: function(event){
				if(typeof(this.setupDialog) == "object" && this.setupDialog != null) {
					if(typeof(this.setupDialog.setUpdatingEntity) == "function") this.setupDialog.setUpdatingEntity(null, true);
					if(typeof(this.setupDialog.show) == "function")	this.setupDialog.show();
				}else{
					this.hashManager.setHash(this.hashManager.getModule() + '/' + this._updateStateHash + '/new/_step_0');
				}
				
			},
			
			/**
			 *
			 * gridDoubleClick
			 * 
			 * Handler for double clicking the grid, since both this method and the editButton have the same effect we defer the heavy-lifting to __editEntity
			 * 
 			 * @param {Object} event
			 */
			gridDoubleClick:function(event){
				if(this.hasPermission("edit")){
					if(this.editable){
						this.__editEntity();
					}else{
						__.alert.set("message", "This item is not editable");
						__.alert.show();
					}
				}else{
					__.alert.set("message", "You don't have permission to edit this item");
					__.alert.show();
				}
			},
			
			/**
			 * __editEntity
			 * 
			 * This method gathers information about the currently selected row on the grid, gets the related entity from the store and then calls a method 'editEntity' which the host component
			 * must implement and passes the actual entity object so the implementor can decide how to edit it
			 * 
			 * 
			 */
			__editEntity:function(){
				/*var entityId;
				for(var i in this.__grid.selection){
					entityId = i;
				}

				// there is no selection! abort!
				if(typeof(entityId) == "undefined") return;
				
				var entity 
				// sometimes we want to set the store to list to be a special service that returns items from another collection,
				// in these cases when we do a single get by id, we want to get it from the original collection, this is why we might have
				// a different store for edit
				if(typeof(this.__edit_store) == "object" && this.__edit_store != null){
					entity = this.__edit_store.get(entityId);
				}else{
					entity = this.__store.get(entityId);
				}


				var owner = this;
				
				// account for asynchrounisity of the store
				if(entity.then){
					entity.then(function(data){
						owner.__entityReadyForEdit(data);
					})
				}else{
					this.__entityReadyForEdit(entity);
				}*/
				this.getSingleEntity(lang.hitch(this,"__entityReadyForEdit"));
			},



			__entityReadyForEdit:function(entity){
				if(typeof(this.__editEntityCallBack) == "function") this.__editEntityCallBack(entity);
				this.editEntity(entity);
			},
			
			/**
			 * 
			 * Override me 
			 * 
			 */
			editEntity:function(entity){
				if(this.runDefaultEdit){
					if(typeof(this.setupDialog) == "object" && this.setupDialog != null) {
						if(typeof(this.setupDialog.setUpdatingEntity) == "function") this.setupDialog.setUpdatingEntity(entity, true);

						if(this.isREST == true){
							__.entities.setContext({entityId:entity.id, entityType:entity.$ref, entity:entity}, this.__storeURL);
						}else{ //If the entity does not come from URL then it comes from an array
							__.entities.setContext({entityId:entity.id, entityType:entity.$ref, entity:entity, arrayStore: this.__store.data}, "");
						}

						if(typeof(this.setupDialog.show) == "function") this.setupDialog.show();
					}else{
						if(this.isREST == true){
							__.entities.setContext({entityId:entity.id, entityType:entity.$ref, entity:entity}, this.__storeURL);
						}else{ //If the entity does not come from URL then it comes from an array
							__.entities.setContext({entityId:entity.id, entityType:entity.$ref, entity:entity, arrayStore: this.__store.data}, "");
						}
						
						this.hashManager.setHash(this.hashManager.getModule() + '/' + this._updateStateHash + '/' + entity.id + '/_step_0')
					}
				}
			},	

			getSelectedIds:function(){
				var selectedIds = [];
				for(var i in this.__grid.selection){
					var entityId = i;
					selectedIds.push(entityId);
				}

				return selectedIds;
			},

			getSingleEntity:function(callBack){
				if(typeof(callBack) != "function") return;

				var entityId;
				for(var i in this.__grid.selection){
					entityId = i;
				}

				// there is no selection! abort!
				if(typeof(entityId) == "undefined") return;
				
				var entity 
				// sometimes we want to set the store to list to be a special service that returns items from another collection,
				// in these cases when we do a single get by id, we want to get it from the original collection, this is why we might have
				// a different store for edit
				if(typeof(this.__edit_store) == "object" && this.__edit_store != null){
					entity = this.__edit_store.get(entityId);
				}else{
					entity = this.__store.get(entityId);
				}
				
				// account for asynchrounisity of the store
				if(entity.then){
					entity.then(function(data){
						callBack(data);
					})
				}else{
					callBack(entity);
				}
			},

			getSelectedEntities:function(callBack, localOnly){
				if(typeof(callBack) != "function"){
					console.warn("You must pass a callBack function to GridManager.getSelectedEntities");
					return; // 	
				} 
				if(typeof(this.gotAllEntitiesBacllBack) != "undefined" && this.gotAllEntitiesBacllBack != null){
					console.warn("Still processing a request for getSelectedEntities, please try again soon...");
					return;	
				} 

				this.gotAllEntitiesBacllBack = callBack;
				this.pendingGetEntities = [];
				this.selectedEntities = []

				for(var i in this.__grid.selection){
					var entityId = i;
				
					var entity;
					if(typeof(this.__edit_store) == "object" && this.__edit_store != null){
						if(this.__edit_store.isInstanceOf(JsonRest) && localOnly){
							entity = this.__grid.row(entityId).data
						}else{
							entity = this.__edit_store.get(entityId)
						}
					}else{
						if(this.__store.isInstanceOf(JsonRest) && localOnly){
							entity = this.__grid.row(entityId).data
						}else{
							entity = this.__store.get(entityId)
						}
					}

					var owner = this;
					// account for asynchrounisity of the store
					if(entity.then){
						this.pendingGetEntities.push(entityId);
						entity.then(function(data){
							owner._gotAsyncEntity(data);
						})
					}else{
						this.selectedEntities.push(entity);
					}
				}

				if(this.pendingGetEntities.length == 0){
					this.returnEntitiesReady();
				}
			},

			_gotAsyncEntity:function(entity){
				for (var i = this.pendingGetEntities.length - 1; i >= 0; i--) {
					var pendingEntityId = this.pendingGetEntities[i];
					if(entity.id == pendingEntityId){
						this.selectedEntities.push(entity);
						this.pendingGetEntities.splice(i, 1);
					}
				};

				if(this.pendingGetEntities.length == 0){
					this.returnEntitiesReady();
				}

			},

			returnEntitiesReady:function(){
				if(this.selectedEntities.length == 1){
					this.gotAllEntitiesBacllBack(this.selectedEntities[0]);
				}else{
					this.gotAllEntitiesBacllBack(this.selectedEntities);
				}
				this.gotAllEntitiesBacllBack = null; // free the mechanism to be able to do it again
			},
			
			/**
			 *
			 * onSearchFieldKeyUp
			 * 
			 * Handler for key up events in the searchField, wait until we get an enter key and then trigger applyNewQuery
			 * 
 			 * @param {Object} event
			 */
			onSearchFieldKeyUp:function(event){
				if(event.keyIdentifier == "Enter"  || event.key == "Enter" || event.keyCode == 13){
					this.applyNewQuery();
				}
			},
			
			
			/**
			 * 
			 * applyNewQuery
			 * 
			 * These terms can be separated by commas to form more complex queries, when name is not specified a default field is used 
			 * 
			 * 
			 */
			applyNewQuery:function(){
				var search = this.__searchFld.displayedValue
				if(this.isREST == true){
					if(search == ''){
						this.__grid.set('query', {});
					}else{
						var query = {_q: search};
						this.__grid.set('query', query);
					}
				}else{
					this.setStore(this.__configObject, true); // to refresh the array and execute the filter filterFunction
				}
			},


			arrayStoreSearch:function(item){
				if(typeof(this.__searchFld) != 'undefined' && this.__searchFld != null){
					var search = this.__searchFld.displayedValue;
					if(search == ''){
						return true;
					}else{
						if(typeof(item.name) == "string"){
							return item.name.toLowerCase().indexOf(search.toLowerCase()) != -1;
						}else{
							return true;
						}
					}
				}else{
					return true;
				}
			}


	});
});
