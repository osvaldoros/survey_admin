//>>built
/**
 * 
 * StringUtils
 * 
 * Common string utils
 * 
 */
define("app/store/GridFormatters", [
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/aspect",
	"dojo/dom-class",
	"app/store/UIStores",
	"app/uicomponents/MoreInfoRenderer",
	"app/uicomponents/moreInfoRenderers/TestMoreInfoRenderer",
	"dijit/ProgressBar",
	"dijit/form/CheckBox",
	"dijit/form/RadioButton",
	"dijit/Tooltip",
	"app/utils/HashManager",
	"dojo/topic",
	"dojo/on",
	"app/store/GridCheckboxes"

	],
	function(declare, lang, aspect, domClass, UIStores, MoreInfoRenderer, TestMoreInfoRenderer, 
			ProgressBar, CheckBox, RadioButton, Tooltip, HashManager,topic,on, GridCheckboxes){
		
		
	var classRef = declare("app.store.GridFormatters", [], {
		//** This class since it is a pure utility doesn't need any instance members
	});
	
	//===========================================================
	// Static members
	//===========================================================
	lang.mixin(app.store.GridFormatters, {
		
		//===========================================================
		// Simple Formatters ( single string processing )
		//===========================================================
		/**
		 * hourFormatter
		 * 
		 * Given a military time it displays returns a friendlier string
		 *  
 		 * @param {Object} item
		 */
		hourFormatter:function(item){
			////console.log(item)
			var hourArray = item.split(":");
			var hour = Number(hourArray[0]);
			var minutes;
			if(hourArray.length > 1){
				minutes = Number(hourArray[1]);
			}
			var pm = false;
			if(hour >= 12){
				pm = true;
			}
			if(hour > 12){
				hour = hour - 12;
			}
			
			if(hour == 0){
				hour = 12;
			}
			
			var label = "";
			label += hour;
			if(typeof(minutes) != "undefined"){
				if(minutes < 10){
					minutes = "0" + minutes;
				}
				label += ":" + minutes;
			}
			
			if(pm){
				label += " pm";
			}
			
			return label;
		},
		
		/**
		 * 
		 * weekDayFormatter
		 * 
		 * Given a number it returns the correspondant name of the week day
		 * 
		 * 
 		 * @param {Object} item
		 */
		weekDayFormatter:function(item){
			return UIStores.getInstance().dayValues[parseInt(item) - 1];
		},	
		
		//===========================================================
		// Cell Renderers 
		//===========================================================
    
    	nestedOrBlankObjectRenderer:function(object, data, td, options, manual_field){
			var path = manual_field || this.field;
			var pathArray = path.split(".");
			var currentObject = object;
			for (var i=0; i < pathArray.length; i++) {
				var propName = pathArray[i];
				if(typeof(currentObject) == "object" && currentObject != null){
					currentObject = currentObject[propName];
				}
			};
			
			if(typeof(currentObject) != "string"){
				currentObject = "";
			}
			
			var div = document.createElement("div");
			div.className = "renderedCell";
			div.innerHTML = currentObject;
			return div;
    	},
		
		nestedObjectRenderer:function(object, data, td, options, manual_field){
			var notFoundLabel = this.hasOwnProperty("notFoundLabel") && this.notFoundLabel != null ? this.notFoundLabel : "";
			var currentObject = app.store.GridFormatters.getNestedObject(object, manual_field || this.field);
			
			if(typeof(currentObject) != "string"){
				currentObject = notFoundLabel;
			}
			
			var div = document.createElement("div");
			div.className = "renderedCell";
			div.innerHTML = currentObject;
			return div;
		},		

		getNestedObject:function(object, path){

			if(path === ".") return object;
			
			var pathArray = path.split(".");
			var currentObject = object;

			for (var i=0; i < pathArray.length; i++) {
				var propName = pathArray[i];
				if(typeof(currentObject) == "object" && currentObject != null){
					currentObject = currentObject[propName];
				}else{
					currentObject = null; // not found
					break;
				}
			};

			return currentObject;
		},

		feeScheduleRenderer:function(object, data, td, options, manual_field){

			var path = manual_field || this.field;
			var currentObject = object;
			var nameObject = object;

			var nameProperty = "name";
			if(this.hasOwnProperty("nameProperty")){
				nameProperty = this.nameProperty;
			}

			if(path != "."){
				var pathArray = path.split(".");
				for (var i=0; i < pathArray.length; i++) {
					var propName = pathArray[i];
					if(typeof(currentObject) == "object" && currentObject != null){
						currentObject = currentObject[propName];
					}
				};			
			}

			var namePathArray = nameProperty.split(".");
			for (var n=0; n < namePathArray.length; n++) {
				var namePropName = namePathArray[n];
				if(typeof(nameObject) == "object" && nameObject != null){
					nameObject = nameObject[namePropName];
				}
			};	

			var renderWidgetInfo = {
				_data: currentObject,
				_computedName:nameObject,
				_nameProperty: nameProperty
			}

			if(typeof(this.useLink) != "undefined"){
				renderWidgetInfo.useLink = this.useLink;
			}

			var rendererWidget = new MoreInfoRenderer(renderWidgetInfo)
			
			var div = document.createElement("div");
			div.className = "renderedCell";

			rendererWidget.placeAt(div);
			rendererWidget.startup();

			return div;
		},		

		checkMarkRenderer:function(object, data, td, options){
			var div = document.createElement("div");
			if(object[this.field] == true){
				div.className = "checkmark_red";
			}
			return div;
		},


		checkBoxRenderer:function(object, data, td, options){
			var id = "_"+object.id;
			var rendererWidget = GridCheckboxes.getInstance().getCheckBox(this.field, id);
			rendererWidget.startup();


			var defaultChecked;
			if(typeof(this.defaultChecked) != "undefined" && (this.defaultChecked === true || this.defaultChecked === false) ){
				defaultChecked = this.defaultChecked;
			}else{
				var currentObject = app.store.GridFormatters.getNestedObject(object, this.field);
				defaultChecked = currentObject == true || currentObject == "true";
			}
			
			rendererWidget.set("checked", defaultChecked);
			rendererWidget.placeAt(td);

		},
		
		nestedObjectCount:function(object, data, td, options){
			var path = this.field;
			var pathArray = path.split(".");
			var currentObject = object;
			for (var i=0; i < pathArray.length; i++) {
				var propName = pathArray[i];
				if(typeof(currentObject) == "object" && currentObject != null){
					currentObject = currentObject[propName];
				}
				
				if(lang.isArray(currentObject) && i < pathArray.length - 1){ // if its an array return the first item
					currentObject = currentObject[0];
				}
			};
			
			if(lang.isArray(currentObject)){
				currentObject = currentObject.length;
			}else{
				currentObject = "0";
			}
			
			var div = document.createElement("div");
			div.className = "renderedCell";
			div.innerHTML = currentObject;
			return div;
		},	

		siteServicesRenderer:function(object, data, td, options){

			var servicesStringArr = [];
			var servicesObj = {};

			for (var i=0; i < object._services.length; i++) {
				var siteService = object._services[i];

				var subtestStringArr = [];
				var subtestObj = {};
				for (var j = siteService.subtest_fee_entries.length - 1; j >= 0; j--) {
					var subtestFeeEntry = siteService.subtest_fee_entries[j];
					if(typeof(subtestFeeEntry.subtest_type) == "object" && subtestFeeEntry.subtest_type != null){
						subtestStringArr.push(subtestFeeEntry.subtest_type.name);
						var feesObj = {};

						if(typeof(subtestFeeEntry.fee) != "undefined") feesObj["fee"] = subtestFeeEntry.fee;
						if(typeof(subtestFeeEntry.fee_to_client) != "undefined") feesObj["fee_to_client"] = subtestFeeEntry.fee_to_client;
						if(typeof(subtestFeeEntry.premium) != "undefined") feesObj["premium"] = subtestFeeEntry.premium;

						subtestObj[subtestFeeEntry.subtest_type.name] = feesObj;
					}
				}

				var serviceName = (typeof(siteService.service) == "object" && siteService.service != null) ? siteService.service.name : "service?";
				subtestString = (subtestStringArr.length > 0) ? subtestStringArr.join(", ") : "subtests?";

				servicesStringArr.push(serviceName + "(" + subtestString + ")");
				servicesObj[serviceName] = subtestObj;

			};
			
			/*
			var div = document.createElement("div");
			div.className = "renderedCell";
			div.innerHTML = servicesStringArr.join("<br/>");
			return div;
			*/

			var renderWidgetInfo = {
				_data: servicesObj,
				_tooltipTitle:"Services",
				clipLongProperties:false,
				_computedName:servicesStringArr.join("<br/>"),
				_nameProperty: "name",
				useLink:false
			}

			var rendererWidget = new MoreInfoRenderer(renderWidgetInfo)
			
			var div = document.createElement("div");
			div.className = "renderedCell";

			rendererWidget.placeAt(div);
			rendererWidget.startup();

			return div;

		},		

		arrayNames:function(object, data, td, options){
			var path = this.field;
			var pathArray = path.split(".");
			var currentObject = object;
			for (var i=0; i < pathArray.length; i++) {
				var propName = pathArray[i];
				if(typeof(currentObject) == "object" && currentObject != null){
					currentObject = currentObject[propName];
				}
				
				if(lang.isArray(currentObject) && i < pathArray.length - 1){ // if its an array return the first item
					currentObject = currentObject[0];
				}
			};
			
			if(lang.isArray(currentObject)){
				currentObject = currentObject.join(", ");
			}else{
				currentObject = "";
			}
			
			var div = document.createElement("div");
			div.className = "renderedCell";
			div.innerHTML = currentObject;
			return div;
		},



		languageNameArray:function(object, data, td, options){
			var path = this.field;
			var pathArray = path.split(".");
			var currentObject = object;
			for (var i=0; i < pathArray.length; i++) {
				var propName = pathArray[i];
				if(typeof(currentObject) == "object" && currentObject != null){
					currentObject = currentObject[propName];
				}
				
				if(lang.isArray(currentObject) && i < pathArray.length - 1){ // if its an array return the first item
					currentObject = currentObject[0];
				}
			};
			
			if(lang.isArray(currentObject)){
				var languagesArray = [];
				for (var i = 0; i < currentObject.length; i++) {
					var arrItem = currentObject[i];
					if(typeof(arrItem) == "object" && arrItem != null && typeof(arrItem.language) == "object" && arrItem.language != null){
						languagesArray.push(arrItem.language.name)
					}
				};
				currentObject = languagesArray.join(", ");
			}else{
				currentObject = "";
			}
			
			var div = document.createElement("div");
			div.className = "renderedCell";
			div.innerHTML = currentObject;
			return div;
		},


		linkRenderer:function(object, data, td, options, manual_field){

			var div = document.createElement("div");
			div.className = "renderedCell";

			div.innerHTML = "<a href='" + data + "' target='_blank'>view report</a>";


			return div;
		},

		moreInfoRenderer:function(object, data, td, options, manual_field){

			var path = manual_field || this.field;
			var currentObject = object;
			var nameObject = object;

			var nameProperty = "name";
			if(this.hasOwnProperty("nameProperty")){
				nameProperty = this.nameProperty;
			}

			if(path != "."){
				var pathArray = path.split(".");
				for (var i=0; i < pathArray.length; i++) {
					var propName = pathArray[i];
					if(typeof(currentObject) == "object" && currentObject != null){
						currentObject = currentObject[propName];
					}
				};			
			}

			var namePathArray = nameProperty.split(".");
			for (var n=0; n < namePathArray.length; n++) {
				var namePropName = namePathArray[n];
				if(typeof(nameObject) == "object" && nameObject != null){
					nameObject = nameObject[namePropName];
				}
			};	

			var renderWidgetInfo = {
				_data: currentObject,
				_computedName:nameObject,
				_nameProperty: nameProperty
			}

			if(typeof(this.useLink) != "undefined"){
				renderWidgetInfo.useLink = this.useLink;
			}

			var rendererWidget = new MoreInfoRenderer(renderWidgetInfo)
			
			var div = document.createElement("div");
			div.className = "renderedCell";

			rendererWidget.placeAt(div);
			rendererWidget.startup();

			return div;
		},

		testMoreInfoRenderer:function(object, data, td, options){

			var renderWidgetInfo = {};



			if(object.newLink){
				renderWidgetInfo._data = object.newLink.test;
			}else{
				renderWidgetInfo._data = app.store.GridFormatters.getNestedObject(object, this.field);
			}
			
			if(typeof(this.useLink) != "undefined"){
				renderWidgetInfo.useLink = this.useLink;
			}			

			var rendererWidget = new TestMoreInfoRenderer(renderWidgetInfo)
			
			var div = document.createElement("div");
			div.className = "renderedCell";

			rendererWidget.placeAt(div);
			rendererWidget.startup();

			return div;
		},

		randomSelectionProgressRenderer:function(object, data, td, options){
			if(typeof(object.progress) == "object" && object.progress != null && object.progress.$ref == "rnd_sel_progress" && object.progress.id == "COMPLETE"){
				return app.store.GridFormatters.nestedObjectRenderer(object, data, td, options, "progress.name");
			}else {
				return app.store.GridFormatters.progressBarRenderer(object, data, td, options);
			}
		},

		progressBarRenderer:function(object, data, td, options){
			if(typeof(__.renderers) != "object" || __.renderers == null){
				__.renderers = {};
			}

			var rendererWidget
			if(__.renderers.hasOwnProperty(object.id)){
				rendererWidget = __.renderers[object.id];
				rendererWidget.update({maximum: object.steps, progress: object.progress});
			}else{
				rendererWidget = new ProgressBar({maximum: object.steps, progress: object.progress})
				rendererWidget.startup();
				__.renderers[object.id] = rendererWidget;
			}

			rendererWidget.placeAt(td);

			return null;
		},

		updateProgressBar:function(data){
			if(__.renderers != null && __.renderers != undefined){
				var rendererWidget = __.renderers[data.target];
				rendererWidget.update({maximum: data.steps, progress: data.progress});
			}
		},

		runExpressionRenderer:function(object, data, td, options){
			var rendererWidget;
			var currentLabel;
			var currentColor;
			var id = "_"+object.id;
			if(__.runExpressionCheckBoxes == undefined || __.runExpressionCheckBoxes == null){
				__.runExpressionCheckBoxes = {};
			}
			if(__.runExpressionCheckBoxes[id] == null || __.runExpressionCheckBoxes[id] == undefined){
				rendererWidget = new CheckBox();
				rendererWidget.set("id",id);
				__.runExpressionCheckBoxes[id] = rendererWidget;
			}else{
				rendererWidget = __.runExpressionCheckBoxes[id];
			}
			
			rendererWidget.startup();
			
			if(object.status == undefined || object.status == null){
				return;
			}
			else if(data == 1){	
				currentLabel = "Add";
				currentColor = "green";
			}
			else{
				currentLabel = "Remove";
				currentColor = "red";
			}
			td.innerHTML = "<label style=\"margin-right: 10px;\" for=\"" + rendererWidget.id +"\"><font color=\""+ currentColor +"\">" + currentLabel +"</font></label>";
			rendererWidget.set("checked",true);
			rendererWidget.placeAt(td);
		},

		billingRunRenderer:function(object, data, td, options){
			var rendererWidget;
			var id = "_"+object.eid;
			if(__.billingRunCheckBoxes == undefined || __.billingRunCheckBoxes == null){
				__.billingRunCheckBoxes = {};
				__.billingRunCheckBoxesLength = 0;
			}
			
			rendererWidget = new RadioButton();
			rendererWidget.set("name",id);

			if(td.columnId.indexOf("Approve") != -1){
				rendererWidget.set("id",id);
				
				rendererWidget.companyName = object.account.name;
				rendererWidget.companyId = object.account.id;
				__.billingRunCheckBoxes[id] = rendererWidget;
				__.billingRunCheckBoxesLength++;
				
				if(object.exceptions && object.exceptions.length > 0){
					for(var i = 0; i < object.exceptions.length; i++){
						if(!object.exceptions[i].warning){
							rendererWidget.set("checked",false);
							break;
						}
						if(i == object.exceptions.length-1){
							rendererWidget.set("checked",true);
							on(rendererWidget, 'change', function(){
								topic.publish("approve-reject-invoice-checked",object, rendererWidget.get("checked"));
							});
						}
					}
				}else{
					rendererWidget.set("checked",true);
					on(rendererWidget, 'change', function(){
						topic.publish("approve-reject-invoice-checked",object, rendererWidget.get("checked"));
					});
				}

			}else{
				rendererWidget.set("id","_"+id);
			}

			if(object.exceptions && object.exceptions.length > 0){
				
				for(var i = 0; i < object.exceptions.length; i++){
					if(!object.exceptions[i].warning){
						rendererWidget.set("disabled",true);
						if(td.columnId.indexOf("Reject") != -1){
							rendererWidget.set("checked",true);
						}
						break;
					}
				}
			}

			rendererWidget.startup();
			rendererWidget.placeAt(td);
		},

		billingRunInternalExceptionRenderer:function(object, data, td, options) {
			if(object.exceptions && object.exceptions.length > 0){
				var exceptionString = "";
				for(var e in object.exceptions){
					if(object.exceptions[e].warning){
						exceptionString +=  "\n\nWarning:\n" + object.exceptions[e].message;
					}else{
						exceptionString +=  "\n\nCritical Error:\n" + object.exceptions[e].message;
					}
				}	
				td.innerHTML = "<span class=\"XwBorder\" title=\"There are internal exceptions." + exceptionString + "\" style=\"background:white;margin-left:35px;\"><font color=\"red\" size=\"3\" >!</span>";
			}
		},

		billingRunNotesRenderer:function(object, data, td, options) {
			if(object.dependencies){
				if(object.dependencies.length > 0){
					var dependenceString = "";
					for(var e in object.dependencies){
						dependenceString +=  "\n" + object.dependencies[e].name;
					}
					object.noteId = "run_notes_" + object.eid;
					td.innerHTML = "<span id=" + object.noteId + " class=\"XwBorder\" title=\"Dependent accounts must be approve/rejected together.\n\nDepends on:" + dependenceString + "\" style=\"background:white;margin-left:35px;display:none\"><font color=\"blue\" size=\"2\" >Conflict</span>";
				}
			}
		},

		billingRunTotalRenderer:function(object, data, td, options) {
			var total = 0;
			if(object.invoices && object.invoices.length){
				for(var i in object.invoices){
					total += object.invoices[i].total;
				}
			}
			td.innerHTML = total.toString();
		},

		creditInvoiceRenderer:function(object, data, td, options){
			var id = object.id;
			var rendererWidget;
			if(__.creditInvoiceCheckBoxes == undefined || __.creditInvoiceCheckBoxes == null){
				__.creditInvoiceCheckBoxes = {};
			}
			if(__.creditInvoiceCheckBoxes[id] == null || __.creditInvoiceCheckBoxes[id] == undefined){
				rendererWidget = new CheckBox();
				rendererWidget.set("id",id);
				rendererWidget.invoice = object;
				__.creditInvoiceCheckBoxes[id] = rendererWidget;
			}else{
				rendererWidget = __.creditInvoiceCheckBoxes[id];
			}
			
			rendererWidget.startup();
			
			//td.innerHTML = "<label style=\"margin-right: 10px;\" for=\"" + rendererWidget.id +"\"></label>";
			rendererWidget.set("checked",true);
			rendererWidget.placeAt(td);
		},

		documentMoreInfoRenderer:function(object, data, td, options){
			var div = app.store.GridFormatters.nestedObjectRenderer(object, data, td, options,"doc_type.name");	
			var link = HashManager.getInstance().addAuthToken( HashManager.getInstance().addIdToURL( __.urls.model.links.editor["doc"] , object.id ));
			div.innerHTML =  '<a href="'+ link +'" target="_blank">'+ div.innerHTML +'</a>'

			return div;
		},

		makeLinkRenderer:function(object, data, td, options){
			var div = document.createElement("div");
			if(object.has_children){
				div.className = "XwBorder";
				object.isLink = true;
			}
			div.innerHTML = "Expand";
			
			on(div, 'click', function(){
				topic.publish("company-tree-click",object);
			});
			
			return div;	
		},

		//=============================================
		// Row Renderers ( similar to itemRenderers in Flex, they allow us to style a whole row in the grid based on the data )
		//=============================================

		addRowRenderer:function(grid, rowRendererName){
			aspect.around(grid, "insertRow", lang.hitch(app.store.GridFormatters, rowRendererName));
		},

		/*
		* This renderer is applied to any gridManager it has handling of things like disabled rows. Note that applying any other render replaces this one, grids only support one rowRenderer at a time
		*/
		defaultRenderer: function(originalMethod){

			// same arguments as the insertRow method of the grid
			return function(object, parent, beforeNode, i, options){

				var row = originalMethod.apply(this, arguments);

				// this just makes the row *look* disabled, the GridManager has aditional logic to prevent selecting disabled rows
				if(object.disabled == true){
					//domClass.remove(row, "ui-state-default");
					domClass.add(row, "disabledRow");
				}

				return row;
			}
		},

		/*
		* This renderer is for fee entries, its goal is to differentiate inherited entries from local entries
		*/
		entryRenderer: function(originalMethod){

			// same arguments as the insertRow method of the grid
			return function(object, parent, beforeNode, i, options){

				var row = originalMethod.apply(this, arguments);

				//
				if(object.inherited == true){
					domClass.add(row, "fadedRow");
				}

				return row;
			}
		},		

		/*
		* This renderer is for tests, its goal is to differentiate tests at the record level ( as oppossed to a cell level )
		*/
		testRowRenderer: function(originalMethod){

			// same arguments as the insertRow method of the grid
			return function(object, parent, beforeNode, i, options){

				var row = originalMethod.apply(this, arguments);

				// fade the row if either of the pay flags are off
				if(object.pay_site == false || object.pay_lab == false){
					domClass.add(row, "fadedRow");
				}

				return row;
			}
		},


		/*
		* This renderer is for Lab results viewer, its goal is to differentiate the document assigned
		*/
		documentAssignedRenderer: function(originalMethod){

			// same arguments as the insertRow method of the grid
			return function(object, parent, beforeNode, i, options){

				var row = originalMethod.apply(this, arguments);
				if(object.isAssignedDoc){
					domClass.add(row, "fadedRow");
				}
				return row;
			}
		}
	});
	
	
		
	return classRef
	
});
