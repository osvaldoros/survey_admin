define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/GridManagerBlock",
	"./LanguagedReportRuleSetup",
	"app/mixins/FormManager"
	],
	function(declare, on, lang, GridManagerBlock, LanguagedReportRuleSetup, DCFormManager){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.reportRuleSetup.LanguagedReportRuleList", [GridManagerBlock, DCFormManager], {
		title:"Languaged Report Rules",
		_store:__.urls.LANGUAGED_REPORT_RULE,
		_entityLabel: "Languaged Report Rule",

		gridHeight:"140px",

		constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._columns = [
				{label:"Name", field:"name", sortable:true},
				{label:"Language", field:"language_id", sortable:true}
			];

			this._base_query = lang.hitch(this, "languagedReportRuleBaseQuery");
	    },

		languagedReportRuleBaseQuery:function(){
			if(typeof(this.report_rule_id) == "undefined" || this.report_rule_id == null){
				return false;
			}

   			return {"report_rule_id": this.report_rule_id};
   		},

		startup:function(){
   			this.inherited(arguments);

			var setupDialogInfo = {
				title:"Languaged Report Rule Setup", 
				dialogWidth:"500px", 
				dialogHeight:"450px"
			}

   			this.setupDialog = __.workspaceManager.getModuleInDialog(new LanguagedReportRuleSetup(), setupDialogInfo);
   		},

   		onActivate:function(){
   			this.inherited(arguments);

   			var report_rule = this.getUpdatingEntity();
   			this.report_rule_id = report_rule.id;
   			this.setupDialog.set("report_rule_id", this.report_rule_id, true);

   			this._showAddBtn = (this.report_rule_id != null && typeof(this.report_rule_id) != "undefined");
			this._showEditBtn = (this.report_rule_id != null && typeof(this.report_rule_id) != "undefined");
			this._showDeleteBtn = (this.report_rule_id != null && typeof(this.report_rule_id) != "undefined");

			this.showOrHideStuff();

   			this.refresh();
   		}

	});
});
