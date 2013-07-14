define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"dojo/on",
	"dojo/_base/lang",		
	"dojo/text!./templates/MoreInfoRenderer.html", // this is what includes the html template
	"dijit/_WidgetBase", 
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/WidgetMap",
	"app/utils/HashManager",
	"app/utils/TooltipDialogController"
	],
	function(declare, domClass, on, lang, template, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, WidgetMap, HashManager, TooltipDialogController){
		
		return declare("app.uicomponents.MoreInfoRenderer", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, WidgetMap, TooltipDialogController], {
			templateString: template,
			hashManager:HashManager.getInstance(),
			useLink:true,
			clipLongProperties:true,
			
			startup:function(){
				this.inherited(arguments);
				var owner = this;

				// get reference to the span we are going to use to popup the tooltip
				this.name = this.getWidget("name");
				this._nameProperty = this._nameProperty || "name";
				
				this.renderItem();

				// use getContent to construct the html string that will be displayed in the tooltip
				var objectInfo = this.getContent();

				// defined in TooltipDialogController ( sets up listeners)
				this.initDialog(objectInfo, this.name);
			},


			renderItem:function(){
				// update the text in the span to match the "name" of the data if one exists
				if(this._data && this._data.hasOwnProperty("$ref") && __.urls.model.links.editor.hasOwnProperty(this._data.$ref) && this.useLink){
					var link = HashManager.getInstance().addAuthToken( HashManager.getInstance().addIdToURL(__.urls.model.links.editor[this._data.$ref], this._data.id) );
					this.name.innerHTML = '<a href="'+ link +'" target="_blank">'+ this.getName() +'</a>'
				}else{
					this.name.innerHTML = this.getName();
				}
			},

			getName:function(){

				if(typeof(this._computedName) == "string" && this._computedName != null){
					return this._computedName;
				}

				if(this._data && this._data.hasOwnProperty(this._nameProperty)){
					return this._data[this._nameProperty];
				}

				return "";

			},

			excludeProperties:{
				"$ref":true,
				"org_path":true,
				"id":true
			},
			
			getContent:function(){

				var tooltipTitle = this._tooltipTitle || this.getName();

				var objectInfo = "";
				objectInfo += "<div class='moreInfo'>";
					objectInfo += "<h2>" + tooltipTitle + "</h2>";
					objectInfo += "<ul>";

					for(var p in this._data){
						if(!this.excludeProperties[p]){
							objectInfo += this.evaluateProperty(p, this._data[p])
						}
					}

					objectInfo += "</ul>";
				objectInfo += "</div>";

				return objectInfo;
			},

			evaluateProperty:function(name, prop){

				var contentString = "";
				var display = null;

				if(typeof(prop) == "string"){
					display = prop;
				}else if(typeof(prop) == "object" && prop != null && prop.hasOwnProperty("name")){
					if(prop.hasOwnProperty("$ref") && __.urls.model.links.editor.hasOwnProperty(prop.$ref)){
						var link = HashManager.getInstance().addAuthToken( HashManager.getInstance().addIdToURL( __.urls.model.links.editor[prop.$ref], prop.id ));
						return "<li><strong>"+name+ "</strong> : <a href=" + link + " target=\"_blank\"> " + prop.name + "</a> </li>";
					}else{
						display = prop.name;
					}

				}else if(typeof(prop) == "object" && prop != null){
					display = "<ul>";

					for(var p in prop){
						if(!this.excludeProperties[p]){
							if(typeof(prop[p]) == "object" && prop[p] != null){
								display += this.evaluateProperty(p, prop[p])
							}else{
								display += "<li><strong>"+p+ "</strong> : " + prop[p] +"</li>"
							}
						}
					}

					display += "</ul>";
				}

				if(display != null){
					if(display.length > 30 && this.clipLongProperties){
						display = display.substring(0, 30) + "...";
					}
					contentString = "<li><strong>"+name+ "</strong> : " + display +"</li>";
				}

				return contentString;
			}

	});
});
