//>>built
define("app/modules/responses/responseSetup/LanguagedResponseGrid", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/GridManagerBlock"
	],
	function(declare, on, lang, GridManagerBlock){
	
	return declare("app.modules.responses.responseSetup.LanguagedResponseGrid", [GridManagerBlock], {
		title:"Languaged Responses",
		_store:__.urls.LANGUAGED_RESPONSE,
		_entityLabel: "Languaged Response",
		_updateStateHash:"languaged-response-setup",


		constructor: function(args){
			declare.safeMixin(this,args || {});
			var owner = this;
			this._baseColumns = [
				{label:"Name", field:"name", sortable:true},
				{label:"Response Code", field:"response_code"}
			]

			// get a copy of the entire array...
			this._columns = this._baseColumns.slice(0);


			this._base_query = function(){
				return owner.getFilters();
			}
		},	


		_setLanguageFilterAttr:function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
			this._languageFilter = value;
			this._grid.refresh();
		},

		_setResponseTypeFilterAttr:function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
			this._responseTypeFilter = value;
			this._grid.refresh();
		},

		getFilters:function(){
			var queryObj = false;

			if(typeof(this._languageFilter) != "undefined" && this._languageFilter != null && this._languageFilter != "ALL"){
				if(!queryObj) queryObj = {};
				queryObj["language_id"] = this._languageFilter;
			}

			if(typeof(this._responseTypeFilter) != "undefined" && this._responseTypeFilter != null && this._responseTypeFilter != "ALL"){
				if(!queryObj) queryObj = {};
				queryObj["response_type_id"] = this._responseTypeFilter;
			}


			return queryObj;			
		}
	});
});
