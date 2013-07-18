//>>built
define("app/modules/surveyDefinitions/surveyDefinitionSetup/questionSetup/LanguagedQuestionSetup", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/WizardManagerBlock"
	],
	function(declare, on, lang, WizardManagerBlock){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.questionSetup.LanguagedQuestionSetup", [WizardManagerBlock], {
		_store:__.urls.LANGUAGED_QUESTION,
		_entityLabel: "Languaged Question",
		
	    constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._steps = [
				{ title: 'Basic', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/questionSetup/languagedQuestionSetup/BasicInfo'}
			];
	    },

	    prepareForSave:function(){
			var changesObject = this.changeTracker.getChangesObject(__.urls.LANGUAGED_QUESTION);
			changesObject.question_id = this.question_id;
			return true;
		}

	});
});