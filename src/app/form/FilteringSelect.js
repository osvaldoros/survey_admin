/**
 * This class extends dijit/form/Form to prevent the form from being submitted, we don't ever want to actually submit ajax forms, instead we use xhr or stores to submit them
 * 
 */
define([
		"dojo/_base/array", 
		'dojo/_base/declare', 
		'dijit/form/FilteringSelect',
		"dojo/store/Memory",
		"dojo/store/JsonRest",
		"dojo/dom-attr", // domAttr.get
		"dojo/_base/lang",
		"dijit/form/ComboBox",
		"dijit/Tooltip",
		"app/store/GridFormatters",
		"app/store/UIStores"
		], function (array,declare, FilteringSelect, Memory, JsonRest, domAttr,lang,ComboBox,Tooltip,GridFormatters, UIStores) {

	

    return declare('app.form.FilteringSelect', FilteringSelect, {
    	storeSet:false,
    	pendingValue:undefined,
    	//queryExpr: "${0}*", // default 
    	queryExpr: "*${0}*",
    	//searchDelay: 100 // default
    	searchDelay: 250,
    	hasToolTip:false,
    	pageSize:25,
    	uiStores:UIStores.getInstance(),


    	startup:function(){
			this.inherited(arguments);

			if(typeof(this.store) == "object" && this.store != null && this.store.hasOwnProperty("config")){
				var config = this.store.config;
				var filterFunction = undefined;
				if(typeof(config.filterCondition) != "undefined"){
					this.filterCondition = config.filterCondition;
					filterFunction = lang.hitch(this, "filterBasedOnCondition")					
				}
				if(lang.isArray(config.array)){
					this.uiStores.populateComboArray(this, config.array, filterFunction)
				}else if(typeof(config.url) == "string"){
					this.uiStores.populateComboDynamicREST(this, __.urls[config.url], config.base_query);
				}else if(typeof(config.uiStore) == "string"){
					this.uiStores.populateCombo(this, lang.hitch(this.uiStores, config.uiStore), filterFunction);
				}
			}

		},

		filterBasedOnCondition:function(item){
			if(typeof(item) == "object" && item != null && typeof(this.filterCondition) == "object" && this.filterCondition != null){
				return this.evaluateClause(item, this.filterCondition);
			}
		},

		evaluateClause:function(item, clause){

			var res = true;
			for(var p in clause){
				var subClause = clause[p];
				if(!lang.isArray(subClause)){
					if(item.hasOwnProperty(p)){
						res = res && (item[p] == subClause);
					}else{
						res = false;
					}
				}else if(lang.isArray(subClause) && p.toUpperCase() == "AND"){
					return this.ANDClauses(item, subClause);
				}else if(lang.isArray(subClause) && p.toUpperCase() == "OR"){
					return this.ORClauses(item, subClause);
				}else{
					return false;
				}
			}

			return res;
		},

		ANDClauses:function(item, clauseArray){
			var res = true;
			for (var i = clauseArray.length - 1; i >= 0; i--) {
				var subClause = clauseArray[i];
				res = res && this.evaluateClause(item, subClause);
			};

			return res;
		},

		ORClauses:function(item, clauseArray){
			var res = false;
			for (var i = clauseArray.length - 1; i >= 0; i--) {
				var subClause = clauseArray[i];
				res = res || this.evaluateClause(item, subClause);
			};

			return res;
		},

    	onBlur: function() {
    		if(this.closeToolTip != undefined && this.closeToolTip != null){
				dijit.hideTooltip(dojo.byId(this.closeToolTip));
    		}
		},


    	_setStoreAttr: function(/*String*/ value, /*Boolean?*/ priorityChange, /*String?*/ displayedValue, /*item?*/ item){
			this.inherited(arguments);
			
			if(value.isInstanceOf && value.isInstanceOf(Memory)){
				if(value.data.length > 0){
					this.storeSet = true;
					if(typeof(this.pendingValue) != "undefined"){
						this.set("value", this.pendingValue.value, this.pendingValue.priorityChange, this.pendingValue.displayedValue, this.pendingValue.item);
						this.pendingValue = undefined;
					}
				}
			}else if(value.isInstanceOf && value.isInstanceOf(JsonRest)){
					this.storeSet = true;
					if(typeof(this.pendingValue) != "undefined"){
						this.set("value", this.pendingValue.value, this.pendingValue.priorityChange, this.pendingValue.displayedValue, this.pendingValue.item);
						this.pendingValue = undefined;
					}
			}
		},

		getFirstValue:function(){
			var store = this.store;
			var firstItem = store.data[0];
			if(typeof(firstItem) == "object" && firstItem != null){
				return firstItem.id;
			}else if(typeof(firstItem) == "string"){
				return firstItem;
			}
		},

		excludeProperties:{
			"$ref":true,
			"org_path":true,
			"id":true,
			"confirmation":true,
			"salt":true
		},

		toolTipFunction:function(data){
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
							objectInfo += "<li><strong>"+p+ "</strong> : " + display +"</li>";
							}
						}
					}
					objectInfo += "</ul>";
				objectInfo += "</div>";
			}
			return objectInfo;
		},

		openDropDown:function(){
			this.inherited(arguments);
			this._onDropDownClick();
		},

    	_onDropDownClick:function(){
    		var owner = this;
    		if(this.dropDown){
	    		var onHoverFunction = this.dropDown.onHover;
	    		this.dropDown.onHover = (function() {   
				    return function(/*Object*/ item, labelFunc) { 
				        onHoverFunction.apply(this,arguments);
				        if(owner.hasToolTip){
					        var label = owner.toolTipFunction(item.item);
					        if(label != ""){
					        	owner.closeToolTip = arguments[0];
					        	dijit.showTooltip(label, dojo.byId(arguments[0].id));
					        }
				    	}
				    };
				}());

				var onUnHoverFunction = this.dropDown.onUnhover;
	    		this.dropDown.onUnhover = (function() {   
				    return function(item, labelFunc) { 
				        onUnHoverFunction.apply(this,arguments);
				        if(owner.hasToolTip){
				        	if(item.item != undefined && item.item != null){
						        if(item.item.hasLink == undefined || item.item.hasLink == null || item.item.hasLink == false){
						        	dijit.hideTooltip(dojo.byId(arguments[0].id));
						        }
					    	}
				    	}
				    };
				}());
    		}
    	},

		_setValueAttr: function(/*String*/ value, /*Boolean?*/ priorityChange, /*String?*/ displayedValue, /*item?*/ item){
			if(this.storeSet == true){
				this.inherited(arguments);
			}else{
				this.pendingValue = {value:value, priorityChange:priorityChange, displayedValue:displayedValue, item:item};
			}
		}

	});
});
