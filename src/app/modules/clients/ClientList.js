define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/GridManagerBlock"
	],
	function(declare, on, lang, GridManagerBlock){
	
	return declare("app.modules.clients.ClientList", [GridManagerBlock], {
		title:"Clients",
		_store:__.urls.CLIENT,
		_entityLabel: "Client",
		_columns: [
			{label:"Name", field:"name", sortable:true},
			{label:"Address", field:"street", sortable:true},
			{label:"City", field:"city", sortable:true},
			{label:"Phone", field:"phone"},
			{label:"Created", field:"created"}
		]
	});
});
