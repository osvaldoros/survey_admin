//>>built
require({cache:{
'url:app/modules/responses/responseSetup/templates/LanguagedResponseList.html':"<div>\n\t\n\t<form dojoType=\"app.form.Manager\" data-dojo-attach-point=\"languagedResponseFilteringForm\" method=\"post\">\n\t\t<div style=\"position: absolute; top: 31px;\">\n\t\t\t<select name=\"responseTypeFilter\" data-dojo-attach-point=\"responseTypeFilter\" observer=\"refreshUI\" store=\"{config:{url:'RESPONSE_TYPE', selectFirst:true}}\" observer=\"refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select>\n\t\t\t<select name=\"languageFilter\" data-dojo-attach-point=\"languageFilter\" observer=\"refreshUI\" store=\"{config:{url:'LANGUAGE', selectFirst:true}}\" observer=\"refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select>\n    \t</div>\n\t</form>\n\t\n\t<div data-dojo-attach-point=\"languagedResponseGrid\" class=\"activatable\" data-dojo-type=\"app.modules.responses.responseSetup.LanguagedResponseGrid\"></div>\t\n\t\n</div>\n\t\t\n"}});
define("app/modules/responses/responseSetup/LanguagedResponseList", [
	"dojo/_base/declare",
	"dojo/on",
	"dijit/_WidgetBase", 	
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",
	
	"dojo/text!./templates/LanguagedResponseList.html", // this is what includes the html template
	"dojo/_base/lang",
	"dijit/form/CheckBox",		
	"./LanguagedResponseGrid",
	"app/store/UIStores",
	"app/form/Manager",
	"app/form/FilteringSelect"
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, 
		template, lang, CheckBox, LanguagedResponseGrid, UIStores, Manager, FilteringSelect){
	
	return declare("app.modules.responses.responseSetup.LanguagedResponseList", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule], {
			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!
			uiStores:UIStores.getInstance(),
			_updateStateHash:"languaged-response-setup",

			startup:function(){
				this.inherited(arguments);
				this.languagedResponseGrid = this.getWidget("languagedResponseGrid");
				
				this.languageFilter = this.getWidget("languageFilter");
				this.responseTypeFilter = this.getWidget("responseTypeFilter");

				this.languagedResponseFilteringForm = this.getWidget("languagedResponseFilteringForm");
				this.languagedResponseFilteringForm.set("refreshUI", lang.hitch(this, "refreshFormUI"));

				if(typeof(this._pendingSetupDialog) != "undefined"){
					this.languagedResponseGrid.set("setupDialog", this._pendingSetupDialog);
					this._pendingSetupDialog = undefined;
				}
			},

			_setSetupDialogAttr:function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
				if(typeof(this.languagedResponseGrid) == "object" && this.languagedResponseGrid != null){
					this.languagedResponseGrid.set("setupDialog", value);
				}else{
					this._pendingSetupDialog = value;
				}
			},

			refreshFormUI:function(value, name, element, event){
				//console.log('Form needs to be refreshed');
				switch(name){
					case "languageFilter":
						this.languagedResponseGrid.set("languageFilter", value);
					break;
					case "responseTypeFilter":
						this.languagedResponseGrid.set("responseTypeFilter", value);
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