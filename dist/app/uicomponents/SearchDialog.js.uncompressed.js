//>>built
require({cache:{
'url:app/uicomponents/templates/SearchDialog.html':"<div class=\"moduleContainer\" style=\"width: 750px;\">\n\t\n\t<div class=\"floatRight\" style=\"clear: left; padding-bottom: 10px;\">\n\t\t<input type=\"text\" required=\"true\" class=\"floatRight\" name=\"searchFld\" data-dojo-attach-point=\"searchFld\"  placeholder=\"search\" dojoType=\"dijit.form.TextBox\" />\n    </div>\n\t\n\t\n \t<table id=\"searchGrid\" data-dojo-type=\"dgrid.Grid\" data-dojo-attach-point=\"searchGrid\" style=\"clear: both;\">\n\t\t<tr>\n\t\t\t<th data-dgrid-column=\"{field:'id', sortable:true}\">Id</th>\n\t\t\t<th data-dgrid-column=\"{field:'name', sortable:true}\">Name</th>\n\t\t\t<th data-dgrid-column=\"{field:'phone', sortable:true}\">Phone</th>\n\t\t\t<th data-dgrid-column=\"{field:'city', sortable:false}\">City</th>\n\t\t</tr>\n\t</table>\n\t\t\n\t<div class=\"centerPanel\" data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region: 'center'\">\n\t\t<div class=\"floatRight\" data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"selectButton\">\n    \t    Select\n    \t</div>\t\t\n    \t<div class=\"floatRight\" data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"newButton\">\n    \t    New\n    \t</div>\n    \t<div class=\"floatLeft\" data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"cancelButton\">\n    \t    Cancel\n    \t</div>\n    </div>\n</div>"}});
define("app/uicomponents/SearchDialog", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/dom",
	"dojo/text!./templates/SearchDialog.html", // this is what includes the html template
	"dojo/_base/lang",
	"dijit/form/Button",

	//"dijit/Dialog",
	"app/uicomponents/Dialog",
	//"app/mixins/WidgetMap",
	"app/mixins/GridManager",
	"app/store/StoreManager"
	
	],
	function(declare, on, dom, template, lang, Button,
		Dialog, GridManager, StoreManager){
		
		return declare("app.uicomponents.SearchDialog", [Dialog, GridManager], {
			
			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			//templateString: template, // Our template - important!
			content: template,
			confirmCallback:null,
			title:"Find something",
			_gridHandlersAttached: false,
			storeManager:StoreManager.getInstance(),
			resultColumns:null,
			newButtonHandler:null,
			
			/**
			 * 
			 * startup is called by the framework as part of the livecycle of all widgets, it happens after the children widgets have been created and are ready to be used
			 * 
			 */
			startup:function(){
				this.inherited(arguments);
				
				this.searchGrid = this.getWidget('searchGrid');
					
				this.searchFld = this.getWidget('searchFld');
				this.newButton = this.getWidget('newButton');
				this.selectButton = this.getWidget('selectButton');
				this.cancelButton = this.getWidget('cancelButton');
				
				var configObject = {
					grid: this.searchGrid,
					editButton: this.selectButton,
					searchFld: this.searchFld
				};

				this.configureGrid(configObject);
				
			},
			
			show:function(callBack){
				if(typeof(callBack) == 'function'){
					this.confirmCallback = callBack;
				}else{
					this.confirmCallback = null;
				}
				this.inherited(arguments);
				
			},
			
			onActivate:function(callBack){
				this.inherited(arguments);
				
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}

				if(typeof(this.newButtonHandler) == "function"){
					this.eventHandlers.push( on(this.newButton, 'click', this.newButtonHandler) );
					this.newButton.domNode.style.display = "";
				}else{
					this.newButton.domNode.style.display = "none";
				}

				
				if(typeof(this.store) == "undefined" || this.store == null){
					console.warn("Unable to search, store not specified");
				}else{
					var configObject = {
						store: this.store,
						edit_store:this.edit_store,
						columns: this.resultColumns
					}
					if(typeof(this.base_query) != "undefined"){
						configObject.base_query = this.base_query;
					}

					this.setStore(configObject);
				}
				
				this.eventHandlers.push( on(this.cancelButton, 'click', lang.hitch(this, "onCancelClicked")) );
				
			},
			
			onDeactivate:function(){
				//remove event handlers
				for (var i=0; i < this.eventHandlers.length; i++) {
					var thisHandler = this.eventHandlers[i];
					if(typeof(thisHandler) != 'undefined'){
						thisHandler.remove();
					}
				};
				
				this.eventHandlers = []				
			},
			
			editEntity:function(entity){
				if(typeof(entity) != "undefined" && entity != null){
					if(this.confirmCallback){
						this.confirmCallback(entity); // pass the selected entity					
					}
					this.hide();
				}
			},
			
			
			onHide:function(){
				this.inherited(arguments);
				this.confirmCallback = null;
			},
	
			onCancelClicked: function(event){
				this.hide();
			}

	});
});
