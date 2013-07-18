//>>built
require({cache:{
'url:app/workspace/templates/Topbar.html':"<div class=\"moduleContainer\" data-dojo-type=\"dijit.layout.BorderContainer\">\n\t<div class=\"logo_small floatLeft\" style=\"width:120px; height:49px;\"></div>\n\t<button class=\"pad10 floatLeft\" dojoType=\"app.workspace.Breadcrumb\" data-dojo-attach-point=\"breadcrumb\"/>\n\t<button class=\"floatRight pad10\" dojoType=\"dijit.form.Button\" data-dojo-attach-point=\"logoutButton\">Logout</button>\n</div>\n\t\t\n"}});
define("app/workspace/Topbar", [
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
	"dojo/parser"
	],
	function(declare, on, dom, Breadcrumb, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, template, lang, xhr, registry, parser){
	
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
			},
			
			onLogoutClicked:function(event){
				var headers = {};
				if(typeof(__.user.auth_token) !== 'undefined'){
					headers["X-Auth-Token"] = __.user.auth_token;
				}
			
				xhr.get({
						url: dojo.config.appSpecific.api_host + "api/surveys/logout",
						headers:headers,
						load: function(logoutObject) {
							__.logout();
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
