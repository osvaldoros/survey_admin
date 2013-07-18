//>>built
define("app/modules/users/UserList", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",
	"app/uicomponents/blocks/GridManagerBlock"
	],
	function(declare, on, lang, GridManagerBlock){
	
	return declare("app.modules.users.UserList", [GridManagerBlock], {
		title:"Users",
		_store:__.urls.USER,
		_entityLabel: "User",
		_columns: [
			{label:"Name", field:"name", sortable:true},
			{label:"Email", field:"email", sortable:true},
			{label:"Created", field:"created"}
		]
	});
});
