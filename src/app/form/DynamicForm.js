define([
	"dojo/_base/declare",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/dom-style",	
	"dojo/on",
	"dojo/topic",
	"dojo/_base/lang",		
	"dojo/text!./templates/DynamicForm.html", // this is what includes the html template
	"dijit/_WidgetBase", 
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",

	"dijit/form/ToggleButton",
	"dijit/form/Button",	

	"app/store/UIStores",
	"app/utils/HashManager",
	"app/utils/ChangeTracker",	

	"dojox/validate",
	"dojox/validate/web",
	"app/utils/ArrayUtils",
	"app/form/Manager",
	"app/mixins/FormManager",
	"dijit/form/Textarea",
	"dijit/form/TextBox",
	"dijit/form/TimeTextBox",
	"dijit/form/DateTextBox",
	"dijit/form/Select",
	"dijit/form/ComboBox",
	"app/form/FilteringSelect",
	"dijit/form/CheckBox",
	"dijit/form/RadioButton",
	"dijit/form/ValidationTextBox",
	"app/uicomponents/LookupField"

	],
	function(declare, domClass, domConstruct, domStyle, on, topic, lang, template, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule,
		ToggleButton, Button,
		UIStores, HashManager, ChangeTracker,
		Validate, Validate_web, ArrayUtils, Manager, DCFormManager, Textarea, TextBox, TimeTextBox, DateTextBox, Select, ComboBox, FilteringSelect, CheckBox, RadioButton, ValidationTextBox, LookupField){
		
		return declare("app.form.DynamicForm", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, DCFormManager], {
			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template,

			hashManager: HashManager.getInstance(),			
			uiStores: UIStores.getInstance(),			
			changeTracker: ChangeTracker.getInstance(),	
			paddingLeft:"5px",

			
			startup:function(){
				this.inherited(arguments);

				this._form = this.getWidget("_form");
				
				this._form.set("refreshUI", lang.hitch(this, "refreshMetaFormUI"));
				this._table = this.getWidget("_table");
				if(typeof(this.storeURL) != "undefined"){
					this.set("storeURL", this.storeURL);
				}
			},

			_setStoreURLAttr:function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
				this._form.set("storeURL", value);
			},

			resize:function(){

			},

			generateMetaForm:function(formMeta, data, dataOverrides, config){

				if(typeof(config) == "undefined"){
					config = {}
				};

				if(!config.hasOwnProperty("columns")) config.columns = 1;
				if(!config.hasOwnProperty("labelPlacement")) config.labelPlacement = "top"; // options = "top" or "left" 
				if(!config.hasOwnProperty("showSubheadings")) config.showSubheadings = true;
				if(!config.hasOwnProperty("validSubheadings")) config.validSubheadings = null;

				if(typeof(config.style) != "undefined"){
					domStyle.set(this._form.domNode, config.style);
				}else{
					domStyle.set(this._form.domNode, {
						"overflow": undefined,
						"height":undefined, 
						"margin-bottom": undefined,
						"background":undefined
					})
				}


				if(typeof(this._table.id) == "undefined" || this._table.id == ""){
					this._table.id = this.id + "__table";
				}

				if(typeof(dataOverrides) != "object" || dataOverrides == null){
					dataOverrides = {};
				}

				this.removeFormListeners();
				this._form.clearWidgets();
				domConstruct.empty(this._table.id);

				this.keyDependencies = {};
				this.fieldMap = {};

				var addDivider = false;
				for (var i = 0; i < formMeta.length ; i++) {
					var compartment = formMeta[i];
					if(config.validFieldSets == null || (config.validFieldSets.hasOwnProperty(compartment.title) && config.validFieldSets[compartment.title] == true)){
						this.buildFieldsFromArray(compartment.fields, compartment.title, addDivider, config);
						addDivider = true;
					}
				};

				var formData = lang.clone(data);
				var mixedData = lang.mixin(formData, dataOverrides);


				if(lang.isArray(mixedData.links)){
					for (var i = mixedData.links.length - 1; i >= 0; i--) {
						var link = mixedData.links[i];
						if(typeof(link.id) != "undefined"){
							mixedData[link.link_id] = link;
						}
					};
				}

				this.viewInForm(mixedData, this._form);

			},


			buildFieldsFromArray:function(fieldsMeta, subheading, addDivider, config){
				var owner = this;	
				if(lang.isArray(fieldsMeta) && fieldsMeta.length > 0){
					var headerTr;
					var headerTd;

					// add a divider ruler if specified
					if(addDivider === true && config.columns == 1){
						headerTr = domConstruct.toDom('<tr></tr>');
						headerTd = domConstruct.toDom('<td><hr/></td>');	

						domConstruct.place(headerTr, this._table);					
						domConstruct.place(headerTd, headerTr);		

					}

					// add a grouping header
					headerTr = domConstruct.toDom('<tr></tr>');
					domConstruct.place(headerTr, this._table);					

					if(typeof(subheading) != "undefined" && subheading != null && config.showSubheadings === true){
						headerTd = domConstruct.toDom('<td style="padding-left: '+this.paddingLeft+'; font-weight:bold;">'+ subheading +'</td>');					
						domConstruct.place(headerTd, headerTr);
					}

					var currentColumns = 0;
					var labelTr;
					var labelTd;

					// loop through the fields, create the matching widgets and add them to the form
					for (var i = fieldsMeta.length - 1; i >= 0; i--) {
						var field = fieldsMeta[i];

						var labelDiv;
						var buttonString = "";
						var newButton = undefined;
						var editButton = undefined;
						currentColumns++;

						//---------------- Label -----------------------

						var fieldOptions 
						if(typeof(field.fieldOptions) == "object" && field.fieldOptions != null){
							fieldOptions = lang.clone(field.fieldOptions);
						}else{
							fieldOptions = {}
						} 

						if(typeof(labelTr) == "undefined" || currentColumns >= config.columns){
							// create a row for the label 
							labelTr = domConstruct.toDom('<tr></tr>');
							currentColumns = 0;
						}


						if(config.labelPlacement == "top"){
							labelTd = domConstruct.toDom('<td style="padding-left: '+this.paddingLeft+'"></td>');
							// contruct the label and add it to the td
							labelDiv = domConstruct.toDom('<div style="float:left; '+buttonString+'">'+ field.label +'</div>');

						}else if(config.labelPlacement == "left"){
							labelTd = domConstruct.toDom('<td label="true" style="padding-left: '+this.paddingLeft+'";></td>');
							// contruct the label and add it to the td
							labelDiv = domConstruct.toDom('<div '+buttonString+'" style="padding-bottom:15px;">'+ field.label +'</div>');
						}
						// if there is a link in this field we'll add an <a> tag next to the label
						

						domConstruct.place(labelDiv, labelTd);


						if(typeof(field.link) != "undefined"){
							openLinkNode =  domConstruct.toDom('<span><a style="margin-left:5px;" href="'+ field.link +'" target="_blank">open</a></span>') ;
							removeLinkNode = domConstruct.toDom('<span><span class="XwBorder" style="margin-left:3px;">x</span></span>');
						}else{
							openLinkNode =  domConstruct.toDom('<span></span>');
							removeLinkNode = domConstruct.toDom('<span></span>');
						}

						domConstruct.place(openLinkNode, labelDiv, "last");
						domConstruct.place(removeLinkNode, labelDiv, "last");
						
						// if we have an editor for the model, create a button to allow the creation of new entities
						var hasEditorOrHandler = (__.urls.model.modules.editor.hasOwnProperty(field.basicName) || typeof(fieldOptions.newHandler) == "function");
						var isNewEnabled = (!fieldOptions.hasOwnProperty("disableNew") || fieldOptions.disableNew == false);

						if(hasEditorOrHandler && isNewEnabled){
							newButton = domConstruct.toDom('<span><span class="XwBorder" style="margin-left:3px;">new</span></span>');
							editButton = domConstruct.toDom('<span><span class="XwBorder" style="margin-left:3px;">edit</span></span>');
							
							var newButtonDiv = domConstruct.toDom('<div style="float:right;"></div>');
							//newButton.placeAt(newButtonDiv, "last");
							domConstruct.place(editButton, newButtonDiv);
							domConstruct.place(newButton, newButtonDiv);
							domConstruct.place(newButtonDiv, labelTd);
						}

						field.openLinkNode = openLinkNode;
						field.removeLinkNode = removeLinkNode;

						domConstruct.place(labelTr, this._table);					
						domConstruct.place(labelTd, labelTr);

						if(typeof(field.fieldType) != "undefined"){
							//---------------- Widget -----------------------

							var tr 

							if(config.labelPlacement == "top"){
								tr = domConstruct.toDom('<tr></tr>');
							}else if(config.labelPlacement == "left"){
								tr = labelTr;
							}

							var td = domConstruct.toDom('<td style="padding-left: '+this.paddingLeft+'; padding-bottom:15px;"></td>');
							// get a class reference by name, fieldType contains a string like "dijit.form.ValidationTextBox"
							var _WidgetClassRef = lang.getObject(field.fieldType);
							// prepare initObject for the widget
							var pendingArrayToLoad = null;
							var pendingRESTStore = null
							if(typeof(fieldOptions.storeFunction) == "function"){
								fieldOptions.store = [];
							}else if(lang.isArray(fieldOptions.store)){
								pendingArrayToLoad = fieldOptions.store;
								fieldOptions.store = [];
							}else if(typeof(fieldOptions.storeURL) == "string"){
								fieldOptions.store = [];
								pendingRESTStore = fieldOptions.storeURL;
							}

							fieldOptions.name = field.name;
							fieldOptions.required = false;
							fieldOptions.observer = "recordChange, refreshUI"; // needed for the form to be able to track changes correctly
							if(typeof(field.ref) != "undefined") fieldOptions["$ref"] = field.ref;

							// --------------- Main Widget Instantiation ----------------------
							var formwidget = new _WidgetClassRef(fieldOptions);

							if(formwidget.isInstanceOf && formwidget.isInstanceOf(CheckBox)){
								formwidget.set("value", true)
							}

							if(formwidget.name.toLowerCase() == "keys.company" || formwidget.name.toLowerCase() == "keys.donor"){
								formwidget.set("hasToolTip",true);
							}
							field.widget = formwidget; // this is only relevant when we store the field somewhere, i.e. a field dependency map



							// wiring of the removeLink function
							if(typeof(fieldOptions.removeLinkFunction) == "function"){
								owner.formEventHandlers.push(
									on(removeLinkNode, "click", function(localField, localOpenNode, localRemoveNode){
										return function(){
											fieldOptions.removeLinkFunction(localField, localOpenNode, localRemoveNode);
										}
									}(field, openLinkNode, removeLinkNode))
								);
							}

							if(formwidget.isInstanceOf && formwidget.isInstanceOf(LookupField)){

								// for lookup fields, hide the new button ( the new button is built into the search dialog )
								if(typeof(newButton) != "undefined"){
									//newButton.domNode.style.display = "none";
									newButton.style.display = "none";
									editButton.style.display = "none";
								}

								if(typeof(fieldOptions.findFunction) == "function" && typeof(fieldOptions.entitySelectedTopicEvent) != "undefined"){
									formwidget.findClicked = function(localField){
										return function(event){
											return fieldOptions.findFunction(localField);
										}
									}(field);

									// this connects the topic event fired when we found the entity ( however we did that in our custom code ) to the entitySelected event in the lookupField
									this.formEventHandlers.push(
										topic.subscribe(fieldOptions.entitySelectedTopicEvent, function(localField, localOpenNode, localRemoveNode){
											return function(data){
												var eventIsForMe = false;
												// if there is a link use it to verify the field
												if(typeof(data.link) != "undefined"){
													if(data.link.link_id == localField.link_id){
														eventIsForMe = true;
													}

												// if there isn't don't verify
												}else{
													eventIsForMe = true;
												}

												if(eventIsForMe){
													localField.widget.entitySelected(data.entity)
												}
											}
										}(field, openLinkNode, removeLinkNode))
									);

								};
								
								formwidget.set("link_id", field.link_id);
								formwidget.set("storeURL", fieldOptions.storeURL);
								formwidget.set("edit_store", fieldOptions.edit_store);
								formwidget.set("base_query", fieldOptions.base_query);
								formwidget.set("columns", fieldOptions.columns);
								formwidget.set("entityLabel", fieldOptions.entityLabel);
								formwidget.startup();
							}else{
								// populate combos
								if(typeof(fieldOptions.storeFunction) == "function"){
									this.uiStores.populateCombo(formwidget, fieldOptions.storeFunction);
								}else if(lang.isArray(pendingArrayToLoad)){
									this.uiStores.populateComboArray(formwidget, pendingArrayToLoad)
								}else if(pendingRESTStore != null){
									this.uiStores.populateComboDynamicREST(formwidget, pendingRESTStore, fieldOptions.base_query);
								}
							}


							// -------------------- new Button handlers (needs to be after widget instantiation ) ------------------------
							if(typeof(newButton) != "undefined"){

								if(typeof(fieldOptions.newHandler) == "function"){
									// if a custom newHandler is defined, it is the responsibility of the implementor to wire things together and pass necesary dependencies
									this.formEventHandlers.push(
										on(newButton, "click", function(localOptions, localField){
												return function(event){
													localOptions.newHandler(localField, owner.getDependentValues(localField));
												}
											}(fieldOptions, field)
										)
									);
								}else{
									// by default the new button will open a dialog, with an editor matched by model name i.e. DonorSetup for 'donor'
									// - in this auto-dialog, dependencies are evaluated so that, say, if DonorSetup needs a company to be injected it will be passed in the newHandler
									var editor = __.urls.model.modules.editor[field.basicName];
									var dialogOptions = {
										title : 'New ' + field.basicName,  
										dialogWidth: editor.width,
										dialogHeight: editor.height,
										// when the dialog is ready, we will get it via this callBack
										dialogReady: function(localButton, localField){ // this self-executing func is to localize newButton
											return function(dialog){ // this is the func that actually gets assigned as the callBack

												var newHandler = function(event){
													owner.metaNewButtonClicked(localField, dialog);
												}

												if(localField.widget.isInstanceOf && localField.widget.isInstanceOf(LookupField)){
													localField.widget.set("newButtonHandler", newHandler)
												}else{
													// When the callBack is triggered we will wire the Button handler
													//because at that point we will have the dialog reference we need
													owner.formEventHandlers.push(
														on(localButton, "click", newHandler)
													);
												}

													
											}
										}(newButton, field),
										// callBacks object for the Dialog, used for standard events in Saver and other mixins
										callBacks:{
											entityCreated:function(localWidget, localField){
												return function(entity){
													owner.metaEntityCreated(localWidget, localField, entity);
												}
											}(formwidget, field)
										}
									};

									__.workspaceManager.getDialogFromModuleURL(editor.url, dialogOptions);
								}
							}



							// -------------------- edit Button handlers (needs to be after widget instantiation ) ------------------------
							if(typeof(editButton) != "undefined"){

								if(typeof(fieldOptions.editHandler) == "function"){
									// if a custom newHandler is defined, it is the responsibility of the implementor to wire things together and pass necesary dependencies
									this.formEventHandlers.push(
										on(editButton, "click", function(localOptions, localField){
												return function(event){
													localOptions.editHandler(localField, owner.getDependentValues(localField));
												}
											}(fieldOptions, field)
										)
									);
								}else{
									// by default the new button will open a dialog, with an editor matched by model name i.e. DonorSetup for 'donor'
									// - in this auto-dialog, dependencies are evaluated so that, say, if DonorSetup needs a company to be injected it will be passed in the newHandler
									var editor = __.urls.model.modules.editor[field.basicName];
									var editDialogOptions = {
										title : 'Edit ' + field.basicName,  
										dialogWidth: editor.width,
										dialogHeight: editor.height,
										// when the dialog is ready, we will get it via this callBack
										dialogReady: function(localButton, localField){ // this self-executing func is to localize newButton
											return function(dialog){ // this is the func that actually gets assigned as the callBack

												var editHandler = function(event){
													owner.metaEditButtonClicked(localField, dialog);
												}

												if(localField.widget.isInstanceOf && localField.widget.isInstanceOf(LookupField)){
													localField.widget.set("editButtonHandler", editHandler)
												}else{
													// When the callBack is triggered we will wire the Button handler
													//because at that point we will have the dialog reference we need
													owner.formEventHandlers.push(
														on(localButton, "click", editHandler)
													);
												}

													
											}
										}(editButton, field),
										// callBacks object for the Dialog, used for standard events in Saver and other mixins
										callBacks:{
											entitySaved:function(localWidget, localField){
												return function(entity){
													owner.metaEntitySaved(localWidget, localField, entity);
												}
											}(formwidget, field)
										}
									};

									__.workspaceManager.getDialogFromModuleURL(editor.url, editDialogOptions);
								}
							}


							// add widget to the dom
							formwidget.placeAt(td, "first");
							domConstruct.place(tr, this._table);
							domConstruct.place(td, tr);

							// --------------------- REGISTER (add widget to the form so it can manage it)
							this._form.registerWidget(formwidget);

							// wire listener for focus events (if configured we can cause the document to pan & zoom to a specific point automatically when a given field is focused)
							/*if(typeof(field.focusViewPoint) == "object" && field.focusViewPoint != null){
								this.formEventHandlers.push( on(formwidget, "focus", function(localWidget, localField){
									return function(event){
										owner.fieldGainedFocus(localWidget, localField);
									}
								}(formwidget, field)) );
							}*/					
						}

						// store the fields in a fieldMap to be able to access them later
						this.fieldMap[field.name] = field;

						// for filteringSelects that are tied to another entity, i.e. donors of a company
						if(field.hasOwnProperty("dependsOn")){
							this.keyDependencies["keys."+field.dependsOn] = field;
						}

					};
				}
			},

			setWidgetByFieldName:function(fieldName, value){

			},

			getWidget:function(fieldName){
				if(typeof(this.fieldMap) == "object" && this.fieldMap != null && this.fieldMap.hasOwnProperty(fieldName)){
					return this.fieldMap[fieldName].widget;
				}

				return this.inherited(arguments);

			},

			refreshMetaFormUI:function(value, name, element, event){

				var field = this.fieldMap[name];
				var fieldOptions = field.fieldOptions || {};

				if(typeof(fieldOptions.LinkChangeFunction) == "function"){
					fieldOptions.LinkChangeFunction(field, field.openLinkNode, field.removeLinkNode);
				}
				
				// figure out if there is another field that depends on this field, i.e if Company changed, update donors
				if(this.keyDependencies.hasOwnProperty(name)){
					var dependentField = this.keyDependencies[name];
					var dependentFieldOptions = dependentField.fieldOptions || {};
					this.uiStores.populateComboDynamicREST(dependentField.widget, dependentFieldOptions.storeURL, dependentFieldOptions.base_query);

					var currentItem = dependentField.widget.item;
					if(typeof(currentItem) == "object" && currentItem != null && currentItem.hasOwnProperty(dependentField.dependsOn) && currentItem[dependentField.dependsOn].id != value){
						dependentField.widget.set("value", "");
					}
				}

				// figure out if there is another field parent to this field that we could set automatically based on an embedded property, i.e. choose a Donor automatically populate the Company based on the donor's property
				for(var p in this.keyDependencies){
					var dependeeField = this.keyDependencies[p];
					if(field == dependeeField){
						var parentField = this.fieldMap[p];
						if(typeof(field.widget.item) == "object" && field.widget.item != null && field.widget.item.hasOwnProperty(field.dependsOn) && typeof(field.widget.item[field.dependsOn]) == "object" && field.widget.item[field.dependsOn] != null){
							parentField.widget.set("value", field.widget.item[field.dependsOn].id)
						}
					}
				}

				// call any user defined functions after any work we've done
				if(typeof(fieldOptions.changeFunction) == "function"){
					fieldOptions.changeFunction(value, name, field)
				}
			},

			/*fieldGainedFocus:function(formwidget, field){
				console.log("fieldGainedFocus > ")
				console.log(field);
				this.setViewPoint(field.focusViewPoint);
			},*/

			metaNewButtonClicked:function(field, dialog){
				var fieldOptions = field.fieldOptions || {};
				var requiredEmbed = false;
				if(typeof(field.dependsOn) != "undefined"){
					requiredEmbed = field.dependsOn;
				}

				var dependentValues = this.getDependentValues(field);

				for(var p in dependentValues){
					dialog.set(p, dependentValues[p], true);
					if(requiredEmbed != false && requiredEmbed == p){
						requiredEmbed = false;
					}
				}

				if(!requiredEmbed){
					dialog.setUpdatingEntity(null, true);
					dialog.show();
				}else{
					__.alert.set("message", "Please choose a " + requiredEmbed + " first");
  					__.alert.show();
				}
			},

			metaEditButtonClicked:function(field, dialog){
				var fieldOptions = field.fieldOptions || {};
				var requiredEmbed = false;
				if(typeof(field.dependsOn) != "undefined"){
					requiredEmbed = field.dependsOn;
				}

				var dependentValues = this.getDependentValues(field);

				for(var p in dependentValues){
					dialog.set(p, dependentValues[p], true);
					if(requiredEmbed != false && requiredEmbed == p){
						requiredEmbed = false;
					}
				}

				if(!requiredEmbed){
					dialog.setUpdatingEntity(null, true);
					dialog.show();
				}else{
					__.alert.set("message", "Please choose a " + requiredEmbed + " first");
  					__.alert.show();
				}
			},

			getDependentValues:function(field){
				var dependentValues = {};
				var fieldOptions = field.fieldOptions || {};
				if(typeof(fieldOptions.base_query) == "function"){
					var queryObj = fieldOptions.base_query();
					for(var p in queryObj){
						var embedArr = p.split(".");
						var embedName = embedArr[0];
						var embedValue = queryObj[p];
						var embed = {"$ref":embedName, id:embedValue}
						dependentValues[embedName] = embed;
					}
				}

				return dependentValues;
			},

			metaEntityCreated:function(formwidget, field, entity){
				formwidget.set("value", entity.id);
			},			

			metaEntitySaved:function(formwidget, field, entity){
				formwidget.set("value", entity.id);
			},

			onActivate:function(){
				this.inherited(arguments);
				if(typeof(this.formEventHandlers) == "undefined"){
					this.formEventHandlers = [];
				}
			},

			onDeactivate:function(){
				this.inherited(arguments);
				this.removeFormListeners();
			},


			removeFormListeners:function(){
				//remove event handlers
				for (var i=0; i < this.formEventHandlers.length; i++) {
					var formHandler = this.formEventHandlers[i];
					if(typeof(formHandler) != 'undefined'){
						formHandler.remove();
					}
				};
			}
			
			
	});
});
