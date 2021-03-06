//>>built
define("app/modules/programs/ProgramGrid", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/GridManagerBlock"
	],
	function(declare, on, lang, GridManagerBlock){
	
	return declare("app.modules.programs.ProgramGrid", [GridManagerBlock], {
		title:"Programs",
		_store:__.urls.PROGRAM,
		_entityLabel: "Program",


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


		_setClientFilterAttr:function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
			this._clientFilter = value;
			this._grid.refresh();
		},

		getFilters:function(){
			var queryObj = false;

			if(typeof(this._clientFilter) != "undefined" && this._clientFilter != null && this._clientFilter != "ALL"){
				if(!queryObj) queryObj = {};
				queryObj["client_id"] = this._clientFilter;
			}
			return queryObj;			
		}
	});
});
