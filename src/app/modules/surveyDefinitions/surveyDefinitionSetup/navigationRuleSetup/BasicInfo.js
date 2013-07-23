define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/topic",
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
	"app/mixins/GridManager"
	],
	function(declare, on, topic, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, template, lang, Deferred, registry, Dialog, GridFromHtml, Memory, Observable, Cache, JsonRest, Selection, parser, query, Button,
			Validate, Validate_web, Manager, DCFormManager, Textarea, TextBox, TimeTextBox, DateTextBox, Select, ComboBox, FilteringSelect, CheckBox, RadioButton, ValidationTextBox, CheckedMultiSelect, BusyButton,
			UIStores, ChangeTracker, GridManager){
	
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

				var PortableGridManager = declare([StatefulModule, GridManager]);
				
				this.answersGridMgr = new PortableGridManager();
				this.responseValueConditionGridMgr = new PortableGridManager();

				this.answersGrid = this.getWidget('answersGrid');
				this.responseValueConditionGrid = this.getWidget('responseValueConditionGrid');

				this.addToResponsesBtn = this.getWidget('addToResponsesBtn');
				this.removeFromResponsesBtn = this.getWidget('removeFromResponsesBtn');

				
				//this.response_value_conditionBox = this.getWidget('response_value_conditionBox');
				this.from_question_idBox = this.getWidget('from_question_idBox');
				this.question_to_evaluate_idBox = this.getWidget('question_to_evaluate_idBox');
				this.to_question_idBox = this.getWidget('to_question_idBox');
				// get a reference to the form and set the storeURL on it ( the store to which this form would commit data )				
				this.navigationRuleBasicInfoForm = this.getWidget('navigationRuleBasicInfoForm');
				this.navigationRuleBasicInfoForm.set('storeURL', __.urls.NAVIGATION_RULE);
				this.navigationRuleBasicInfoForm.set('refreshUI', lang.hitch(this, "refreshFormUI"));

				//this.uiStores.populateComboDynamicREST(this.response_value_conditionBox, __.urls.RESPONSE_CODE, lang.hitch(this, "responseCodeBaseQuery"));
				var defaultConfigObject ={
					grid:this.answersGrid,
					editButton:this.addToResponsesBtn,
					runDefaultEdit:false,
					store:__.urls.RESPONSE_CODE,
					base_query:lang.hitch(this, "responseCodeBaseQuery"),
					editEntityCallBack:lang.hitch(this, "responseSelected")
				}
				this.answersGridMgr.configureGrid(defaultConfigObject);	
				
				var responseConfigObject ={
					grid:this.responseValueConditionGrid,
					deleteButton:this.removeFromResponsesBtn,
					runDefaultEdit:false,
					store:[],
					arrayStoreDataChangeCallBack: lang.hitch(this, "responsesChange")
				}	
				this.responseValueConditionGridMgr.configureGrid(responseConfigObject);

				
				this.configureForm(this.navigationRuleBasicInfoForm);
				
			},
			
			onActivate:function(){
				this.inherited(arguments);
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}			

				var navigationRule = this.getUpdatingEntity();
				this.viewInForm(navigationRule, this.navigationRuleBasicInfoForm);	

				this.questionsLoadedHandler = topic.subscribe(__.urls.QUESTION + "-loadedComplete", lang.hitch(this, "questionsLoaded"));

				if(typeof(navigationRule) == "object" && navigationRule != null && navigationRule.hasOwnProperty("response_value_condition") && navigationRule.response_value_condition != null){
					var responseIdArray = navigationRule.response_value_condition.split(",");
					var responseNameArray = navigationRule.response_value_condition_display.split(" or ");

					var storedResponses = [];
					for (var i = responseIdArray.length - 1; i >= 0; i--) {
						storedResponses.push({id:responseIdArray[i], name:responseNameArray[i]});
					};

					this.responseValueConditionGridMgr.setStore({store:storedResponses});
					if(navigationRule.hasOwnProperty("question_to_evaluate_id") && navigationRule.question_to_evaluate_id != null){
						this.question_to_evaluate_idBox.store.query({});
					}else{
						this.from_question_idBox.store.query({});
					}
				}else{
					this.from_question_idBox.store.query({});
				}

				this.answersGridMgr.activate();
				this.responseValueConditionGridMgr.activate();

			},

			questionsLoaded:function(){
				this.answersGridMgr.refresh();
			},

			responseSelected:function(entity){
				var length = this.responseValueConditionGridMgr.__store.data.length;
				var orderDef = lang.clone(entity);
				this.responseValueConditionGridMgr.__store.put(orderDef);			
			},		

			responsesChange:function(object, removedFrom, insertedInto){
				var responseArray = this.responseValueConditionGridMgr.__store.data;
				var responseIdArray = [];
				var responseNameArray = [];
				for (var i = responseArray.length - 1; i >= 0; i--) {
					var response = responseArray[i];
					if(typeof(response) == "object" && response != null){
						responseIdArray.push(response.id);
						responseNameArray.push(response.name);
					}
				};

				var responseIdString = responseIdArray.join(",");
				var responseNameString = responseNameArray.join(" or ");

				this.changeTracker.setChange(__.urls.NAVIGATION_RULE, "response_value_condition", responseIdString);
				this.changeTracker.setChange(__.urls.NAVIGATION_RULE, "response_value_condition_display", responseNameString);

			},				


			refreshFormUI:function(value, name, element, event){
				switch(name){
					//case "from_question_id":
					case "question_to_evaluate_id":
						//this.question_to_evaluate_idBox.set("value", value);
						//this.uiStores.populateComboDynamicREST(this.response_value_conditionBox, __.urls.RESPONSE_CODE, lang.hitch(this, "responseCodeBaseQuery"));
						this.answersGridMgr.refresh();
						this.responseValueConditionGridMgr.setStore({store:[]});
						this.responsesChange();

						
					break;
				}
			},

			prepareForSave:function(){

				var changesObject = this.changeTracker.getChangesObject(__.urls.NAVIGATION_RULE);

				for(var p in changesObject){
					if(p == "from_question_id") changesObject["from_question_display"] = this.from_question_idBox.item.name
					if(p == "question_to_evaluate_id") changesObject["question_to_evaluate_display"] = this.question_to_evaluate_idBox.item.name
					if(p == "to_question_id") changesObject["to_question_display"] = this.to_question_idBox.item.name
				}

				return true;
			},

			responseCodeBaseQuery:function(){
				if(this.questionsLoadedHandler) this.questionsLoadedHandler.remove();
				var questionItem = this.question_to_evaluate_idBox.item;
				if(typeof(questionItem) == "object" && questionItem != null){
					return {response_type_id:questionItem.response_type_id};
				}else{
					questionItem = this.from_question_idBox.item;
					if(typeof(questionItem) == "object" && questionItem != null){
						return {response_type_id:questionItem.response_type_id};
					}
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

				if(this.questionsLoadedHandler) this.questionsLoadedHandler.remove();

				this.answersGridMgr.deactivate();
				this.responseValueConditionGridMgr.deactivate();				
				
				this.eventHandlers = []				
				this.inherited(arguments);
			}
	});
});
