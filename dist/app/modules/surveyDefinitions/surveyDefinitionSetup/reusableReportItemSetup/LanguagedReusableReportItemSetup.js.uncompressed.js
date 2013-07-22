//>>built
define("app/modules/surveyDefinitions/surveyDefinitionSetup/reusableReportItemSetup/LanguagedReusableReportItemSetup", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/WizardManagerBlock"
	],
	function(declare, on, lang, WizardManagerBlock){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.reusableReportItemSetup.LanguagedReusableReportItemSetup", [WizardManagerBlock], {
		_store:__.urls.LANGUAGED_REUSABLE_REPORT_ITEM,
		_entityLabel: "Languaged Item",
		_autoClose:true,
		_showTabs:false,
		
	    constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._steps = [
				{ title: 'Basic', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/reusableReportItemSetup/languagedReusableReportItemSetup/BasicInfo'}
			];
	    },

	    prepareForSave:function(){
			var changesObject = this.changeTracker.getChangesObject(__.urls.LANGUAGED_REUSABLE_REPORT_ITEM);
			changesObject.reusable_report_item_id = this.reusableReportItemId;
			return true;
		}

	});
});