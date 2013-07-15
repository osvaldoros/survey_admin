define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/WizardManagerBlock"
	],
	function(declare, on, lang, WizardManagerBlock){
	
	return declare("app.modules.surveyResponses.SurveyResponseSetup", [WizardManagerBlock], {
		_store:__.urls.SURVEY_RESPONSE,
		_entityLabel: "SurveyResponse",
		
	    constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._steps = [
				{ title: 'Basic', moduleURL:'app/modules/surveyResponses/surveyResponseSetup/BasicInfo'}
			];

			this._extraButtons = [
				{label:"Edit Questions", handler:lang.hitch(this, "onEditQuestionsClicked"), instanceName:"_addPrepaymentButton"}
			]
	    },

	    onEditQuestionsClicked:function(){

	    }
	    
	});
});