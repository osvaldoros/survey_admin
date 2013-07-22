define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/GridManagerBlock",
	"./LanguagedReusableReportItemSetup",
	"app/mixins/FormManager"
	],
	function(declare, on, lang, GridManagerBlock, LanguagedReusableReportItemSetup, DCFormManager){
	
	return declare("app.modules.surveyDefinitions.surveyDefinitionSetup.reusableReportItemSetup.LanguagedReusableReportItemList", [GridManagerBlock, DCFormManager], {
		title:"Languaged Reusable Report Items",
		_store:__.urls.LANGUAGED_REUSABLE_REPORT_ITEM,
		_entityLabel: "Languaged Item",
		_showTitle:false,
		gridHeight:"180px",

		constructor: function(args){
	        declare.safeMixin(this,args || {});
			this._columns = [
				{label:"Name", field:"name", sortable:true},
				{label:"Language", field:"language_id", sortable:true}
			];

			this._base_query = lang.hitch(this, "languagedReusableReportItemBaseQuery");
	    },

		languagedReusableReportItemBaseQuery:function(){
			if(typeof(this.reusableReportItemId) == "undefined" || this.reusableReportItemId == null){
				return false;
			}

   			return {"reusable_report_item_id": this.reusableReportItemId};
   		},

		startup:function(){
   			this.inherited(arguments);

			var setupDialogInfo = {
				title:"Languaged ReusableReportItem Setup", 
				dialogWidth:"500px", 
				dialogHeight:"350px"
			}

   			this.setupDialog = __.workspaceManager.getModuleInDialog(new LanguagedReusableReportItemSetup(), setupDialogInfo);
   		},

   		onActivate:function(){
   			this.inherited(arguments);
   			var reusableReportItem = this.getUpdatingEntity();
   			this.reusableReportItemId = reusableReportItem.id;

   			this.setupDialog.set("reusableReportItemId", this.reusableReportItemId, true);

   			this._showAddBtn = (this.reusableReportItemId != null && typeof(this.reusableReportItemId) != "undefined");
			this._showEditBtn = (this.reusableReportItemId != null && typeof(this.reusableReportItemId) != "undefined");
			this._showDeleteBtn = (this.reusableReportItemId != null && typeof(this.reusableReportItemId) != "undefined");

			this.showOrHideStuff();

   			this.refresh();
   		}

	});
});
