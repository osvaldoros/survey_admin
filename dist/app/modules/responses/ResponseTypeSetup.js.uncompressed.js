//>>built
define("app/modules/responses/ResponseTypeSetup", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/WizardManagerBlock"
	],
	function(declare, on, lang, WizardManagerBlock){
	
	return declare("app.modules.responses.ResponseTypeSetup", [WizardManagerBlock], {
		_store:__.urls.RESPONSE_TYPE,
		_entityLabel: "Response Type",
		_showTabs:false,
		_autoClose:true,

	    constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._steps = [
				{ title: 'Basic', moduleURL:'app/modules/responses/responseTypeSetup/BasicInfo'}
			];
	    }		
	});
});