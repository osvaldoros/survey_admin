/**
 * 
 * Schema
 * 
 * Functions related to obtaining meta data about entities and their fields
 * 
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"app/store/UIStores"
	],
	function(declare, lang, UIStores){

		
	var classRef = declare("app.meta.Schema", [], {
		//===========================================================
		// Instance members
		//===========================================================
		//** This class since it is a pure utility doesn't need any instance members
	});
	
	//===========================================================
	// Static members
	//===========================================================
	lang.mixin(app.meta.Schema, {

     	typeToWidget : {
			"string" : "dijit.form.ValidationTextBox",
			"object_id" : "dijit.form.ValidationTextBox",
			"timestamp" : "dijit.form.ValidationTextBox",
			"time" : "dijit.form.ValidationTextBox",
			"long" : "dijit.form.ValidationTextBox",
			"double" : "dijit.form.ValidationTextBox",
			"link" : "dijit.form.ValidationTextBox",
			"boolean" : "dijit.form.CheckBox",
			"date" : "dijit.form.DateTextBox",
			"list" : "app.form.FilteringSelect",
			"ref" : "app.form.FilteringSelect",
			"enum" : "app.form.FilteringSelect"
		},

		excludeFields:{
			org_path:true
		},

		modelCache:{

		},

		/**
		*
		*
		* Given a model name, returns the metadata of that model via an asynchronous callback
		*
		*/
		getModel:function(modelName, callBack){
			if(typeof(modelName) != "string") {
				console.warn("modelName must be a string in call Schema.getModel");
				return;
			}			

			if(typeof(callBack) != "function") {
				console.warn("callBack must be a function in call Schema.getModel");
				return;
			}

			if(app.meta.Schema.modelCache.hasOwnProperty(modelName)){
				return callBack( app.meta.Schema.modelCache[modelName] );
			}

			var req = __.api.get("/__/_meta/" + modelName );
			req.then(function(response){
				app.meta.Schema.modelCache[modelName] = response;
				callBack(response);
			})
		},

		getModelNameFromStoreURL:function(storeURL){
			if(typeof(storeURL) != "string" || storeURL == ""){
				console.warn("Invalid storeURL used in call to Schema.getModelNameFromStoreURL");
				return null;
			}

			var urlArray = storeURL.split("/");
			var lastPiece = urlArray[urlArray.length - 1];
			var lastPieceNoQuestionmark = lastPiece.split("?")[0];

			return lastPieceNoQuestionmark;
		},

		getModelAsDynamicFormByStoreURL:function(storeURL, callBack){
			var modelName = app.meta.Schema.getModelNameFromStoreURL(storeURL);
			app.meta.Schema.getModelAsDynamicForm(modelName, callBack);
		},


		getModelAsDynamicForm:function(modelName, callBack){
			app.meta.Schema.getModel(modelName, function(modelMeta){


				var formMeta = [];
				var groupMap = {};

				for (var i = modelMeta.properties.length - 1; i >= 0; i--) {
					var field = modelMeta.properties[i];
					if(app.meta.Schema.excludeFields.hasOwnProperty(field.name)){
						continue;
					}

					var uiGroup;
					if(field.hasOwnProperty("ui_group")){
						uiGroup = field.ui_group
					}else{
						uiGroup = "basic_info";
					}

					var group;
					if(groupMap.hasOwnProperty(uiGroup)){
						group = groupMap[uiGroup];
					}else{
						var title = uiGroup;
						group = {title:title, fields:[]};
					}


					var processedField = app.meta.Schema.processField(field);
					if(processedField != null){
						group.fields.push( processedField );
					}

					groupMap[uiGroup] = group;

				};

				for(var p in groupMap){
					formMeta.push(groupMap[p]);
				}

				callBack(formMeta);

			})
		},

		processField:function(field){
			var formField = {fieldOptions:{}};
			formField.label = field.label || field.name;
			formField.name = field.name;
			formField.readOnly = field.read_only;
			app.meta.Schema.calculateFieldType(formField, field)
			
			if(formField.hasOwnProperty("fieldType")){
				return formField;
			}

			return null;
		},

		calculateFieldType:function(targetField, fieldMeta){

			if(fieldMeta.prop_type == "primitive" && app.meta.Schema.typeToWidget.hasOwnProperty(fieldMeta.type)){
				targetField.fieldType = app.meta.Schema.typeToWidget[fieldMeta.type];
			}else if(fieldMeta.prop_type == "ref" || fieldMeta.prop_type == "enum"){
				if(targetField.readOnly || fieldMeta.type == "rnd_sel"){
					targetField.fieldType = app.meta.Schema.typeToWidget["link"];
				}else{
					targetField.fieldType = app.meta.Schema.typeToWidget[fieldMeta.prop_type];
				}
				targetField.ref = fieldMeta.type;

				var preloadedStoreFunction = UIStores.getInstance().getPreloadForModel(fieldMeta.type);
				if(typeof(preloadedStoreFunction) != "undefined"){
					targetField.fieldOptions.storeFunction = preloadedStoreFunction;
				}else{
					targetField.fieldOptions.storeURL = dojo.config.appSpecific.api_host + "__/" + fieldMeta.type;
				}

			}
		}
		
	});
	
	
		
	return classRef
	
});
