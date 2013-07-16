define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/GridManagerBlock",
	"app/mixins/SelfActivates",
	"./QuestionSetup"
	],
	function(declare, on, lang, GridManagerBlock, SelfActivates, QuestionSetup){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.QuestionList", [GridManagerBlock, SelfActivates], {
		title:"Questions",
		_store:__.urls.QUESTION,
		_entityLabel: "Question",
		_columns: [
			{label:"Name", field:"name", sortable:true}
		],
		gridHeight:"250px",
		_showTitle:false,

		constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._columns = [
				{label:"Name", field:"name", sortable:true}
			];

			this._base_query = lang.hitch(this, "questionBaseQuery")
	    },

		questionBaseQuery:function(){
			if(typeof(this.survey_definition_id) == "undefined" || this.survey_definition_id == null){
				return false;
			}

   			return {"data_definition_id": this.survey_definition_id};
   		},

		startup:function(){
   			this.inherited(arguments);

			var setupDialogInfo = {
				title:"Question Setup", 
				dialogWidth:"700px", 
				dialogHeight:"480px"
			}

   			this.setupDialog = __.workspaceManager.getModuleInDialog(new QuestionSetup(), setupDialogInfo);
   			
   		},


   		onActivate:function(){
			this.inherited(arguments);
			console.log("Questions > activate");
   		},

   		_setSurvey_definition_idAttr: function(/*String*/ value, /*Boolean?*/ priorityChange, /*String?*/ displayedValue, /*item?*/ item){
   			this.survey_definition_id = value;
   			console.log("Questions > survey_definition_id = " + value);
   			this.setupDialog.set("survey_definition_id", value, true);
   			this.refresh();

   			this._showAddBtn = (this.survey_definition_id != null && typeof(this.survey_definition_id) != "undefined");
			this._showEditBtn = (this.survey_definition_id != null && typeof(this.survey_definition_id) != "undefined");
			this._showDeleteBtn = (this.survey_definition_id != null && typeof(this.survey_definition_id) != "undefined");

			this.showOrHideStuff();

   		}

	});
});
