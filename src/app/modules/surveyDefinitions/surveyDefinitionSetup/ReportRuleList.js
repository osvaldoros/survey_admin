define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/GridManagerBlock",
	"app/mixins/SelfActivates",
	"./ReportRuleSetup"
	],
	function(declare, on, lang, GridManagerBlock, SelfActivates, ReportRuleSetup){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.ReportRuleList", [GridManagerBlock, SelfActivates], {
		title:"Report Items",
		_store:__.urls.REPORT_RULE,
		_entityLabel: "Rule",
		gridHeight:"250px",
		_showTitle:false,

		constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._columns = [
				{label:"Name", field:"name", sortable:true},
				{label:"Question", field:"question_display", sortable:true},
				{label:"If response", field:"response_value_condition_display", sortable:true},
				{label:"Reusable Item", field:"reusable_report_item_display", sortable:true}
			];

			this._base_query = lang.hitch(this, "reportRuleBaseQuery")
	    },

		reportRuleBaseQuery:function(){
			if(typeof(this.survey_definition_id) == "undefined" || this.survey_definition_id == null){
				return false;
			}

   			return {"data_definition_id": this.survey_definition_id};
   		},

		startup:function(){
   			this.inherited(arguments);

			var setupDialogInfo = {
				title:"Report Rule Setup", 
				dialogWidth:"480px", 
				dialogHeight:"500px"
			}

   			this.setupDialog = __.workspaceManager.getModuleInDialog(new ReportRuleSetup(), setupDialogInfo);
   			
   		},


   		onActivate:function(){
			this.inherited(arguments);
			console.log("Report Rules > activate");
   		},   		

   		_setSurvey_definition_idAttr: function(/*String*/ value, /*Boolean?*/ priorityChange, /*String?*/ displayedValue, /*item?*/ item){
   			this.survey_definition_id = value;
   			console.log("Report Rules > survey_definition_id = " + value);
   			this.setupDialog.set("survey_definition_id", value, true);
   			this.refresh();

   			this._showAddBtn = (this.survey_definition_id != null && typeof(this.survey_definition_id) != "undefined");
			this._showEditBtn = (this.survey_definition_id != null && typeof(this.survey_definition_id) != "undefined");
			this._showDeleteBtn = (this.survey_definition_id != null && typeof(this.survey_definition_id) != "undefined");

			this.showOrHideStuff();

   		}

	});
});
