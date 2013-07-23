//>>built
require({cache:{
'url:app/modules/surveyDefinitions/surveyDefinitionSetup/reportRuleSetup/templates/BasicInfo.html':"<div class=\"moduleContainer\" class=\"centerPanel\" data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region: 'center'\">\n\t\n\t<form dojoType=\"app.form.Manager\" data-dojo-attach-point=\"reportRuleBasicInfoForm\" method=\"post\">\n\t\t<table cellpadding=\"0\" cellspacing=\"2\" style=\"width: 100%;\">\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Name*: </td>\n\t\t\t\t<td><input type=\"text\" required=\"true\" name=\"name\" data-dojo-attach-point=\"nameBox\" observer=\"recordChange\" placeholder=\"Acme Lab Inc\" dojoType=\"dijit.form.ValidationTextBox\" missingMessage=\"Ooops!  You forgot the report Rule name\" /></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Order: </td>\n\t\t\t\t<td><input type=\"text\" required=\"true\" name=\"order\" data-dojo-attach-point=\"orderBox\" observer=\"recordChange\" placeholder=\"0\" dojoType=\"dijit.form.NumberSpinner\" data-dojo-props=\"smallDelta:1, constraints:{min:0, max:200, places:0}\" /></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\t\t\t\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Reusable report item: </td>\n\t\t\t\t<td><select data-dojo-attach-point=\"reusable_report_item_idBox\" name=\"reusable_report_item_id\" store=\"{config:{url:'REUSABLE_REPORT_ITEM'}}\" observer=\"recordChange, refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td></td>\n\t\t\t\t<td><span><strong>Rule</strong></span></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\t\t\t\n\t\t\t<tr>\n\t\t\t\t<td colspan=\"3\"><textarea name=\"rule\" data-dojo-attach-point=\"ruleBox\" style=\"width:100%;\" observer=\"recordChange\" data-dojo-type=\"dijit.form.Textarea\"></textarea></td>\n\t\t\t</tr>\t\t\n\t\t</table>\n\t</form>\n</div>"}});
define("app/modules/surveyDefinitions/surveyDefinitionSetup/reportRuleSetup/BasicInfo", [
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
	"dijit/form/NumberSpinner",
	"dijit/form/ComboBox",
	"app/form/FilteringSelect",
	"dijit/form/CheckBox",
	"dijit/form/RadioButton",
	"dijit/form/ValidationTextBox",
	
	"dojox/form/CheckedMultiSelect",
	"dojox/form/BusyButton",
	
	"app/store/UIStores",
	"app/uicomponents/Map",
	"./LanguagedReportRuleList",
	"app/utils/ChangeTracker"

	
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, template, lang, Deferred, registry, Dialog, GridFromHtml, Memory, Observable, Cache, JsonRest, Selection, parser, query, Button,
			Validate, Validate_web, Manager, DCFormManager, Textarea, TextBox, TimeTextBox, DateTextBox, Select, NumberSpinner, ComboBox, FilteringSelect, CheckBox, RadioButton, ValidationTextBox, CheckedMultiSelect, BusyButton,
			UIStores, Map, LanguagedReportRuleList, ChangeTracker){
	
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.reportRuleSetup.BasicInfo", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, DCFormManager], {

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
				
				this.question_idBox = this.getWidget('question_idBox');
				this.response_value_conditionBox = this.getWidget('response_value_conditionBox');

				// get a reference to the form and set the storeURL on it ( the store to which this form would commit data )				
				this.reportRuleBasicInfoForm = this.getWidget('reportRuleBasicInfoForm');
				this.reportRuleBasicInfoForm.set('storeURL', __.urls.REPORT_RULE);
				this.reportRuleBasicInfoForm.set('refreshUI', lang.hitch(this, "refreshFormUI"));
				
				//this.uiStores.populateComboDynamicREST(this.response_value_conditionBox, __.urls.RESPONSE_CODE, lang.hitch(this, "responseCodeBaseQuery"));

				this.configureForm(this.reportRuleBasicInfoForm);
			},
			
			refreshFormUI:function(value, name, element, event){
				switch(name){
					case "question_id":
						//this.uiStores.populateComboDynamicREST(this.response_value_conditionBox, __.urls.RESPONSE_CODE, lang.hitch(this, "responseCodeBaseQuery"));
					break;
				}
			},


			responseCodeBaseQuery:function(){
				var questionItem = this.question_idBox.item;
				if(typeof(questionItem) == "object" && questionItem != null){
					return {response_type:questionItem.response_type};
				}

				return false;
			},
			
			prepareForSave:function(){

				var changesObject = this.changeTracker.getChangesObject(__.urls.REPORT_RULE);

				for(var p in changesObject){
					if(p == "question_id") changesObject["question_display"] = this.question_idBox.item.name
					if(p == "response_value_condition") changesObject["response_value_condition_display"] = this.response_value_conditionBox.item.name
					if(p == "reusable_report_item_id") changesObject["reusable_report_item_display"] = this.reusable_report_item_idBox.item.name
				}

				return true;
			},
			
			onActivate:function(){
				this.inherited(arguments);
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}						

				var reportRule = this.getUpdatingEntity();		

				this.viewInForm(reportRule, this.reportRuleBasicInfoForm);	

			},
			
			onDeactivate:function(){
				//remove event handlers
				for (var i=0; i < this.eventHandlers.length; i++) {
					var thisHandler = this.eventHandlers[i];
					if(typeof(thisHandler) != 'undefined'){
						thisHandler.remove();
					}
				};
				
				this.eventHandlers = [];
				this.inherited(arguments);			
			}
	});
});
