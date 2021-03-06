define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/WizardManagerBlock"
	],
	function(declare, on, lang, WizardManagerBlock){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.reportRuleSetup.LanguagedReportRuleSetup", [WizardManagerBlock], {
		_store:__.urls.LANGUAGED_REPORT_RULE,
		_entityLabel: "Languaged Report Item",
		_showTabs:false,
		_autoClose:true,
		
	    constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._steps = [
				{ title: 'Basic', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/reportRuleSetup/languagedReportRuleSetup/BasicInfo'},
				{ title: 'Languaged Items', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/reportRuleSetup/LanguagedReportRuleList'}
			];
	    },

	    prepareForSave:function(){
			var changesObject = this.changeTracker.getChangesObject(__.urls.LANGUAGED_REPORT_RULE);
			changesObject.report_rule_id = this.report_rule_id;
			return true;
		}

	});
});