define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/WizardManagerBlock"
	],
	function(declare, on, lang, WizardManagerBlock){
	
	return declare("app.modules.participants.ParticipantSetup", [WizardManagerBlock], {
		_store:__.urls.PARTICIPANT,
		_entityLabel: "Participant",
		
	    constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._steps = [
				{ title: 'Basic', moduleURL:'app/modules/participants/participantSetup/BasicInfo'}
			];
	    }		
	});
});