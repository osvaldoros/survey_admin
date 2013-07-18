//>>built
require({cache:{
'url:app/modules/participants/templates/ParticipantList.html':"<div>\n\t\n\t<form dojoType=\"app.form.Manager\" data-dojo-attach-point=\"participantFilteringForm\" method=\"post\">\n\t\t<div style=\"position: absolute; top: 31px;\">\n\t\t\t<select name=\"clientFilter\" data-dojo-attach-point=\"clientFilter\" observer=\"refreshUI\" store=\"{config:{url:'CLIENT', selectFirst:true}}\" observer=\"refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select>\n    \t</div>\n\t</form>\n\t\n\t<div data-dojo-attach-point=\"participantGrid\" class=\"activatable\" data-dojo-type=\"app.modules.participants.ParticipantGrid\"></div>\t\n\t\n</div>\n\t\t\n"}});
define("app/modules/participants/ParticipantList", [
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