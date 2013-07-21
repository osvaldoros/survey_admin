define([
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
	"app/utils/ChangeTracker",
	"app/uicomponents/Map"
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, template, lang, Deferred, registry, Dialog, GridFromHtml, Memory, Observable, Cache, JsonRest, Selection, parser, query, Button,
			Validate, Validate_web, Manager, DCFormManager, Textarea, TextBox, TimeTextBox, DateTextBox, Select, ComboBox, FilteringSelect, CheckBox, RadioButton, ValidationTextBox, CheckedMultiSelect, BusyButton,
			UIStores, ChangeTracker, Map){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.navigationRuleSetup.BasicInfo", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, DCFormManager], {

			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!
			uiStores: UIStores.getInstance(),
			changeTracker: ChangeTracker.getInstance(),
	
			/**
			 * 
			 * startup is called by the framework as part of the livecycle of all widgets, it happens after the children widgets have been created and are ready to be used
			 * Notice we don't use postCreate because the child widgets haven't been created yet, and we need to wait for the dgrid to attach the store to it
			 * 
			 */
			startup:function(){
				this.inherited(arguments);
				
				this.response_value_conditionBox = this.getWidget('response_value_conditionBox');
				this.from_question_idBox = this.getWidget('from_question_idBox');
				this.question_to_evaluate_idBox = this.getWidget('question_to_evaluate_idBox');
				this.to_question_idBox = this.getWidget('to_question_idBox');
				// get a reference to the form and set the storeURL on it ( the store to which this form would commit data )				
				this.navigationRuleBasicInfoForm = this.getWidget('navigationRuleBasicInfoForm');
				this.navigationRuleBasicInfoForm.set('storeURL', __.urls.NAVIGATION_RULE);
				this.navigationRuleBasicInfoForm.set('refreshUI', lang.hitch(this, "refreshFormUI"));

				this.uiStores.populateComboDynamicREST(this.response_value_conditionBox, __.urls.RESPONSE_CODE, lang.hitch(this, "responseCodeBaseQuery"));
				
				
				this.configureForm(this.navigationRuleBasicInfoForm);
			},
			
			onActivate:function(){
				this.inherited(arguments);
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}								

				var navigationRule = this.getUpdatingEntity();
				this.viewInForm(navigationRule, this.navigationRuleBasicInfoForm);	

			},

			refreshFormUI:function(value, name, element, event){
				switch(name){
					case "from_question_id":
						this.question_to_evaluate_idBox.set("value", value);
						this.uiStores.populateComboDynamicREST(this.response_value_conditionBox, __.urls.RESPONSE_CODE, lang.hitch(this, "responseCodeBaseQuery"));
					break;
				}
			},

			prepareForSave:function(){

				var changesObject = this.changeTracker.getChangesObject(__.urls.NAVIGATION_RULE);

				for(var p in changesObject){
					if(p == "from_question_id") changesObject["from_question_display"] = this.from_question_idBox.item.name
					if(p == "question_to_evaluate_id") changesObject["question_to_evaluate_display"] = this.question_to_evaluate_idBox.item.name
					if(p == "to_question_id") changesObject["to_question_display"] = this.to_question_idBox.item.name
					if(p == "response_value_condition") changesObject["response_value_condition_display"] = this.response_value_conditionBox.item.name
				}

				return true;
			},

			responseCodeBaseQuery:function(){
				var questionItem = this.question_to_evaluate_idBox.item;
				if(typeof(questionItem) == "object" && questionItem != null){
					return {response_type:questionItem.response_type};
				}

				return false;
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
