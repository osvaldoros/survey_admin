//>>built
require({cache:{
'url:app/modules/surveyDefinitions/surveyDefinitionSetup/questionSetup/templates/BasicInfo.html':"<div class=\"moduleContainer\" class=\"centerPanel\" data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region: 'center'\">\n\t\n\t<form dojoType=\"app.form.Manager\" data-dojo-attach-point=\"questionBasicInfoForm\" method=\"post\">\n\t\t<table cellpadding=\"0\" cellspacing=\"2\" style=\"width: 100%;\">\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Name*: </td>\n\t\t\t\t<td><input type=\"text\" required=\"true\" name=\"name\" data-dojo-attach-point=\"nameBox\" observer=\"recordChange\" placeholder=\"Acme Lab Inc\" dojoType=\"dijit.form.ValidationTextBox\" missingMessage=\"Ooops!  You forgot the question name\" /></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Order: </td>\n\t\t\t\t<td><input type=\"text\" required=\"true\" name=\"order\" data-dojo-attach-point=\"orderBox\" observer=\"recordChange\" placeholder=\"0\" dojoType=\"dijit.form.NumberSpinner\" data-dojo-props=\"smallDelta:1, constraints:{min:0, max:200, places:0}\" /></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Question group: </td>\n\t\t\t\t<td><select data-dojo-attach-point=\"question_group_idBox\" name=\"question_group_id\" store=\"{config:{url:'QUESTION_GROUP'}}\" observer=\"recordChange, refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\t\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Symptom: </td>\n\t\t\t\t<td><input type=\"text\" required=\"true\" name=\"symptom_short_name\" data-dojo-attach-point=\"symptom_short_nameBox\" observer=\"recordChange\" placeholder=\"Symptom\" dojoType=\"dijit.form.ValidationTextBox\" /></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\t\t\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Answer Type: </td>\n\t\t\t\t<td><select data-dojo-attach-point=\"control_type_idBox\" name=\"control_type_id\" store=\"{config:{url:'CONTROL_TYPE'}}\" observer=\"recordChange, refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Answer Choices: </td>\n\t\t\t\t<td><select data-dojo-attach-point=\"response_typeBox\" name=\"response_type_id\" store=\"{config:{url:'RESPONSE_TYPE'}}\" observer=\"recordChange, refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\n\t\t</table>\n\t</form>\n\t\n</div>"}});
define("app/modules/surveyDefinitions/surveyDefinitionSetup/questionSetup/BasicInfo", [
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
	"dijit/form/NumberSpinner",
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
			Validate, Validate_web, Manager, DCFormManager, Textarea, TextBox, TimeTextBox, DateTextBox, NumberSpinner, Select, ComboBox, FilteringSelect, CheckBox, RadioButton, ValidationTextBox, CheckedMultiSelect, BusyButton,
			UIStores, Map){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.questionSetup.BasicInfo", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, DCFormManager], {

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
				this.questionBasicInfoForm = this.getWidget('questionBasicInfoForm');
				this.questionBasicInfoForm.set('storeURL', __.urls.QUESTION);
				this.questionBasicInfoForm.set('refreshUI', lang.hitch(this, "refreshFormUI"));
				
				
				this.configureForm(this.questionBasicInfoForm);
			},
			
			refreshFormUI:function(value, name, element, event){
			},
			
			onActivate:function(){
				this.inherited(arguments);
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}								

				var question = this.getUpdatingEntity();
				this.viewInForm(question, this.questionBasicInfoForm);	

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
