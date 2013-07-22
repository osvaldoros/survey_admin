//>>built
require({cache:{
'url:app/modules/templates/Responses.html':"<div class=\"moduleContainer\">\n\n  <!-- Billing Tabs, contain list states -->\n\t<div style=\"clear: both;\" class=\"centerPanel\" data-dojo-attach-point=\"_tabs\" data-dojo-type=\"dijit.layout.TabContainer\" data-dojo-props=\"region: 'center'\" nested=\"true\" doLayout=\"false\"></div>\n\n \n\t<div data-dojo-attach-point=\"responseTypeSetupDialog\" class=\"activatable includeInStates response-type-setup\" data-dojo-type=\"app.loader.DialogLauncher\" data-dojo-props=\"moduleURL: 'app/modules/responses/ResponseTypeSetup', title : 'Response Type Setup',  dialogWidth: '400px', dialogHeight: '220px'\"></div>\n\t<div data-dojo-attach-point=\"responseSetupDialog\" class=\"activatable includeInStates languaged-response-setup\" data-dojo-type=\"app.loader.DialogLauncher\" data-dojo-props=\"moduleURL: 'app/modules/responses/responseSetup/LanguagedResponseSetup', title : 'Languaged Response Setup',  dialogWidth: '500px', dialogHeight: '410px'\"></div>\n\n</div>\n\t\t\n"}});
define("app/modules/Responses", [
	"dojo/_base/declare",
	"dojo/on",
	"dijit/_WidgetBase", 	
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",

	"dojo/text!./templates/Responses.html", // this is what includes the html template
	"dojo/_base/lang",
	
	"dijit/form/Button",
	"app/loader/DialogLauncher",
	"app/utils/HashManager",
	"app/mixins/TabManager"
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, 
		template, lang, 
		Button, DialogLauncher, HashManager, TabManager){
	
	return declare("app.modules.Responses", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, TabManager], {
			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!
			hashManager: HashManager.getInstance(),

			startup:function(){
				this.inherited(arguments);
				
				this._tabs = this.getWidget("_tabs");
				
				var tabsConfig = {
					tabs: this._tabs,
					steps: [
						{ title: 'Languaged-Responses', moduleURL:'app/modules/responses/responseSetup/LanguagedResponseList'},
						{ title: 'Response-Types', moduleURL:'app/modules/responses/ResponseTypeList'}
					],
					alternateStates:[
						{name:"languaged-response-setup", mapsTo:"Languaged-Responses"},
						{name:"response-type-setup", mapsTo:"Response-Types"}
					],
					hashManagement:{
						setHashFunction: "setState",
						getHashFunction: "getState"
					}
				}
				this.configureTabs(tabsConfig);
			}
			
	});
});
