//>>built
require({cache:{
'url:app/workspace/templates/Breadcrumb.html':"<div class=\"moduleContainer\" data-dojo-attach-point=\"containerNode\" data-dojo-attach-point=\"containerNode\" data-dojo-type=\"dijit.layout.BorderContainer\">\n\t<button dojoType=\"app.form.ArrowButton\" data-dojo-attach-point=\"userCrumb\">first name</button>\n\t<button dojoType=\"app.form.ArrowButton\" data-dojo-attach-point=\"orgCrumb\">Org</button>\n</div>\n\t\t\n"}});
define("app/workspace/Breadcrumb", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/dom",
	"dijit/form/Button",
	"app/form/ArrowButton",
	"dijit/_WidgetBase", 	
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",
	"dojo/text!./templates/Breadcrumb.html", // this is what includes the html template
	"dojo/_base/lang",
	"dojo/_base/xhr",
	"dijit/registry",
	"dojo/parser",
	"app/utils/HashManager"
	],
	function(declare, on, dom, Button, ArrowButton, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, template, lang, xhr, registry, parser, HashManager){
	
	return declare("app.workspace.Breadcrumb", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule], {
			
			user:'',
			
			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!

			moduleCrumb:null,
			stateCrumb:null,
			entityCrumb:null,
			hashManager: HashManager.getInstance(),
		
			/**
			 * 
			 * startup is called by the framework as part of the livecycle of all widgets, it happens after the children widgets have been created and are ready to be used
			 * Notice we don't use postCreate because the child widgets haven't been created yet, and we need to wait for the dgrid to attach the store to it
			 * 
			 */
			startup:function(){
				this.inherited(arguments);
				this.userCrumb = this.getWidget('userCrumb');
				this.orgCrumb = this.getWidget('orgCrumb');
			},
			
			onHashChange:function(hashValue){
				this.hashParams = this.hashManager.parseHash(hashValue);
				this.updateCrumbs();
			},
			
			onActivate:function(){
				
				if(typeof(this.crumbEventHandlers) == "undefined"){
					this.crumbEventHandlers = [];
				}	
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}				
				
				var displayUsername;
				if(typeof(__.user.name) != "undefined"){
					displayUsername = __.user.name
				}else if(typeof(__.user.username) != "undefined"){
					displayUsername = __.user.username
				}else{
					displayUsername = "Unnamed user";
				}
				
				var displayOrgname;
				if(typeof(__.user.client) == "object" && __.user.client != null && typeof(__.user.client.name) != "undefined"){
					displayOrgname = __.user.client.name
				}else{
					displayOrgname = "Global Admin";
				}
				
				this.userCrumb.set('label', displayUsername);
				this.orgCrumb.set('label', displayOrgname);
				
				this.onHashChange(this.hashManager.getHash());
				this.eventHandlers.push( dojo.subscribe("/__/hashchange", this, this.onHashChange) );
			},
			
			
			updateCrumbs:function(){
				
				this.removeCrumbHandlers();
				this.destroyCrumbs();
				if(typeof this.hashParams.moduleName != 'undefined'){
					if(typeof this.hashParams.stateName != 'undefined' && this.hashParams.stateName != ''){
						this.moduleCrumb = new ArrowButton({label: this.hashParams.moduleName});
						this.moduleCrumb.placeAt(this.domNode);
						if(typeof this.hashParams.entityName != 'undefined' && this.hashParams.entityName != ''){
							this.stateCrumb = new ArrowButton({label: this.hashParams.stateName});
							this.stateCrumb.placeAt(this.domNode);
							this.entityCrumb = new Button({label: this.hashParams.entityName});
							this.entityCrumb.placeAt(this.domNode);
						}else{
							this.stateCrumb = new Button({label: this.hashParams.stateName});
							this.stateCrumb.placeAt(this.domNode);
						}
					}else{
						this.moduleCrumb = new Button({label: this.hashParams.moduleName});
						this.moduleCrumb.placeAt(this.domNode);
					}
					
				}
				this.addCrumbHandlers();
				
			},
			
			addCrumbHandlers:function(){
				var owner = this;
				this.crumbEventHandlers.push( on(this.orgCrumb, 'click', function(){
					this.hashManager.setHash('companies/choose')
				}));
				
				if(this.moduleCrumb != null){
					this.crumbEventHandlers.push( on(this.moduleCrumb, 'click', function(){
						owner.hashManager.dropHashItemsAfterNumber(0);
					}));
				}
				if(this.stateCrumb != null){
					this.crumbEventHandlers.push( on(this.stateCrumb, 'click', function(){
						owner.hashManager.dropHashItemsAfterNumber(1);
					}));
				}
				if(this.entityCrumb != null){
					this.crumbEventHandlers.push( on(this.entityCrumb, 'click', function(){
						owner.hashManager.dropHashItemsAfterNumber(2);
					}));
				}
			},
			
			removeCrumbHandlers:function(){
			//remove event handlers
				for (var i=0; i < this.crumbEventHandlers.length; i++) {
					this.crumbEventHandlers[i].remove();
				};
				this.crumbEventHandlers = []				
				
			},
			
			destroyCrumbs:function(){
				if(this.moduleCrumb != null){
					this.moduleCrumb.destroyRecursive();
					this.moduleCrumb = null;
				}
				if(this.stateCrumb != null){
					this.stateCrumb.destroyRecursive();
					this.stateCrumb = null;
				}
				if(this.entityCrumb != null){
					this.entityCrumb.destroyRecursive();
					this.entityCrumb = null;
				}
				
			},
			
			onDeactivate:function(){

				for (var i=0; i < this.eventHandlers.length; i++) {
					this.eventHandlers[i].remove();
				};
				
				this.eventHandlers = []
				
				this.removeCrumbHandlers();
				this.destroyCrumbs();
			}
			
	});
});
