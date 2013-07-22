define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/WizardManagerBlock",
	"app/utils/ChangeTracker"
	],
	function(declare, on, lang, WizardManagerBlock, ChangeTracker){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.ReportRuleSetup", [WizardManagerBlock], {
		_store:__.urls.REPORT_RULE,
		_entityLabel: "Report Item",
		changeTracker:ChangeTracker.getInstance(),
		
	    constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._steps = [
				{ title: 'Basic', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/reportRuleSetup/BasicInfo'},
				{ title: 'Languaged Items', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/reportRuleSetup/LanguagedReportRuleList'}
			];
	    },

	    prepareForSave:function(){
	    	this.inherited(arguments);
			var changesObject = this.changeTracker.getChangesObject(__.urls.REPORT_RULE);
			changesObject.data_definition_id = this.survey_definition_id;
			return true;
		}

	});
});