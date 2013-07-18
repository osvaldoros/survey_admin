//>>built
require({cache:{
'url:app/modules/programs/templates/ProgramList.html':"<div>\n\t\n\t<form dojoType=\"app.form.Manager\" data-dojo-attach-point=\"programFilteringForm\" method=\"post\">\n\t\t<div style=\"position: absolute; top: 31px;\">\n\t\t\t<select name=\"clientFilter\" data-dojo-attach-point=\"clientFilter\" observer=\"refreshUI\" store=\"{config:{url:'CLIENT', selectFirst:true}}\" observer=\"refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select>\n    \t</div>\n\t</form>\n\t\n\t<div data-dojo-attach-point=\"programGrid\" class=\"activatable\" data-dojo-type=\"app.modules.programs.ProgramGrid\"></div>\t\n\t\n</div>\n\t\t\n"}});
define("app/modules/programs/ProgramList", [
	"dojo/_base/declare",
	"dojo/on",
	"dijit/_WidgetBase", 	
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",
	
	"dojo/text!./templates/ProgramList.html", // this is what includes the html template
	"dojo/_base/lang",
	"dijit/form/CheckBox",		
	"./ProgramGrid",
	"app/store/UIStores",
	"app/form/Manager",
	"app/form/FilteringSelect"
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, 
		template, lang, CheckBox, ProgramGrid, UIStores, Manager, FilteringSelect){
	
	return declare("app.modules.programs.ProgramList", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule], {
			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!
			uiStores:UIStores.getInstance(),

			startup:function(){
				this.inherited(arguments);
				this.programGrid = this.getWidget("programGrid");
				
				this.clientFilter = this.getWidget("clientFilter");

				this.programFilteringForm = this.getWidget("programFilteringForm");
				this.programFilteringForm.set("refreshUI", lang.hitch(this, "refreshFormUI"));

				if(typeof(this._pendingSetupDialog) != "undefined"){
					this.programGrid.set("setupDialog", this._pendingSetupDialog);
					this._pendingSetupDialog = undefined;
				}
			},

			_setSetupDialogAttr:function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
				if(typeof(this.programGrid) == "object" && this.programGrid != null){
					this.programGrid.set("setupDialog", value);
				}else{
					this._pendingSetupDialog = value;
				}
			},

			refreshFormUI:function(value, name, element, event){
				//console.log('Form needs to be refreshed');
				switch(name){
					case "clientFilter":
						this.programGrid.set("clientFilter", value);
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