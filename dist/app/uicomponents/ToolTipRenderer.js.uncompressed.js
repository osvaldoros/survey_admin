//>>built
define("app/uicomponents/ToolTipRenderer", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/dom-class",
	"dojo/_base/lang",
	"./MoreInfoRenderer",
	"app/utils/HashManager"
	],
	function(declare, on, domClass, lang, MoreInfoRenderer,HashManager){
		
		var classRef = declare("app.uicomponents.ToolTipRenderer", [], {
			//** This class since it is a pure utility doesn't need any instance members
		});


		//===========================================================
		// Static members
		//===========================================================
		lang.mixin(app.uicomponents.ToolTipRenderer, {

			hashManager:HashManager.getInstance(),

		
			userTooltipFunction:function(data){
				var objectInfo = "";
				if(data != undefined){
					objectInfo += "<div class='moreInfo'>";
					objectInfo += "<h2>" + data.name + "</h2>";
					objectInfo += "<ul>";
					for(var p in data){
						if(!this.excludeProperties[p]){
							var display = null;
							if(typeof(data[p]) == "string"){
								display = data[p];
							}else if(typeof(data[p]) == "object" && data[p] != null && data[p].hasOwnProperty("name")){
								display = data[p].name;
							}

							if(display != null){
								if(display.length > 30){
									display = display.substring(0, 30) + "...";
								}
								if(p != "role"){
									//To manipulate the tooltip behavior you need to indicate if the tooltip will have a link or not
									objectInfo += "<li><strong>"+p+ "</strong> : " + display +"</li>";
								}
								else
								{
									//To manopulate the tooltip behavior you need to indicate if the tooltip will have a link or not
									data.hasLink = true;
									var link = HashManager.getInstance().addAuthToken( HashManager.getInstance().addIdToURL( __.urls.model.links.editor[data[p].$ref] , data[p].id ));
									objectInfo += "<li><strong>"+p+ "</strong> : <a href=" + link + " target=\"_blank\"> " + display + "</a> </li>";;
								}
							}
						}
					}
					objectInfo += "</ul>";
					objectInfo += "</div>";
				}
				return objectInfo;
			}
		});
		return classRef
});