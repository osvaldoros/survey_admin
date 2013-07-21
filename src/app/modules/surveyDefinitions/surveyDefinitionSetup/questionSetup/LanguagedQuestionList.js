define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/GridManagerBlock",
	"./LanguagedQuestionSetup",
	"app/mixins/FormManager"
	],
	function(declare, on, lang, GridManagerBlock, LanguagedQuestionSetup, DCFormManager){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.questionSetup.LanguagedQuestionList", [GridManagerBlock, DCFormManager], {
		title:"Languaged Questions",
		_store:__.urls.LANGUAGED_QUESTION,
		_entityLabel: "Languaged Question",

		gridHeight:"180px",

		constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._columns = [
				{label:"Name", field:"name", sortable:true},
				{label:"Language", field:"language_id", sortable:true}
			];

			this._base_query = lang.hitch(this, "languagedQuestionBaseQuery");
	    },

		languagedQuestionBaseQuery:function(){
			if(typeof(this.question_id) == "undefined" || this.question_id == null){
				return false;
			}

   			return {"question_id": this.question_id};
   		},

		startup:function(){
   			this.inherited(arguments);

			var setupDialogInfo = {
				title:"Languaged Question Setup", 
				dialogWidth:"500px", 
				dialogHeight:"350px"
			}

   			this.setupDialog = __.workspaceManager.getModuleInDialog(new LanguagedQuestionSetup(), setupDialogInfo);
   		},

   		onActivate:function(){
   			this.inherited(arguments);
   			var question = this.getUpdatingEntity();
   			this.question_id = question.id;

   			this.setupDialog.set("question_id", this.question_id, true);

   			this._showAddBtn = (this.question_id != null && typeof(this.question_id) != "undefined");
			this._showEditBtn = (this.question_id != null && typeof(this.question_id) != "undefined");
			this._showDeleteBtn = (this.question_id != null && typeof(this.question_id) != "undefined");

			this.showOrHideStuff();

   			this.refresh();
   		}

	});
});
