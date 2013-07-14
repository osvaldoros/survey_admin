define([
	"dojo/_base/declare",
	"dojo/on",
	"dijit/_WidgetBase", 	
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",

	"dojo/text!./templates/Clients.html", // this is what includes the html template
	"dojo/_base/lang",
	
	"dijit/form/Button",
	"app/modules/clients/ClientList",
	"app/modules/clients/ClientSetup",
	"app/loader/DialogLauncher",
	"app/utils/HashManager",
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, 
		template, lang, 
		Button, ClientList, ClientSetup, DialogLauncher, HashManager){
	
	return declare("app.modules.Clients", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule], {
			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!
			hashManager: HashManager.getInstance(),

			
			setCurrentState:function(state){
				this.inherited(arguments);
				if(this.getCurrentState() == ''){
					this.hashManager.setState('list');
				}
			}
			
	});
});
