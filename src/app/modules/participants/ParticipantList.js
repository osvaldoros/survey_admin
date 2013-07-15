define([
	"dojo/_base/declare",
	"dojo/on",
	"dijit/_WidgetBase", 	
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",
	
	"dojo/text!./templates/ParticipantList.html", // this is what includes the html template
	"dojo/_base/lang",
	"dijit/form/CheckBox",		
	"./ParticipantGrid",
	"app/store/UIStores",
	"app/form/Manager",
	"app/form/FilteringSelect"
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, 
		template, lang, CheckBox, ParticipantGrid, UIStores, Manager, FilteringSelect){
	
	return declare("app.modules.participants.ParticipantList", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule], {
			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!
			uiStores:UIStores.getInstance(),

			startup:function(){
				this.inherited(arguments);
				this.participantGrid = this.getWidget("participantGrid");
				
				this.clientFilter = this.getWidget("clientFilter");

				this.participantFilteringForm = this.getWidget("participantFilteringForm");
				this.participantFilteringForm.set("refreshUI", lang.hitch(this, "refreshFormUI"));

				if(typeof(this._pendingSetupDialog) != "undefined"){
					this.participantGrid.set("setupDialog", this._pendingSetupDialog);
					this._pendingSetupDialog = undefined;
				}
			},

			_setSetupDialogAttr:function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
				if(typeof(this.participantGrid) == "object" && this.participantGrid != null){
					this.participantGrid.set("setupDialog", value);
				}else{
					this._pendingSetupDialog = value;
				}
			},

			refreshFormUI:function(value, name, element, event){
				//console.log('Form needs to be refreshed');
				switch(name){
					case "clientFilter":
						this.participantGrid.set("clientFilter", value);
					break;					
				}

			},
			
			onActivate:function(){
				this.inherited(arguments);
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}						
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
			}
			
			
	});
});