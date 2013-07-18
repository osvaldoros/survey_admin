//>>built
define("app/modules/surveyDefinitions/surveyDefinitionSetup/NavigationRuleSetup", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/WizardManagerBlock",
	"app/utils/ChangeTracker"
	],
	function(declare, on, lang, WizardManagerBlock, ChangeTracker){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.NavigationRuleSetup", [WizardManagerBlock], {
		_store:__.urls.NAVIGATION_RULE,
		_entityLabel: "Rule",
		changeTracker:ChangeTracker.getInstance(),
		
	    constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._steps = [
				{ title: 'Basic', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/navigationRuleSetup/BasicInfo'}
			];
	    },

	    prepareForSave:function(){
			var changesObject = this.changeTracker.getChangesObject(__.urls.NAVIGATION_RULE);
			changesObject.data_definition_id = this.survey_definition_id;
			return true;
		}

	});
});