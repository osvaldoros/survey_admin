//>>built
require({cache:{
'url:app/uicomponents/templates/CompletionIndicator.html':"<div class=\"moduleContainer\">\n\t<div data-dojo-type=\"dijit.ProgressBar\" style=\"width:150px; clear: both;\" data-dojo-attach-point=\"completionProgress\" data-dojo-props=\"maximum:100, progress:65\"></div>\n\t\n\t<table style=\"clear: both; width: 100%;\">\n\t\t<tr vertical-align=\"middle\">\n\t\t\t<td><span class=\"link\" style=\"margin-bottom: 5px;\">3 pending items</span></td>\n\t\t\t<td style=\"text-align: right;\" ><div data-dojo-type=\"dijit.form.Button\" style=\"padding-right: 0;\" data-dojo-attach-point=\"newPendingItem\">Add</div></td>\n\t\t</tr>\n\t</table>\n</div>\n\t\t\n"}});
define("app/uicomponents/CompletionIndicator", [
	"dojo/_base/declare",
	"dojo/on",
	"dijit/layout/ContentPane",
	"dijit/ProgressBar",
	"app/mixins/StatefulModule",
	"dojo/text!./templates/CompletionIndicator.html", // this is what includes the html template
	"dojo/_base/lang"
	],
	function(declare, on, ContentPane, ProgressBar, StatefulModule, template, lang){
	
	return declare("app.uicomponents.CompletionIndicator", [ContentPane, StatefulModule], {

			content: template, // Our template - important!

			/**
			 * 
			 * startup is called by the framework as part of the livecycle of all widgets, it happens after the children widgets have been created and are ready to be used
			 * Notice we don't use postCreate because the child widgets haven't been created yet, and we need to wait for the dgrid to attach the store to it
			 * 
			 */
			startup:function(){
				this.inherited(arguments);
			},
			
			onActivate:function(){
			},
			
			onDeactivate:function(){
			}
			
	});
});
