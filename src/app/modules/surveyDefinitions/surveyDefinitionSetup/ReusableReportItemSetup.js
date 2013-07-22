define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/WizardManagerBlock",
	"app/utils/ChangeTracker"
	],
	function(declare, on, lang, WizardManagerBlock, ChangeTracker){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.ReusableReportItemSetup", [WizardManagerBlock], {
		_store:__.urls.REUSABLE_REPORT_ITEM,
		_entityLabel: "Reusable Report Item",
		changeTracker:ChangeTracker.getInstance(),
		
	    constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._steps = [
				{ title: 'Basic', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/reusableReportItemSetup/BasicInfo'},
				{ title: 'Languaged Reusable Items', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/reusableReportItemSetup/LanguagedReusableReportItemList'}
			];
	    },

	    prepareForSave:function(){
	    	this.inherited(arguments);
			var changesObject = this.changeTracker.getChangesObject(__.urls.REUSABLE_REPORT_ITEM);
			changesObject.data_definition_id = this.survey_definition_id;
			return true;
		}

	});
});