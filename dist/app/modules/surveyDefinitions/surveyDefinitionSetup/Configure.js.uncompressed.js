//>>built
require({cache:{
'url:app/modules/surveyDefinitions/surveyDefinitionSetup/templates/Configure.html':"<div class=\"moduleContainer\" data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region: 'center'\">\n\t<div style=\"clear: both;\" class=\"centerPanel\" data-dojo-attach-point=\"_tabs\" data-dojo-type=\"dijit.layout.TabContainer\" data-dojo-props=\"region: 'center'\" nested=\"true\" doLayout=\"false\"></div>\n</div>"}});
define("app/modules/surveyDefinitions/surveyDefinitionSetup/Configure", [
	"dojo/_base/declare",
	"dojo/on",
	"dijit/_WidgetBase", 
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",
	"dojo/text!./templates/Configure.html", // this is what includes the html template
	"dojo/_base/lang",
	
	"app/store/UIStores",
	"app/mixins/FormManager",	
	"app/mixins/TabManager"
	
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, template, lang,
			UIStores, DCFormManager, TabManager){
	
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.Configure", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, DCFormManager, TabManager], {

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
				
				this._tabs = this.getWidget("_tabs");
				
				var tabsConfig = {
					tabs: this._tabs,
					steps: [
						{ title: 'Questions', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/QuestionList'},
						{ title: 'Navigation Rules', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/NavigationRuleList'},
						{ title: 'Report Rules', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/ReportRuleList'}
						//{ title: 'Reusable Report Items', moduleURL:'app/modules/surveyDefinitions/surveyDefinitionSetup/ReusableReportItemList'}
					]
				}

				this.configureTabs(tabsConfig);
			},
			
			onActivate:function(){
				this.inherited(arguments);
				
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}						
				var surveyDefinition = this.getUpdatingEntity();
				
				if(typeof(surveyDefinition) == "object" && surveyDefinition != null){
					this.setOnChildren("survey_definition_id", surveyDefinition.id, true);
				}else{
					this.setOnChildren("survey_definition_id", null, true);
				}
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
				this.inherited(arguments);			
			}
			
	});
});
