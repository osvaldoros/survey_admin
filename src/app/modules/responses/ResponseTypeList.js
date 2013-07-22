define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/GridManagerBlock"
	],
	function(declare, on, lang, GridManagerBlock){
	
	return declare("app.modules.responses.ResponseTypeList", [GridManagerBlock], {
		title:"Response Types",
		_store:__.urls.RESPONSE_TYPE,
		_entityLabel: "Response Type",
		_updateStateHash:"response-type-setup",
		_columns: [
			{label:"Name", field:"name", sortable:true}
		]
	});
});
