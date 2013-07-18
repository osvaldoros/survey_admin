//>>built
define("app/modules/programs/ProgramSetup", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/WizardManagerBlock"
	],
	function(declare, on, lang, WizardManagerBlock){
	
	return declare("app.modules.programs.ProgramSetup", [WizardManagerBlock], {
		_store:__.urls.PROGRAM,
		_entityLabel: "Program",
		
	    constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._steps = [
				{ title: 'Basic', moduleURL:'app/modules/programs/programSetup/BasicInfo'}
			];
	    }		
	});
});