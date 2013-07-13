define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/dom",
	"app/workspace/Breadcrumb",
	"dijit/_WidgetBase", 	
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",
	"dojo/text!./templates/Topbar.html", // this is what includes the html template
	"dojo/_base/lang",
	"dojo/_base/xhr",
	"dijit/registry",
	"dojo/parser",
	"app/modules/GlobalSystemSettingsSetup"
	],
	function(declare, on, dom, Breadcrumb, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, template, lang, xhr, registry, parser, GlobalSystemSettings){
	
	return declare("app.workspace.Topbar", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule], {
			
			user:'',
			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!

			/**
			 * 
			 * startup is called by the framework as part of the livecycle of all widgets, it happens after the children widgets have been created and are ready to be used
			 * Notice we don't use postCreate because the child widgets haven't been created yet, and we need to wait for the dgrid to attach the store to it
			 * 
			 */
			startup:function(){
				this.inherited(arguments);
				
				this.logoutButton = this.getWidget('logoutButton');
				this.settingsButton = this.getWidget('settingsButton');
				this.breadcrumb = this.getWidget('breadcrumb');
				on(this.logoutButton, 'click', lang.hitch(this, "onLogoutClicked"));
				on(this.settingsButton, 'click', lang.hitch(this, "onSettingsClicked"));
			},
			
			onSettingsClicked:function(event){
				this.globalSystemSetting = emanda2.workspaceManager.getModuleInDialog( new GlobalSystemSettings(), {title:"Global System Settings", dialogWidth:"800", dialogHeight:"620px"});
				var req = emanda2.api.get(emanda2.urls.GLOBAL_SETTING);
				var owner = this;
	  			req.then(function(response){
	  				var entity = response[0];
	  				owner.globalSystemSetting.setUpdatingEntity(entity,true);
	  				owner.globalSystemSetting.show();
	  			});
				
			},

			onLogoutClicked:function(event){
				var headers = {};
				if(typeof(emanda2.user.auth_token) !== 'undefined'){
					headers["X-Auth-Token"] = emanda2.user.auth_token;
				}
			
				xhr.get({
						url: dojo.config.drivercheck.api_host + "emanda2/_logout",
						headers:headers,
						load: function(logoutObject) {
							emanda2.logout();
						}
				});
				
			},
			
			onActivate:function(){
				this.breadcrumb.activate();
			},
			
			onDeactivate:function(){
				this.breadcrumb.deactivate();
			}
			
	});
});
