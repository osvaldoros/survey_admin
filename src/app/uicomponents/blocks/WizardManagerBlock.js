define([
	"dojo/_base/declare",
	"dojo/on",
	"dijit/_WidgetBase", 
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",
	"app/mixins/EntityLoader",
	"dojo/text!./templates/WizardManagerBlock.html", // this is what includes the html template
	"dojo/_base/lang",
	"dojo/topic",	
	"dojo/dom-construct",
	
	"dijit/form/Button",
	"app/form/ArrowButton",
	"dijit/layout/TabContainer",
	"dijit/layout/ContentPane",
	
	"app/utils/HashManager",
	"app/mixins/WizardManager",
	"app/layout/FloatingPane",
	"dojo/dom-style",
	"app/uicomponents/Notes"
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, EntityLoader, StatefulModule, template, lang, topic, domConstruct,
			Button, ArrowButton, TabContainer, ContentPane,   
			HashManager, WizardManager, FloatingPane, domStyle, Notes){
	
	
	return declare("app.uicomponents.blocks.WizardManagerBlock", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, EntityLoader, WizardManager], {

			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!
			hashManager: HashManager.getInstance(),
			_autoClose:false,
			_inheritOnActivate:true,
			_hashManagement: null,
			_entityLabel:undefined,
			_showTabs:true,
			_showInstructions:false,
			_showNotes:false,
			_showCancelBtn:false,
			_notesStoreURL:null,
			_showTitle:true,
			_autoGenerateStepsFromMeta:false,
			_preloadedEntity:null,
			_showPreviousButton:false,
			_enableNavigateButtons:false,
			_preflightNavOnLoad:true,
			
			// The constructor
		    constructor: function(args){
		        declare.safeMixin(this,args || {});
		        this._hashManagement = this._defaultHashManagement;
				this._steps = [];
				this._preloadedEntity = {};
		    },
			/**
			 * 
			 * startup is called by the framework as part of the livecycle of all widgets, it happens after the children widgets have been created and are ready to be used
			 * Notice we don't use postCreate because the child widgets haven't been created yet, and we need to wait for the dgrid to attach the store to it
			 * 
			 */
			startup:function(){
				this.inherited(arguments);
				this._tabs = this.getWidget("_tabs");
				this._prevBtn = this.getWidget("_prevBtn");
				this._nextBtn = this.getWidget("_nextBtn");
				this._saveBtn = this.getWidget("_saveBtn");
				this._cancelBtn = this.getWidget("_cancelBtn");
				this._modified_label = this.getWidget("_modified_label");
				this._users_active_label = this.getWidget("_users_active_label");
				this._firstEntityBtn = this.getWidget("_firstEntityBtn");
				this._previousEntityBtn = this.getWidget("_previousEntityBtn");
				this._nextEntityBtn = this.getWidget("_nextEntityBtn");
				this._lastEntityBtn = this.getWidget("_lastEntityBtn");
				
				// instructions
				this._instructionsBtn = this.getWidget("_instructionsBtn");
				this._instructions = this.getWidget("_instructions");
				this.instructionsWidget = this.getWidget("instructionsWidget");

				// notes
				this._notesBtn = this.getWidget("_notesBtn");
				this._notes = this.getWidget("_notes");
				this.notesWidget = this.getWidget("notesWidget");

				this.title_div = this.getWidget("title_div");

				if(typeof(this.title_div.id) == "undefined" || this.title_div.id == ""){
					this.title_div.id = this.id + "_title_div";
				}				

				if(typeof(this._entityLabel) == "string"){
					this._cancelBtn.set("label", this._cancelBtn.label + " " + this._entityLabel);
				}
				
				this._instructions.resize({w:400, h:500});
				this._instructions.hide();
				
				this._notes.resize({w:400, h:500});
				this._notes.hide();

				if(lang.isArray(this._extraButtons) && this._extraButtons.length > 0){
					for (var i = this._extraButtons.length - 1; i >= 0; i--) {
						var extraButtonInfo = this._extraButtons[i]
						var extraButton = new Button({label:extraButtonInfo.label});

						if(typeof(extraButtonInfo.instanceName) == "string" && extraButtonInfo.instanceName){
							if(this.hasOwnProperty(extraButtonInfo.instanceName)){
								console.warn("Could not create property " + extraButtonInfo.instanceName + ", because it already exist on WizardManagerBlock " + this.id);
							}else{
								this[extraButtonInfo.instanceName] = extraButton;
							}
						}
						extraButton.placeAt(this._saveBtn.domNode, "after");
						extraButtonInfo.button = extraButton;

						domStyle.set(extraButton.domNode, {
							"float":"right"
						})
					};
				}
				
				var wizardConfig = {
					tabs: this._tabs,
					steps: this._steps,
					autoGenerateStepsFromMeta: this._autoGenerateStepsFromMeta,
					statusLabel: this._modified_label,
					activeUsersLabel: this._users_active_label,
					storeURL: this._store,
					previousButton: this._prevBtn,
					nextButton: this._nextBtn,
					saveButton: this._saveBtn
				}
				
				if(typeof(this._hashManagement) != "undefined" && this._hashManagement != null){
					wizardConfig.hashManagement = this._hashManagement;
				}
				
				this.configureWizard(wizardConfig);
			},
			
			
			entityCreated:function(entity){
				this.reconfigureWizard(entity)
				this.title_node.innerHTML = entity.name;
			},
			
			onActivate:function(){
				
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}
				
				if(typeof(this._instructionsBtn) != 'undefined' && this._instructionsBtn != null) this.eventHandlers.push( on(this._instructionsBtn, 'click', lang.hitch(this, "onInstructionsBtnClicked")) );
				if(typeof(this._notesBtn) != 'undefined' && this._notesBtn != null) this.eventHandlers.push( on(this._notesBtn, 'click', lang.hitch(this, "onNotesBtnClicked")) );
				if(typeof(this._cancelBtn) != 'undefined' && this._cancelBtn != null) this.eventHandlers.push( on(this._cancelBtn, 'click', lang.hitch(this, "onCancelBtnClicked")) );
				if(typeof(this._firstEntityBtn) != 'undefined' && this._firstEntityBtn != null) this.eventHandlers.push( on(this._firstEntityBtn, 'click', lang.hitch(this, "onFirstEntityBtnClicked")) );
				if(typeof(this._previousEntityBtn) != 'undefined' && this._previousEntityBtn != null) this.eventHandlers.push( on(this._previousEntityBtn, 'click', lang.hitch(this, "onPreviousEntityBtnClicked")) );
				if(typeof(this._nextEntityBtn) != 'undefined' && this._nextEntityBtn != null) this.eventHandlers.push( on(this._nextEntityBtn, 'click', lang.hitch(this, "onNextEntityBtnClicked")) );
				if(typeof(this._lastEntityBtn) != 'undefined' && this._lastEntityBtn != null) this.eventHandlers.push( on(this._lastEntityBtn, 'click', lang.hitch(this, "onLastEntityBtnClicked")) );

				if(lang.isArray(this._extraButtons) && this._extraButtons.length > 0){
					for (var i = this._extraButtons.length - 1; i >= 0; i--) {
						var extraButtonInfo = this._extraButtons[i];
						this.eventHandlers.push( on(extraButtonInfo.button, 'click', extraButtonInfo.handler ) );
					}
				}

				if(this._inheritOnActivate == true){
					this.loadEntityviaLoader();
				}

				// this causes WizardManager to build the tabs
				this.inherited(arguments);
			},

			loadEntityviaLoader:function(customOnLoadFn){
				var owner = this;
				var meta = this.loadEntity(
					// when there is an entity to edit
					function(entity){
						owner._firstEntityBtn.domNode.style.display = '';
						owner._previousEntityBtn.domNode.style.display = '';
						owner._nextEntityBtn.domNode.style.display = '';
						owner._lastEntityBtn.domNode.style.display = '';

						owner.updateTitle(entity);
						owner.reconfigureWizard(entity);
						owner.isUpdating = true;
						if(typeof(entity) == 'object' && entity != null){
							owner._currentEntity = entity;
							if(owner._preflightNavOnLoad) owner.preFlightNav();
						}

						if(typeof(customOnLoadFn) == "function") customOnLoadFn();
					},
					// when we are going to create a new entity
					function(){
						owner._firstEntityBtn.domNode.style.display = 'none';
						owner._previousEntityBtn.domNode.style.display = 'none';
						owner._nextEntityBtn.domNode.style.display = 'none';
						owner._lastEntityBtn.domNode.style.display = 'none';

						owner.reconfigureWizard(null);
						owner.updateTitle(null);
						owner.isUpdating = null;
					}
				)

				// meta contains information about how loadEntity did its work, in this case whether it usedHash and whether its going to be updating
				this.isUpdating = meta.isUpdating;
				if(meta.usedHash == true){
					if(this.isUpdating){
						this.reconfigureWizard(undefined); // set to undefined while it loads
					}
					this.configureHashManagement({hashManagement: this._defaultHashManagement}); // update the hash using setEntityState
				}else{
					this.configureHashManagement({hashManagement: null}); // don't update the hash
				}
			},

			/*
			*
			* freshEntity is optional, pass it in ONLY if you don't want the entityLoader to load the entity in the standard way ( i.e. you want to the form to refresh with an entity you have handy )
			*
			*/
			reloadEntity:function(freshEntity){
				var oldPreflightNavOnLoad = this._preflightNavOnLoad;
				this._preflightNavOnLoad = false;
				if(this._inheritOnActivate == true){
					if(typeof(freshEntity) == "undefined"){
						this.loadEntityviaLoader(lang.hitch(this, "_onReloadEntity"));
					}else{
						this.setUpdatingEntity(freshEntity, true);
						this._onReloadEntity(freshEntity);
					}
				}

				this._preflightNavOnLoad = oldPreflightNavOnLoad;
			},

			_onReloadEntity:function(freshEntity){
				this.callOnChildren("onReloadEntity");
				this.onReloadEntity(freshEntity);
			},

			// override me
			onReloadEntity:function(freshEntity){

			},

			//When entity was created, we need to call these function thus Navigate button will work correctly
			preloadEntityCreated:function(){
				var owner = this;
				var meta = this.loadEntity(
					// when there is an entity to edit
					function(entity){
						if(typeof(entity) == 'object' && entity != null){
							owner._currentEntity = entity;
							owner.preFlightNav();
						}
					}
				)
			},

			refreshButtons:function(){
				this.inherited(arguments);
				if(this._showTitle == true){
					this.title_node.style.display = '';
				}else{
					this.title_node.style.display = 'none';
				}
				if(this._showInstructions == true){
					this._instructionsBtn.domNode.style.display = '';
				}else{
					this._instructionsBtn.domNode.style.display = 'none';
				}
				if(this._showNotes == true){
					this._notesBtn.domNode.style.display = '';
				}else{
					this._notesBtn.domNode.style.display = 'none';
				}

				if(this._showCancelBtn == true){
					this._cancelBtn.domNode.style.display = '';
				}else{
					this._cancelBtn.domNode.style.display = 'none';
				}

				if(this._showPreviousButton == true){
					this._prevBtn.domNode.style.display = '';
				}else{
					this._prevBtn.domNode.style.display = 'none';
				}
			},
			
			getBookingInstructions:function(){
				//override me!
			},

			onCancelBtnClicked:function(){
				if(typeof(this._cancelConfirmMessage) != "undefined"){
					__.confirmDialog.set("confirmMessage", this._cancelConfirmMessage);
				}else{
					__.confirmDialog.set("confirmMessage", 'Are you sure you want to cancel this ' + this._entityLabel + ' ?');
				}
				__.confirmDialog.show(lang.hitch(this, "cancelConfirmed"));
			},

			cancelConfirmed:function(){
				//override me!
			},

			onFirstEntityBtnClicked:function(event){
				this.navigateEntityList("first");
			},

			onPreviousEntityBtnClicked:function(event){
				this.navigateEntityList("prev");
			},

			onNextEntityBtnClicked:function(event){
				this.navigateEntityList("next");
			},

			onLastEntityBtnClicked:function(event){
				this.navigateEntityList("last");
			},

			navigateEntityList:function(command){
				var owner = this;
				if(this.changeTracker.isModified(this._store)){
					__.confirmDialog.set("confirmMessage", 'You are about to leave this, are you sure you want to discard your changes ?');
					__.confirmDialog.set("title", 'Unsaved changes');
					__.confirmDialog.show(function(){
						owner.confirmNavigateAway(command)
					});
				}else{
					this.confirmNavigateAway(command);
				}
			},

			confirmNavigateAway:function(command){
				if(this._preloadedEntity.hasOwnProperty(command)){
					this._currentEntity = this._preloadedEntity[command];
					this.preFlightNav();
					if(this.__useHash == true){
						this.hashManager.setEntity(this._currentEntity.id, false); // the last parameter indicates whether we are gonna pick up on the event of the hash changing
					}
					this.reconfigureWizard(this._currentEntity);
					this.updateTitle(this._currentEntity);
					if(typeof(this.currentForm) == "object" && this.currentForm != null){
						this.currentForm.viewInForm(this._currentEntity, this.currentForm.__form, null, true);
					}
					if(typeof(this.executeAfterNavigate) == "function"){
						this.executeAfterNavigate();
					}
					this.changeTracker.clearChangesObject(this._store);
				}
			},

			preFlightNav:function(){
				if(this._enableNavigateButtons){
					this._preloadedEntity = {};

					this._firstEntityBtn.set("disabled", true);
					this._previousEntityBtn.set("disabled", true);
					this._nextEntityBtn.set("disabled", true);
					this._lastEntityBtn.set("disabled", true);
					
					var owner = this;
					this.getEntity("next", function(nextEntity){ 
						if(nextEntity != null){
							owner._preloadedEntity["next"] = nextEntity
							owner._nextEntityBtn.set("disabled", false);
						}

						owner.getEntity("prev",  function(prevEntity){ 
							if(prevEntity != null){
								owner._preloadedEntity["prev"]  = prevEntity 
								owner._previousEntityBtn.set("disabled", false);
							}
							
							owner.getEntity("last",  function(lastEntity){ 
								if(lastEntity != null){
									owner._preloadedEntity["last"]  = lastEntity 
									owner._lastEntityBtn.set("disabled", false);
								}

								owner.getEntity("first", function(firstEntity){ 
									if(firstEntity != null){
										owner._preloadedEntity["first"] = firstEntity 
										owner._firstEntityBtn.set("disabled", false);
									}

								});
							});
						});
					});
				}else{
					this._lastEntityBtn.domNode.style.display = "none";
					this._firstEntityBtn.domNode.style.display = "none";
					this._previousEntityBtn.domNode.style.display = "none";
					this._nextEntityBtn.domNode.style.display = "none";
				}	

			},

			getEntity:function(command, callBack){
				if(this._preloadedEntity.hasOwnProperty(command)){
					if(typeof(callBack) == "function") callBack(this._preloadedEntity[command]);
				}


				var context = __.entities.getContext(this._store);

				if(!context.entityArrayStore){

					var optionsArr = [];
					for(var p in context.options){
						if(p != "entity_id" && p != "sort"){
							var val = context.options[p]
							if(typeof(val) != "undefined"){
								optionsArr.push(p + "=" + val);
							}
						}
					}

					var sort;
					if(lang.isArray(context.options.sort)){sort = context.options.sort[0];
						optionsArr.push("sort(" + (sort.descending === true ? "-" : "+") + sort.attribute + ")" );
					}

					var optionsString = "";
					if(optionsArr.length > 0){
						optionsString = "&" + optionsArr.join("&");
					}

					var owner = this;
					var req = __.api.get(this._store + "?_nav=" + command + "&_nav_id=" + this._currentEntity.id + optionsString,null, false);
					req.then(function(response){
						if(typeof(response) == "object" && response != null){
							if(response.hasOwnProperty("error")){
	  							console.log("ENTITY NAVIGATION ERROR > " + response.error.message);
	  							callBack(null);
							}else{
								if(owner._currentEntity == null || typeof(owner._currentEntity) == "undefined" || owner._currentEntity.id != response.id){
									callBack(response);
								}else{
									callBack(null);
								}
							}
						}
					})
				}else{
					var resultOfNavigate = this.navigateArray(context.entityArrayStore,this._currentEntity.id,command);
					if(resultOfNavigate){
						callBack(resultOfNavigate)
					}else{
						callBack(null);
					}
				}
			},

			navigateArray:function(array,currentEntityId,command){
				var index = this.returnIndex(array,currentEntityId);
				switch(command)
				{
					case "next":
						if((index+1) <= array.length-1){
							return array[index+1];
						}
					break;

					case "prev": 
						if((index-1) >= 0){
							return array[index-1];
						}
					break;

					case "last":
						if(index < array.length-1){
							return array[array.length-1];
						}
					break;

					case "first":
						if(index > 0){
							return array[0];
						}
					break;
				}
				return null;
			},

			returnIndex:function(array,id){
				for(var i = 0; i < array.length; i++){
					if(array[i].id == id){
						return i;
					}
				}
			},

			onInstructionsBtnClicked:function(event){
				this.getBookingInstructions();
				if(this._instructions.__isShowing){
					this._instructions.hide();
				}else{
					this._instructions.show();
					this._instructions.bringToTop();
				}
			},
			
			onNotesBtnClicked:function(event){
				if(this._notes.__isShowing){
					this._notes.hide();
				}else{
					this._notes.show();
					this._notes.bringToTop();
				}
			},

			__entitySaved:function(entity){
				this.inherited(arguments);
				this.updateTitle(entity);
				if(this.parentDialog && this._autoClose){
					this.parentDialog.confirmHide();
				}
			},
			
			updateTitle:function(entity){
				if(entity != null){
					if(typeof(entity.name) != "undefined"){
						this.title_node.innerHTML = entity.name;
					}else{
						this.title_node.innerHTML = "Edit " + this._entityLabel;
					}
				}else{
					this.title_node.innerHTML = "New " + this._entityLabel;
				}
			},
			
			onDeactivate:function(){
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}				
				//remove event handlers
				for (var i=0; i < this.eventHandlers.length; i++) {
					var thisHandler = this.eventHandlers[i];
					if(typeof(thisHandler) != 'undefined'){
						thisHandler.remove();
					}
				};
				
				this.inherited(arguments);
				this.eventHandlers = []				
			}

	});
});