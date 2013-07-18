//>>built
require({cache:{
'url:app/modules/templates/SurveyResponses.html':"<div class=\"moduleContainer\">\n\t<div data-dojo-attach-point=\"surveyResponseList\" class=\"activatable\" data-dojo-type=\"app.modules.surveyResponses.SurveyResponseList\"></div>\n\t<div data-dojo-attach-point=\"surveyResponseSetupDialog\" class=\"activatable includeInStates dialogsetup\" data-dojo-type=\"app.loader.DialogLauncher\" data-dojo-props=\"moduleURL: 'app/modules/surveyResponses/SurveyResponseSetup', title : 'Survey Response Setup',  dialogWidth: '800px', dialogHeight: '620px'\"></div>\n</div>\n\t\t\n"}});
define("app/modules/SurveyResponses", [
	"dojo/_base/declare",
	"dojo/on",
	"dijit/_WidgetBase", 	
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",

	"dojo/text!./templates/SurveyResponses.html", // this is what includes the html template
	"dojo/_base/lang",
	
	"dijit/form/Button",
	"app/modules/surveyResponses/SurveyResponseList",
	"app/loader/DialogLauncher",
	"app/utils/HashManager"
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, 
		template, lang, 
		Button, ClientList, DialogLauncher, HashManager){
	
	return declare("app.modules.SurveyResponses", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule], {
			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!
			hashManager: HashManager.getInstance(),

			
			setCurrentState:function(state){
				this.inherited(arguments);
				if(this.getCurrentState() == ''){
					this.hashManager.setState('list');
				}
			}
			
	});
});
