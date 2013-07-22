define([
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
