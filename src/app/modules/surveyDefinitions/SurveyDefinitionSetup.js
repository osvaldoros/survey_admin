define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/WizardManagerBlock"
	],
	function(declare, on, lang, WizardManagerBlock){
	
	return declare("app.modules.surveyDefinitions.SurveyDefinitionSetup", [WizardManagerBlock], {
		_store:__.urls.SURVEY_DEFINITION,
		_entityLabel: "Survey Definition",
		
	    constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._steps = [
				{ title: 'Basic', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/BasicInfo'},
				{ title: 'Configure', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/Configure'}
			];
	    }		
	});
});