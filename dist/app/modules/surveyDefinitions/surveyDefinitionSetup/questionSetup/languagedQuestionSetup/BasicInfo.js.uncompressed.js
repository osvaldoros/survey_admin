//>>built
require({cache:{
'url:app/modules/surveyDefinitions/surveyDefinitionSetup/questionSetup/languagedQuestionSetup/templates/BasicInfo.html':"<div class=\"moduleContainer\" class=\"centerPanel\" data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region: 'center'\">\n\t\n\t<form dojoType=\"app.form.Manager\" data-dojo-attach-point=\"languagedQuestionBasicInfoForm\" method=\"post\">\n\t\t<table cellpadding=\"0\" cellspacing=\"2\" style=\"width: 100%;\">\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Language*: </td>\n\t\t\t\t<td><select name=\"language_id\" data-dojo-attach-point=\"languageBox\" observer=\"refreshUI,recordChange\" store=\"{config:{url:'LANGUAGE', selectFirst:true}}\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td colspan=\"3\"><div data-dojo-attach-point=\"nameBox\" name=\"name\"  observer=\"recordChange\" data-dojo-type=\"app.uicomponents.Editor\" style=\"width:470px;\"></div></td>\n\t\t\t</tr>\n\t\t</table>\n\t</form>\n\n</div>"}});
define("app/modules/surveyDefinitions/surveyDefinitionSetup/questionSetup/languagedQuestionSetup/BasicInfo", [
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
	"app/uicomponents/Map"
	
	
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, template, lang, Deferred, registry, Dialog, GridFromHtml, Memory, Observable, Cache, JsonRest, Selection, parser, query, Button,
			Validate, Validate_web, Manager, DCFormManager, Textarea, TextBox, TimeTextBox, DateTextBox, Select, ComboBox, FilteringSelect, CheckBox, RadioButton, ValidationTextBox, CheckedMultiSelect, BusyButton,
			UIStores, Map){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.questionSetup.languagedQuestionSetup.BasicInfo", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, DCFormManager], {

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
				
				// get a reference to the form and set the storeURL on it ( the store to which this form would commit data )				
				this.languagedQuestionBasicInfoForm = this.getWidget('languagedQuestionBasicInfoForm');
				this.languagedQuestionBasicInfoForm.set('storeURL', __.urls.LANGUAGED_QUESTION);
				this.languagedQuestionBasicInfoForm.set('refreshUI', lang.hitch(this, "refreshFormUI"));
				
				
				this.configureForm(this.languagedQuestionBasicInfoForm);
			},
			
			refreshFormUI:function(value, name, element, event){
			},
			
			onActivate:function(){
				this.inherited(arguments);
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}
				var entity = this.getUpdatingEntity();
				this.viewInForm(entity, this.languagedQuestionBasicInfoForm);				
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
