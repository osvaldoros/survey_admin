//>>built
/*
 * StoreManager provides a central place to save and retrieve stores to make sure we only have one store for a given url at a time
 * 
 * it also makes sure that all stores are created the same way
 * 
 */
define("app/store/GridCheckboxes", [
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dijit/form/CheckBox"
	],
	function(declare, lang, baseArray, CheckBox){
	
	var classRef = declare("app.store.GridCheckboxes", [], {
			//===========================================================
			// Instance members
			//===========================================================	
			groups:{},
			
			getCheckBox:function(group, id){

				if(!this.groups.hasOwnProperty(group) || typeof(this.groups[group]) != "object" || this.groups[group] == null){
					this.groups[group] = {};
				}

				var groupObj = this.groups[group];
				var rendererWidget;

				if(groupObj[id] == null || groupObj[id] == undefined){
					rendererWidget = new CheckBox();
					rendererWidget.set("id",id);
					groupObj[id] = rendererWidget;
				}else{
					rendererWidget = groupObj[id];
				}

				return rendererWidget;
			},

			getGroup:function(group){
				if(this.groups.hasOwnProperty(group) && typeof(this.groups[group]) == "object" && this.groups[group] != null){
					return this.groups[group];
				}
			},

			getGroupValues:function(group){
				if(this.groups.hasOwnProperty(group) && typeof(this.groups[group]) == "object" && this.groups[group] != null){
					var valuesArray = {}
					for(var p in this.groups[group]){
						valuesArray[p] = this.groups[group][p].checked;
					}

					return valuesArray;
				}
			},

			clearGroup:function(group){
				if(this.groups.hasOwnProperty(group) && typeof(this.groups[group]) == "object" && this.groups[group] != null){
					var valuesArray = {}
					for(var p in this.groups[group]){
						this.groups[group][p].set("checked", false);
					}
				}
			},

			deleteGroup:function(group){
				if(this.groups.hasOwnProperty(group) && typeof(this.groups[group]) == "object" && this.groups[group] != null){
					delete this.groups[group];
				}				
			}
			
			
	});
	
	
	
	//===========================================================
	// Static members
	//===========================================================
	lang.mixin(app.store.GridCheckboxes, {
		
		getInstance:function(params){
			if(!app.store.GridCheckboxes._instance){
				app.store.GridCheckboxes._instance = new app.store.GridCheckboxes(params);
			}
			
			return app.store.GridCheckboxes._instance;
		}
		
	});
	
	return classRef;
});
