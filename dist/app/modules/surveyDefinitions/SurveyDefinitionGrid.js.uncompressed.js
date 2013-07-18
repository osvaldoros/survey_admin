//>>built
define("app/modules/surveyDefinitions/SurveyDefinitionGrid", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/GridManagerBlock"
	],
	function(declare, on, lang, GridManagerBlock){
	
	return declare("app.modules.surveyDefinitions.SurveyDefinitionGrid", [GridManagerBlock], {
		title:"Survey Definitions",
		_store:__.urls.SURVEY_DEFINITION,
		_entityLabel: "Survey Definition",


		constructor: function(args){
			declare.safeMixin(this,args || {});
			var owner = this;
			this._baseColumns = [
				{label:"Name", field:"name", sortable:true},
				{label:"Created", field:"created"}
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

		getFilters:function(){
			var queryObj = false;

			if(typeof(this._programFilter) != "undefined" && this._programFilter != null && this._programFilter != "ALL"){
				if(!queryObj) queryObj = {};
				queryObj["program_id"] = this._programFilter;
			}
			return queryObj;			
		}
	});
});
