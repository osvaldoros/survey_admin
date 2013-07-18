//>>built
require({cache:{
'url:app/uicomponents/templates/LookupField.html':"<div class=\"moduleContainer\">\n\t<div data-dojo-attach-point=\"focusNode\"></div>\n\t<input type=\"text\" required=\"true\" name=\"entity.name\" style=\"width:131px;\" data-dojo-attach-point=\"labelFld\" placeholder=\"Select one\" disabled=\"disabled\" dojoType=\"dijit.form.ValidationTextBox\" /></td>\n\t<div data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"findBtn\">Find</div>\n</div>\n\t\t\n"}});
define("app/uicomponents/LookupField", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/topic",
	"dijit/form/_FormWidget",
	"app/mixins/WidgetMap",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./templates/LookupField.html", // this is what includes the html template
	"dojo/_base/lang",
	"dijit/form/ValidationTextBox"
	],
	function(declare, on, topic, _FormWidget, WidgetMap, _WidgetsInTemplateMixin, template, lang, ValidationTextBox){
	
	return declare("app.uicomponents.LookupField", [_FormWidget, _WidgetsInTemplateMixin, WidgetMap], {

			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!

			entityLabel:undefined,
			title:undefined,
			storeURL:null,

			_value:null,


			startup:function(){
				this.inherited(arguments);

				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}

				this.labelFld = this.getWidget("labelFld");
				this.findBtn = this.getWidget("findBtn");

				this.eventHandlers.push( on( this.findBtn, 'click', lang.hitch(this, "findClicked")) );

			},


			findClicked:function(event){
				var titleString;
				if(typeof(this.title) != "undefined"){
					titleString = this.title;
				}else if(typeof(this.entityLabel) != "undefined"){
					titleString = "Choose a " + this.entityLabel;
				}else{
					titleString = "Choose one";
				}

				__.searchDialog.set("title", titleString);
				__.searchDialog.set("store", this.storeURL);
				__.searchDialog.set("edit_store", this.edit_store);
				__.searchDialog.set("base_query", this.base_query);
				__.searchDialog.set("newButtonHandler", this.newButtonHandler);
				if(typeof(this.columns) != "undefined"){
					__.searchDialog.set("resultColumns", this.columns);
				}else{
					__.searchDialog.set("resultColumns", [
						{label:"Id", field:"id", sortable:true},
						{label:"Name", field:"name", sortable:true},
						{label:"Address", field:"street1", sortable:true},
						{label:"City", field:"city", sortable:true},
						{label:"Phone", field:"phone"}
					]);
				}
				__.searchDialog.show(lang.hitch(this, "entitySelected"));
			},

			entitySelected:function(entity){
				this._value = entity;
				this._setLabel(entity);
				this.onChange(true);
			},

			_setLabel:function(entity){
				var itemDisplay = "";
				if(entity != undefined && entity != null){

					if(typeof(entity) == "string"){
						if(entity != ""){
							if(typeof(this.entityLabel) != "undefined"){
								itemDisplay += this.entityLabel.toLowerCase();
							}

							itemDisplay += " " + entity;
						}else{
							itemDisplay += "removed";
						}
					}else{

						if(typeof(this.entityLabel) != "undefined"){
							itemDisplay += this.entityLabel.toLowerCase();
						}

						if(typeof(entity.name) != "undefined"){
							itemDisplay +=  " " +  entity.name;
						}else if(typeof(entity.id) != "undefined"){
							itemDisplay += " " + entity.id;
						}
					}
				}

				this.labelFld.set("value", itemDisplay);

			},
			
			/**
			 * 
			 * 
			 */
			_setValueAttr: function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
				this.inherited(arguments);
				this._value = value;
				this._setLabel(value);
				if(priorityChange) this.onChange(true);
			},			
			
			
			/**
			 * 
			 * 
			 */
			_getValueAttr: function(){
				this.inherited(arguments);
				return this._value.id;
			}	
			
			
			
	});
});
