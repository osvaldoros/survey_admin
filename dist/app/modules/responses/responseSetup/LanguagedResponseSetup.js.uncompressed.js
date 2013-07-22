//>>built
define("app/modules/responses/responseSetup/LanguagedResponseSetup", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/WizardManagerBlock"
	],
	function(declare, on, lang, WizardManagerBlock){
	
	return declare("app.modules.responses.responseSetup.LanguagedResponseSetup", [WizardManagerBlock], {
		_store:__.urls.LANGUAGED_RESPONSE,
		_entityLabel: "Languaged Response",
		_autoClose:true,
		_showTabs:false,
		
	    constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._steps = [
				{ title: 'Basic', moduleURL:'app/modules/responses/responseSetup/languagedResponseSetup/BasicInfo'}
			];
	    },

	    prepareForSave:function(){
			var changesObject = this.changeTracker.getChangesObject(__.urls.LANGUAGED_RESPONSE);
			changesObject.response_id = this.response_id;
			return true;
		}

	});
});