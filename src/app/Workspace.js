define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",	
	"dijit/layout/ContentPane",
	"app/mixins/StatefulModule",
	"dojo/text!./templates/Workspace.html", // this is what includes the html template
	"dijit/layout/BorderContainer",
	"dijit/layout/TabContainer",
	"app/loader/ModuleLoader",
	"app/uicomponents/ConfirmDialog",
	"app/uicomponents/SearchDialog",
	"app/workspace/Topbar",
	"app/workspace/Sidebar",
	"require",	
	"app/uicomponents/Dialog",	
	"app/utils/TooltipDialogController",
	"dojo/dom-style",
	"app/utils/HashManager"
	],
	function(declare, on, lang, ContentPane, StatefulModule, template, BorderContainer, TabContainer, ModuleLoader, ConfirmDialog, SearchDialog, Topbar, Sidebar, require, Dialog, TooltipDialogController, domStyle, HashManager){
	
	return declare("app.Workspace", [ContentPane, StatefulModule], {
		//widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
		//content: template, // Our template - important!
		content: template, // Our template - important!
		hashManager: HashManager.getInstance(),
		/**
		 * 
		 * startup is called by the framework as part of the livecycle of all widgets, it happens after the children widgets have been created and are ready to be used
		 * Notice we don't use postCreate because the child widgets haven't been created yet, and we need to wait for the dgrid to attach the store to it
		 * 
		 */
		startup:function(){
			this.inherited(arguments);

			// get the references of the components we need
			this.contentTabs = this.getWidget('contentTabs');
			this.topBar = this.getWidget('topBar');
			
			__.workspaceManager = this;
			__.confirmDialog = new ConfirmDialog();
			__.searchDialog = new SearchDialog();

		},
		
		onHashChange:function(hashValue){
			hashValue = hashValue.toLowerCase();
			if(hashValue != this.currentHash){
				var hashPieces = hashValue.split('/');
				var moduleName = hashPieces[0] != '' ? hashPieces[0] : hashPieces[1]; // check the first spot, but if it is blank ( leading slash ) grab the second spot


				if(typeof(this.tabsById[moduleName]) == 'undefined' && typeof(this.modulesById[moduleName]) != 'undefined'){
					this.addTabFromModule(this.modulesById[moduleName]);
				}
				
				if(typeof(this.tabsById[moduleName]) != 'undefined'){
					this.contentTabs.selectChild(this.tabsById[moduleName]);
					this.set('selectedModule', this.tabsById[moduleName]);
					this.set('selectedModuleName', moduleName);
					this.currentHash = hashValue;
					return true;
				}else{
					this.hashManager.setHash(this.currentHash);
				}
			}
			
			return false;
		},
		
		/**
		 * 
		 * Implemented by app/loader/Module, this gets called when its parent ModuleLoader it shown ( only once )
		 * 
		 */
		onActivate:function(){
			// clear the module map
			this.tabsById = {};
			this.modulesById = {};
			this.currentHash = '';
			if(typeof(this.eventHandlers) == "undefined"){
				this.eventHandlers = [];
			}			
			
			this.eventHandlers.push( dojo.subscribe("/__/hashchange", this, this.onHashChange) );
			// load the catalogs and delay building the tabs until we have them			
			this.createTabs();
			
		},
		
		
		
		createTabs:function(){

			// populate the tabs with the modules defined int he configuration
			if(typeof(this.contentTabs) != 'undefined'){
				var tabArray = dojo.config.appSpecific.tabs;				
				for (var i = 0; i < tabArray.length; i++){
					var tabObj = tabArray[i]
					this.addTab(tabObj);
				};
				// create a map for the modules even thought they won't be tabs right away...
				var moduleArray = dojo.config.appSpecific.modules;				
				for (var i = 0; i < moduleArray.length; i++){
					var moduleObj = moduleArray[i]
					this.addModule(moduleObj);
				};
			}
			
			var firstHash = this.hashManager.getHash();
			if(typeof(firstHash) != 'undefined' && firstHash != ''){
				this.onHashChange(firstHash)
			}
		},

		addTab:function(tabInfo){
			tabInfo.topModule = true; // mark this module as topModule so it can modify the hash in the url if needed
			tabInfo.parentStack = this.contentTabs;
			tabInfo.cssClass = "pad10";
			
			//delete tabInfo.id;
			var module = new ModuleLoader(tabInfo);
			this.tabsById[tabInfo.hash] = module;
			this.contentTabs.addChild( module );
		},

		removeTab:function(tab){
			delete this.tabsById[tab.hash];
			return true;
		},

		addModule:function(moduleInfo){
			this.modulesById[moduleInfo.hash] = moduleInfo;
		},

		addTabFromModule:function(moduleInfo){
			moduleInfo.topModule = true; // mark this module as topModule so it can modify the hash in the url if needed
			moduleInfo.parentStack = this.contentTabs;
			moduleInfo.cssClass = "pad10";
			moduleInfo.closable = true;
			var owner = this;
			moduleInfo.onClose = function(){
				return owner.removeTab(this);
			}

			var module = new ModuleLoader(moduleInfo);
			this.tabsById[moduleInfo.hash] = module;
			this.contentTabs.addChild( module );
		},
		
		getDialogFromModuleURL:function(moduleUrl, options){
			var owner = this;
			require([moduleUrl], function(Module){
				module = new Module();
				var dialog = owner.getModuleInDialog(module, options);
				if(typeof(options.dialogReady) == "function"){
					options.dialogReady(dialog);
				}
			});
			
		},
		
		getModuleInDialog:function(module, options){
			if(typeof(options) != "object" || options == null){
				options = {};
			}
			
			var dialogInitObj = {
				title: options.title || "",
				content: module
			}
			
			// pass the callBacks map to the children so they can each trigger related callBacks to their processes
			// i.e. if the child is a Saver and a saveComplete callBack is defined, the Saver child will trigger such callback when it saves
			if(typeof(options.callBacks) != "undefined" && options.callBacks != null){
				module.callBacks = options.callBacks;
			}			
			if(typeof(options.callbacks) != "undefined" && options.callbacks != null){
				module.callbacks = options.callbacks;
			}
			
			var dialog = new Dialog(dialogInitObj);

			module.parentDialog = dialog;
			module.hide = function(){
				dialog.hide();
			}
			
			domStyle.set(dialog.domNode, {
				"width": options.dialogWidth || module.width || "960px",
				"height": options.dialogHeight || module.height || "620px",
				"background-color": options.backgroundColor || "#ffffff"
			})
			
			return dialog;
		},		

		getModuleInTooltipDialog:function(module, button, options){
			var tooltipDialogCller = new TooltipDialogController();
			tooltipDialogCller.initDialog(module, button, options);
			
			return tooltipDialogCller; // It is your responsibility when you are done with the dialog to destroy it
		},
		
		
		/**
		 * 
		 * Implemented by app/loader/Module, this gets called when its parent ModuleLoader it hidden ( only once )
		 * 
		 */
		onDeactivate:function(){
			//remove event handlers
			for (var i=0; i < this.eventHandlers.length; i++) {
				this.eventHandlers[i].remove();
			};
			
			if(typeof(this.contentTabs) != 'undefined'){
				this.contentTabs.destroyDescendants();
			}
			
			
			this.eventHandlers = []
			
			//this.topBar.deactivate(); // HACK until I can get the children to activate automatically
			
		}
		
		
	});
});
