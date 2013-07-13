define([
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

				emanda2.searchDialog.set("title", titleString);
				emanda2.searchDialog.set("store", this.storeURL);
				emanda2.searchDialog.set("edit_store", this.edit_store);
				emanda2.searchDialog.set("base_query", this.base_query);
				emanda2.searchDialog.set("newButtonHandler", this.newButtonHandler);
				if(typeof(this.columns) != "undefined"){
					emanda2.searchDialog.set("resultColumns", this.columns);
				}else{
					emanda2.searchDialog.set("resultColumns", [
						{label:"Id", field:"id", sortable:true},
						{label:"Name", field:"name", sortable:true},
						{label:"Address", field:"street1", sortable:true},
						{label:"City", field:"city", sortable:true},
						{label:"Phone", field:"phone"}
					]);
				}
				emanda2.searchDialog.show(lang.hitch(this, "entitySelected"));
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
