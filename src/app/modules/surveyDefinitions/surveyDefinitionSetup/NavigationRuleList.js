define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/GridManagerBlock",
	"app/mixins/SelfActivates",
	"./NavigationRuleSetup"
	],
	function(declare, on, lang, GridManagerBlock, SelfActivates, NavigationRuleSetup){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.NavigationRuleList", [GridManagerBlock, SelfActivates], {
		title:"Navigation Rules",
		_store:__.urls.NAVIGATION_RULE,
		_entityLabel: "Rule",
		gridHeight:"250px",
		_showTitle:false,

		constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._columns = [
				{label:"From", field:"from_question_display", sortable:true},
				{label:"Evaluate", field:"question_to_evaluate_display", sortable:true},
				{label:"If response", field:"response_value_condition_display", sortable:true},
				{label:"Jump to", field:"to_question_display", sortable:true}
			];

			this._base_query = lang.hitch(this, "navRulesBaseQuery")
	    },

		navRulesBaseQuery:function(){
			if(typeof(this.survey_definition_id) == "undefined" || this.survey_definition_id == null){
				return false;
			}

   			return {"data_definition_id": this.survey_definition_id};
   		},

		startup:function(){
   			this.inherited(arguments);

			var setupDialogInfo = {
				title:"Navigation Rule Setup", 
				dialogWidth:"800px", 
				dialogHeight:"550px"
			}

   			this.setupDialog = __.workspaceManager.getModuleInDialog(new NavigationRuleSetup(), setupDialogInfo);
   			
   		},

   		onActivate:function(){
			this.inherited(arguments);
			console.log("Nav Rules > activate");
   		},

   		_setSurvey_definition_idAttr: function(/*String*/ value, /*Boolean?*/ priorityChange, /*String?*/ displayedValue, /*item?*/ item){
   			this.survey_definition_id = value;
			console.log("Nav Rules > survey_definition_id = " + value);
   			this.setupDialog.set("survey_definition_id", value, true);
   			this.refresh();

   			this._showAddBtn = (this.survey_definition_id != null && typeof(this.survey_definition_id) != "undefined");
			this._showEditBtn = (this.survey_definition_id != null && typeof(this.survey_definition_id) != "undefined");
			this._showDeleteBtn = (this.survey_definition_id != null && typeof(this.survey_definition_id) != "undefined");

			this.showOrHideStuff();

   		}

	});
});
