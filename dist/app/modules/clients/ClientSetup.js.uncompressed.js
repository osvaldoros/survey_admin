//>>built
define("app/modules/clients/ClientSetup", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/WizardManagerBlock"
	],
	function(declare, on, lang, WizardManagerBlock){
	
	return declare("app.modules.clients.ClientSetup", [WizardManagerBlock], {
		_store:__.urls.CLIENT,
		_entityLabel: "client",
		
	    constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._steps = [
				{ title: 'Basic', moduleURL:'app/modules/clients/clientSetup/BasicInfo'}
			];
	    }		
	});
});