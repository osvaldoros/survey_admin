//>>built
require({cache:{
'url:app/modules/surveyDefinitions/surveyDefinitionSetup/templates/BasicInfo.html':"<div class=\"moduleContainer\" data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region: 'center'\" style=\"overflow: auto; height:475px; margin-bottom: 5px;\">\n\t\n\t<form dojoType=\"app.form.Manager\" data-dojo-attach-point=\"surveyDefinitionBasicInfoForm\" method=\"post\">\n\t\t<table cellpadding=\"0\" cellspacing=\"2\" style=\"width: 100%;\">\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Name*: </td>\n\t\t\t\t<td><input type=\"text\" required=\"true\" name=\"name\" data-dojo-attach-point=\"name\" observer=\"recordChange\" placeholder=\"Acme Lab Inc\" dojoType=\"dijit.form.ValidationTextBox\" missingMessage=\"Ooops!  You forgot the survey Definition name\" /></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Program: </td>\n\t\t\t\t<td><select data-dojo-attach-point=\"program\" name=\"program_id\" data-dojo-attach-point=\"programBox\" store=\"{config:{url:'PROGRAM', selectFirst:true}}\" observer=\"recordChange, refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t</table>\n\t</form>\n\n\n\t<div style=\"clear: both;\" class=\"centerPanel\" data-dojo-attach-point=\"_tabs\" data-dojo-type=\"dijit.layout.TabContainer\" data-dojo-props=\"region: 'center'\" nested=\"true\" doLayout=\"false\"></div>\n\n\t<!--\n\t<div data-dojo-attach-point=\"questionList\" data-dojo-type=\"app.modules.surveyDefinitions.surveyDefinitionSetup.QuestionList\"></div>\n\t<div data-dojo-attach-point=\"navigationRuleList\" data-dojo-type=\"app.modules.surveyDefinitions.surveyDefinitionSetup.NavigationRuleList\"></div>\n\t<div data-dojo-attach-point=\"reportRuleList\" data-dojo-type=\"app.modules.surveyDefinitions.surveyDefinitionSetup.ReportRuleList\"></div>\n\t-->\n\t\n</div>"}});
define("app/modules/surveyDefinitions/surveyDefinitionSetup/BasicInfo", [
	"dojo/_base/declare",
	"dojo/on",
	"dijit/_WidgetBase", 
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",
	"dojo/text!./templates/BasicInfo.html", // this is what includes the html template
	"dojo/_base/lang",
	"dojo/_base/Deferred",
	"dijit/registry",
	"dijit/Dialog",
	
	"dgrid/GridFromHtml", 
	"dojo/store/Memory", 
	"dojo/store/Observable", 
	"dojo/store/Cache", 
	"app/store/JsonRest", 
	"dgrid/Selection", 
	"dojo/parser", 
	"dojo/query", 
	"dijit/form/Button",
	
	"dojox/validate",
	"dojox/validate/web",
	"app/form/Manager",
	"app/mixins/FormManager",	
	"dijit/form/Textarea",
	"dijit/form/TextBox",
	"dijit/form/TimeTextBox",
	"dijit/form/DateTextBox",
	"dijit/form/Select",
	"dijit/form/ComboBox",
	"app/form/FilteringSelect",
	"dijit/form/CheckBox",
	"dijit/form/RadioButton",
	"dijit/form/ValidationTextBox",
	
	"dojox/form/CheckedMultiSelect",
	"dojox/form/BusyButton",
	
	"app/store/UIStores",
	"app/uicomponents/Map",

	"app/mixins/TabManager"
	//"app/modules/surveyDefinitions/surveyDefinitionSetup/QuestionList",
	//"app/modules/surveyDefinitions/surveyDefinitionSetup/NavigationRuleList",
	//"app/modules/surveyDefinitions/surveyDefinitionSetup/ReportRuleList"
	
	
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, template, lang, Deferred, registry, Dialog, GridFromHtml, Memory, Observable, Cache, JsonRest, Selection, parser, query, Button,
			Validate, Validate_web, Manager, DCFormManager, Textarea, TextBox, TimeTextBox, DateTextBox, Select, ComboBox, FilteringSelect, CheckBox, RadioButton, ValidationTextBox, CheckedMultiSelect, BusyButton,
			UIStores, Map, TabManager/*, QuestionList, NavigationRuleList, ReportRuleList*/){
	
	/*
	 * 
	 * *IMPORTANT
	 * 
	 * This component doesn't extend ContentPane because of an inconsisten behaviour in the Dojo framework. 
	 * 
	 *  - instances of Dgrid cannot be access via diji.byId('')
	 *  - when using ContentPane the template is assigned to the content property therefore attach-points are inaccesible and the only way to access components is diji.byId()
	 *  - Not extending ContentPane (or similar) means we are not a true dijit widget? (guess) and so layout widgets don't render properly so whenever we use grids we must be careful
	 * 
	 * TODO: 
	 * 
	 *  - find a way to make components that don't extend ContentPane that can render all layout widgets correctly, Then we'll be able to get the best of both worlds.
	 * 
	 */
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.BasicInfo", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, DCFormManager, TabManager], {

			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!
			uiStores: UIStores.getInstance(),
	
			/**
			 * 
			 * startup is called by the framework as part of the livecycle of all widgets, it happens after the children widgets have been created and are ready to be used
			 * Notice we don't use postCreate because the child widgets haven't been created yet, and we need to wait for the dgrid to attach the store to it
			 * 
			 */
			startup:function(){
				this.inherited(arguments);


				//this.questionList = this.getWidget('questionList');
				//this.navigationRuleList = this.getWidget('navigationRuleList');
				//this.reportRuleList = this.getWidget('reportRuleList');
				
				// get a reference to the form and set the storeURL on it ( the store to which this form would commit data )				
				this.surveyDefinitionBasicInfoForm = this.getWidget('surveyDefinitionBasicInfoForm');
				this.surveyDefinitionBasicInfoForm.set('storeURL', __.urls.SURVEY_DEFINITION);
				this.surveyDefinitionBasicInfoForm.set('refreshUI', lang.hitch(this, "refreshFormUI"));


				this._tabs = this.getWidget("_tabs");
				
				var tabsConfig = {
					tabs: this._tabs,
					steps: [
						{ title: 'Questions', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/QuestionList'},
						{ title: 'Navigation Rules', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/NavigationRuleList'},
						{ title: 'Report Rules', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/ReportRuleList'}
					]
				}

				this.configureTabs(tabsConfig);
				this.configureForm(this.surveyDefinitionBasicInfoForm);
			},
			
			refreshFormUI:function(value, name, element, event){
			},
			
			onActivate:function(){
				this.inherited(arguments);
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}						

				var surveyDefinition = this.getUpdatingEntity();
				
				if(typeof(surveyDefinition) == "object" && surveyDefinition != null){

					this.setOnChildren("survey_definition_id", surveyDefinition.id, true);
					/*this.questionList.set("survey_definition_id", surveyDefinition.id, true);		
					this.navigationRuleList.set("survey_definition_id", surveyDefinition.id, true);		
					this.reportRuleList.set("survey_definition_id", surveyDefinition.id, true);		*/
				}else{
					this.setOnChildren("survey_definition_id", null, true);
					/*this.questionList.set("survey_definition_id", null, true);		
					this.navigationRuleList.set("survey_definition_id", null, true);		
					this.reportRuleList.set("survey_definition_id", null, true);		*/
				}

				/*this.questionList.activate();	
				this.navigationRuleList.activate();	
				this.reportRuleList.activate();	
				*/

				this.viewInForm(surveyDefinition, this.surveyDefinitionBasicInfoForm);				
			},

			deactivate:function(){
				//this.questionList.deactivate();
				this.inherited(arguments);
			},
			
			onDeactivate:function(){
				//remove event handlers
				for (var i=0; i < this.eventHandlers.length; i++) {
					var thisHandler = this.eventHandlers[i];
					if(typeof(thisHandler) != 'undefined'){
						thisHandler.remove();
					}
				};
				
				this.eventHandlers = []				
			},
			
			
			destroy:function(){
    			this.inherited(arguments);	
			}
	});
});
