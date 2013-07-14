define([
	"dojo/_base/declare",
	"dojo/on",
	"dijit/layout/ContentPane",
	"app/mixins/StatefulModule",
	"dojo/text!./templates/Auth.html", // this is what includes the html template
	"dojo/_base/lang",
	"dojo/_base/xhr",
	"app/utils/StringUtils",
	
	"dijit/Tooltip",
	"dojox/validate",
	"dojox/validate/web",
	//"dijit/form/Form",
	"app/form/AjaxForm",
	"dijit/form/Button",
	"dijit/form/ValidationTextBox",
	"app/store/UIStores",
	"app/utils/HashManager"		
	
	],
	function(declare, on, ContentPane, StatefulModule, template, lang, xhr, StringUtils, Tooltip, Validate, Validate_web, AjaxForm, Button, ValidationTextBox, UIStores, HashManager ){
	
		return declare("app.Auth", [ContentPane, StatefulModule], {
			uiStores: UIStores.getInstance(),	
			hashManager: HashManager.getInstance(),	
			//widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			content: template, // Our template - important!
			/**
			 * 
			 * startup is called by the framework as part of the livecycle of all widgets, it happens after the children widgets have been created and are ready to be used
			 * Notice we don't use postCreate because the child widgets haven't been created yet, and we need to wait for the dgrid to attach the store to it
			 * 
			 */
			startup:function(){
				this.inherited(arguments);
				
				// get references to the form elements we need
				this.loginForm = this.getWidget('loginForm');
				this.loginButton = this.getWidget('loginButton');
				this.usernameFld = this.getWidget('usernameFld');
				this.passwordFld = this.getWidget('passwordFld');
				
				__.authManager = this;

				var token = this.hashManager.getAuthToken();
				if(typeof(token) != "undefined" && token != null){
					this.attemptTokenLogin(token);
					this.hashManager.dropAuthToken();
				}
				
			},
			
			/**
			 * 
			 * We monitor this event to make it easier to submit this form via the enter key
			 * 
			 */
			onPasswordKeyUp:function(event){
				if(event.keyIdentifier == "Enter" || event.key == "Enter" || event.keyCode == 13) this.onLoginClicked();
			},
			
			/**
			 * 
			 * Implemented by app/loader/Module, this gets called when its parent ModuleLoader it shown ( only once )
			 * 
			 */
			onActivate:function(){
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}				
				// wire the events we need to catch from those elements
				this.eventHandlers.push( on(this.loginButton, 'click', lang.hitch(this, "onLoginClicked")) );
				this.eventHandlers.push( on(this.passwordFld, 'keypress', lang.hitch(this, "onPasswordKeyUp")) );
				
				this.eventHandlers.push( on(this.usernameFld, 'focus', lang.hitch(this, "hideInvalidCredentialsToolTip")) );
				this.eventHandlers.push( on(this.passwordFld, 'focus', lang.hitch(this, "hideInvalidCredentialsToolTip")) );
				
				this.loginForm.reset();
				
				
				if(dojo.config.isDebug){
					this.usernameFld.set('value', "osvaldo.ros@gmail.com");
					this.passwordFld.set('value', "asdasd");
					//this.onLoginClicked();
				}
			},
			
			
			/**
			 * 
			 * Implemented by app/loader/Module, this gets called when its parent ModuleLoader it hidden ( only once )
			 * 
			 */
			onDeactivate:function(){
				this.inherited(arguments);
				this.hideInvalidCredentialsToolTip();
				//remove event handlers
				for (var i=0; i < this.eventHandlers.length; i++) {
				  this.eventHandlers[i].remove();
				};
				
				this.eventHandlers = []
			},
			
			/**
			 * 
			 * Make sure we clear the "invalid credentials" tooltip when we focus any of the fields again
			 * 
			 */
			hideInvalidCredentialsToolTip:function(){
				if(typeof(this.invalidCredentials) != 'undefined'){
					this.invalidCredentials.close();
				}
			},
			
			
			/**
			 * 
			 * If the tooltip exist show it, if it doesn't create it and show it
			 * 
			 */
			showInvalidCredentialsTootip:function(label){
				if(!label || label == '') label = "Invalid username and password";
				if(typeof(this.invalidCredentials) == 'undefined'){
					this.invalidCredentials = new Tooltip({ 
						label: label
					});
				}
				
				this.invalidCredentials.open(this.loginForm.domNode);
			},
			
			
			enableForm:function(enabled){
				this.usernameFld.set('disabled', !enabled)
				this.passwordFld.set('disabled', !enabled)
				this.loginButton.set('disabled', !enabled)
			},


			attemptTokenLogin:function(token){
				var owner = this;
				var headers = {"X-Auth-Token":token};
				
				var auth_url = __.urls.LOGIN;
				
				var loginRequest = xhr.get({
					url: auth_url,
					handleAs: "json",
					ioPublish:false,
					headers:headers
				});

				loginRequest.then( function(req){return function(authObject){owner.handleLogin(req, authObject)}}(loginRequest) );
			},
			
			/**
			 * 
			 * Attempt to submit this form in order to authenticate the user
			 * 
			 */
			onLoginClicked:function(event){
				if(this.loginForm.validate()){
					__.spinner.show();
					this.enableForm(false);
					
					var credentials = {
						username: this.usernameFld.value,
						password: this.passwordFld.displayedValue
					}
					
					var owner = this;
					var headers = {Authorization:'Plain ' + credentials.username + ':' + credentials.password};
					
					var auth_url = __.urls.LOGIN;
					
					var loginRequest = xhr.get({
						url: auth_url,
						handleAs: "json",
						ioPublish:false,
						headers:headers,
						error: lang.hitch(this, "xhrError")
					});
					
					loginRequest.then( function(req){return function(authObject){owner.handleLogin(req, authObject)}}(loginRequest) );
					
				}
			},

			xhrError:function(error){
				__.spinner.hide();
				this.enableForm(true);
				__.alert.set("title","Communication error");
				__.alert.set("message", error.status + " : " + error.xhr.statusText);
   				__.alert.show();
			},

			handleLogin:function(req, authObject){
				__.spinner.hide();
				this.enableForm(true);
				var auth_token = req.ioArgs.xhr.getResponseHeader("X-Auth-Token");
				document.cookie = "X-Auth-Token="+auth_token+";path=/;"; // expires when the browser closes
				
				if(typeof(authObject.error) != 'undefined'){
					if(this.isActive()){
						this.showInvalidCredentialsTootip(authObject.error.message);
					}
				}else{
					__.user = authObject;
					__.user.auth_token = auth_token;

					var tabs;
					var modules;

					if(typeof(__.user.role) == "object" && __.user.role != null && lang.isArray(__.user.role.tabs) && lang.isArray(__.user.role.modules)){
						tabs = __.user.role.tabs;
						modules = __.user.role.modules;
					}else{
						tabs = dojo.config.appSpecific.tabs;
						modules = dojo.config.appSpecific.modules;
					}
					// if there are no tabs, use the modules as tabs
					if(!lang.isArray(tabs) || tabs.length == 0){
						tabs = modules.slice(0);
					}

					dojo.config.appSpecific.tabs = this.processModules(tabs);
					dojo.config.appSpecific.modules = this.processModules(modules);
					
					this.initApp();

				}
			},

			hasPermission:function(permission){
				if(typeof(__.user) == "object" && __.user != null && typeof(__.user.role) == "object" && __.user.role != null && lang.isArray(__.user.role.perms) && __.user.role.perms.length > 0){
					for (var i = __.user.role.perms.length - 1; i >= 0; i--) {
						var perm = __.user.role.perms[i];
						if(perm.name == permission){
							return true;
						}
					};
				}

				return false;
			},
			
			initApp:function(){
				this.uiStores.preloadCatalogs(lang.hitch(this, "gotoWorkspace"));
			},

			gotoWorkspace:function(){
				__.setCurrentState('app/Workspace');
			},
			
			logout:function(){
			},
			
			processModules:function(modules){
				var newModules = [];
				for (var i=0; i < modules.length; i++) {
					var module = modules[i];
					
					if(typeof(module.module_url) != 'undefined') module.moduleURL = module.module_url;
					if(typeof(module.path) != 'undefined') module.moduleURL = module.path;		

					if(typeof(module.moduleURL) == "undefined"){
						module.moduleURL = "app/modules/" + module.name.split(" ").join("");
					}			
					
					if(typeof(module.name) != 'undefined') module.title = module.name;
					if(typeof(module.label) != 'undefined') module.title = module.label;
					module.hash = StringUtils.slugify(module.title);
					
					newModules.push(module);
					
				};
				
				return newModules;
			}
			
	});
});

