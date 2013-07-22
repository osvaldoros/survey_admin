//>>built
require({cache:{
'url:app/modules/templates/SurveyDefinitions.html':"<div class=\"moduleContainer\">\n\t<div data-dojo-attach-point=\"surveyDefinitionList\" class=\"activatable\" data-dojo-type=\"app.modules.surveyDefinitions.SurveyDefinitionList\"></div>\n\t<div data-dojo-attach-point=\"surveyDefinitionSetupDialog\" class=\"activatable includeInStates dialogsetup\" data-dojo-type=\"app.loader.DialogLauncher\" data-dojo-props=\"moduleURL: 'app/modules/surveyDefinitions/SurveyDefinitionSetup', title : 'Survey Definition Setup',  dialogWidth: '800px', dialogHeight: '520px'\"></div>\n</div>\n\t\t\n"}});
define("app/modules/SurveyDefinitions", [
	"dojo/_base/declare",
	"dojo/on",
	"dijit/_WidgetBase", 	
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",

	"dojo/text!./templates/SurveyDefinitions.html", // this is what includes the html template
	"dojo/_base/lang",
	
	"dijit/form/Button",
	"app/modules/surveyDefinitions/SurveyDefinitionList",
	"app/loader/DialogLauncher",
	"app/utils/HashManager"
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, 
		template, lang, 
		Button, ClientList, DialogLauncher, HashManager){
	
	return declare("app.modules.SurveyDefinitions", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule], {
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
