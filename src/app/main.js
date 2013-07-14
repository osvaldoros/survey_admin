/**
 * This file is your application’s main JavaScript file. It is listed as a dependency in run.js and will
 * automatically load when run.js loads.
 *
 * Because this file has the special filename “main.js”, and because we’ve registered the “app” package in run.js,
 * whatever object this module returns can be loaded by other files simply by requiring “app” (instead of “app/main”).
 *
 * Our first dependency is to the “dojo/has” module, which allows us to conditionally execute code based on
 * configuration settings or environmental information. Unlike a normal conditional, these branches can be compiled
 * away by the build system; see “staticHasFeatures” in app.profile.js for more information.
 *
 * Our second dependency is to the special module “require”; this allows us to make additional require calls using
 * relative module IDs within the body of our define function.
 *
 * In all cases, whatever function is passed to define() is only invoked once, and the return value is cached.
 *
 * More information about everything described about the loader throughout this file can be found at
 * http://livedocs.dojotoolkit.org/loader/amd.
 */
define([
	"dijit/layout/LayoutContainer", 
	"dijit/layout/StackContainer", 
	"dijit/layout/ContentPane", 
	"dojo/_base/declare",
	"dgrid/Selection",
	"dgrid/GridFromHtml",
	"dojo/topic",
	"app/uicomponents/Alert",
	"app/uicomponents/Spinner",
	"dojo/dom-class",
	"app/utils/API",

	"app/store/Entities",
	"app/store/GridFormatters", // Since this guy is purely static and used mostly in html templates we need to make sure it is loaded here
	"app/config/URLs",
	"app/loader/ModuleLoader",
	
	"dojo/domReady!"],
	function(LayoutContainer, StackContainer, ContentPane, declare, Selection, GridFromHtml, topic, Alert, Spinner, domClass, API,
		Entities, GridFormatters, URLs, ModuleLoader){
    	//var app = {};
		__ = {};
		
		
		// global instances
		__.urls = new URLs();
		__.urls.init();
		__.api = API;
		__.alert = new Alert();
		__.spinner = new Spinner();
		__.entities = new Entities();
		
		// Global IO listener for outgoing requests
		topic.subscribe("/dojo/io/send", function(defered, response){
			if(typeof(defered) == "object" && defered != null && typeof(defered.ioArgs) == "object" && defered.ioArgs != null ){
				if(defered.ioArgs.handleAs == "json" && defered.ioArgs.args.showLoader !== false){
					__.spinner.spin();
				}
			}
		})
		
		// Global IO listener for completed requests
		topic.subscribe("/dojo/io/done", function(defered, response){
			if(typeof(defered) == "object" && defered != null && typeof(defered.ioArgs) == "object" && defered.ioArgs != null ){
				if(defered.ioArgs.handleAs == "json"){
					__.spinner.unspin();
					
					if(typeof(response) == "object" && response != null && response.hasOwnProperty("error")){
						console.log(response.error)
						
						// Authorization error
						if(response.error.code > 5000 && response.error.code < 6000){
							__.logout();
						}
						
						if(response.error.code != 2000){
							//__.alert.set("message", response.error.message);
							console.warn(response.error.message);
							//__.alert.show();
						}
						
					}
				}
			}
		})
		
		
		
		// This is so that all grids created via HTML are selectable
    	/*
		*/
		CustomGrid = declare([GridFromHtml, Selection]),
		// need to expose GridFromHtml as a global for parser to find.
		// *** this is needed for widgets nested in html templates ( declaring a dgrid in html). According to Dojo this won't be needed in Dojo 1.8
		window.dgrid = { Grid: CustomGrid };
		
		
		var appLayout = new LayoutContainer({
			design: "headline"
		}, "appLayout");


		// create the TabContainer
		__.topLevelComponents = new StackContainer({
			region: "center",
			id: "topLevelComponents"
		})
		
		__.logout = function(){
			delete __.user;
			__.authManager.logout();
			__.setCurrentState('app/Auth');
		}
		
		__.getCurrentState = function(){
			return __.topLevelComponents.selectedChildWidget.moduleURL;
		}
		
		__.setCurrentState = function(value){
			var topLevelChildren = __.topLevelComponents.getChildren();
			for (var i=0; i < topLevelChildren.length; i++) {
				var child = topLevelChildren[i];
				if(child.moduleURL == value){
					__.topLevelComponents.selectChild(child);
					break;
				}
			};
		}
		
		appLayout.addChild( __.topLevelComponents );
		appLayout.addChild( __.spinner );
		
		//var workspace =  new Workspace();
		//var auth =  new Auth();
		
		//__.topLevelComponents.addChild(auth);
		//__.topLevelComponents.addChild(workspace);
		
		__.topLevelComponents.addChild(new ContentPane()); // dummy state with nothing ( needed to trigger activate event when selecting app/Auth )
		__.topLevelComponents.addChild(new ModuleLoader({moduleURL:'app/Auth', parentStack: __.topLevelComponents}));
		__.topLevelComponents.addChild(new ModuleLoader({moduleURL:'app/Workspace', parentStack: __.topLevelComponents}));
		
		// start up and do layout
		appLayout.startup();
		
		__.setCurrentState("app/Auth");
		
		//__.spinner.spin();
		
			
});