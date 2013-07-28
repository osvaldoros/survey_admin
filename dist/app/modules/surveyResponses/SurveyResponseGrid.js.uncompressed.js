//>>built
define("app/modules/surveyResponses/SurveyResponseGrid", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/GridManagerBlock",
	"app/store/GridFormatters"
	],
	function(declare, on, lang, GridManagerBlock, GridFormatters){
	
	return declare("app.modules.surveyResponses.SurveyResponseGrid", [GridManagerBlock], {
		title:"Survey Responses",
		_store:__.urls.SURVEY_RESPONSE,
		_entityLabel: "Survey Response",

		_showAddBtn:false,
		_showEditBtn:false,
		_showDeleteBtn:true,


		_programFilter:null,
		_surveyDefinitionFilter:null,

		constructor: function(args){
			declare.safeMixin(this,args || {});
			var owner = this;
			this._baseColumns = [
				{label:"Participant", field:"participant_id"},
				{label:"Started", field:"started"},
				{label:"Depression", field:"DEPRESSION"},
				{label:"Anxiety", field:"ANXIETY"},
				{label:"PTSD", field:"PTSD"},
				{label:"CAGE", field:"CAGE"},
				{label:"Duration", field:"completion_time"},
				{label:"Participant", field:"participant_report_link", renderCell: GridFormatters.linkRenderer},
				{label:"Staff", field:"staff_report_link", renderCell: GridFormatters.linkRenderer}
			]

			// get a copy of the entire array...
			this._columns = this._baseColumns.slice(0);


			this._base_query = function(){
				return owner.getFilters();
			}
		},	

		_setProgramFilterAttr:function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
			this._programFilter = value;
			this._grid.refresh();
		},

		_setSurveyDefinitionFilterAttr:function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
			this._surveyDefinitionFilter = value;
			this._grid.refresh();
		},

		getFilters:function(){
			var queryObj = false;
			
			if(typeof(this._programFilter) != "undefined" && this._programFilter != null && this._programFilter != "ALL"){
				if(!queryObj) queryObj = {};
				queryObj["program_id"] = this._programFilterprogram_id;
			}

			if(typeof(this._surveyDefinitionFilter) != "undefined" && this._surveyDefinitionFilter != null && this._surveyDefinitionFilter != "ALL"){
				if(!queryObj) queryObj = {};
				queryObj["data_definition_id"] = this._surveyDefinitionFilter;
			}



			return queryObj;			
		}
	});
});
