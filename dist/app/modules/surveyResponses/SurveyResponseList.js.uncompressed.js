//>>built
require({cache:{
'url:app/modules/surveyResponses/templates/SurveyResponseList.html':"<div>\n\t\n\t<form dojoType=\"app.form.Manager\" data-dojo-attach-point=\"surveyResponseFilteringForm\" method=\"post\">\n\t\t<div style=\"position: absolute; top: 31px;\">\n\t\t\t<select name=\"programFilter\" data-dojo-attach-point=\"programFilter\" observer=\"refreshUI\" store=\"{config:{url:'PROGRAM', selectFirst:true}}\" observer=\"refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select>\n\t\t\t<select name=\"surveyDefinitionFilter\" data-dojo-attach-point=\"surveyDefinitionFilter\" observer=\"refreshUI\" store=\"{config:{url:'SURVEY_DEFINITION', selectFirst:true}}\" observer=\"refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select>\n    \t</div>\n\t</form>\n\t\n\t<div data-dojo-attach-point=\"surveyResponseGrid\" class=\"activatable\" data-dojo-type=\"app.modules.surveyResponses.SurveyResponseGrid\"></div>\t\n\t\n</div>\n\t\t\n"}});
define("app/modules/surveyResponses/SurveyResponseList", [
	"dojo/_base/declare",
	"dojo/on",
	"dijit/_WidgetBase", 	
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",
	
	"dojo/text!./templates/SurveyResponseList.html", // this is what includes the html template
	"dojo/_base/lang",
	"dijit/form/CheckBox",		
	"./SurveyResponseGrid",
	"app/store/UIStores",
	"app/form/Manager",
	"app/form/FilteringSelect"
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, 
		template, lang, CheckBox, SurveyResponseGrid, UIStores, Manager, FilteringSelect){
	
	return declare("app.modules.surveyResponses.SurveyResponseList", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule], {
			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!
			uiStores:UIStores.getInstance(),

			startup:function(){
				this.inherited(arguments);
				this.surveyResponseGrid = this.getWidget("surveyResponseGrid");
				
				this.programFilter = this.getWidget("programFilter");
				this.surveyDefinitionFilter = this.getWidget("surveyDefinitionFilter");

				this.surveyResponseFilteringForm = this.getWidget("surveyResponseFilteringForm");
				this.surveyResponseFilteringForm.set("refreshUI", lang.hitch(this, "refreshFormUI"));

				if(typeof(this._pendingSetupDialog) != "undefined"){
					this.surveyResponseGrid.set("setupDialog", this._pendingSetupDialog);
					this._pendingSetupDialog = undefined;
				}
			},

			_setSetupDialogAttr:function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
				if(typeof(this.surveyResponseGrid) == "object" && this.surveyResponseGrid != null){
					this.surveyResponseGrid.set("setupDialog", value);
				}else{
					this._pendingSetupDialog = value;
				}
			},

			refreshFormUI:function(value, name, element, event){
				//console.log('Form needs to be refreshed');
				switch(name){
					case "programFilter":
						this.surveyResponseGrid.set("programFilter", value);
					break;
					case "surveyDefinitionFilter":
						this.surveyResponseGrid.set("surveyDefinitionFilter", value);
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