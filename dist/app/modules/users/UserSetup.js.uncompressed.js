//>>built
define("app/modules/users/UserSetup", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/WizardManagerBlock"
	],
	function(declare, on, lang, WizardManagerBlock){
	
	return declare("app.modules.users.UserSetup", [WizardManagerBlock], {
		_store:__.urls.USER,
		_entityLabel: "User",
		
	    constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._steps = [
				{ title: 'Basic', moduleURL:'app/modules/users/userSetup/BasicInfo'}
			];
	    }		
	});
});