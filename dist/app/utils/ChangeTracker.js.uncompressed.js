//>>built
/**
 * 
 * ChangeTracker
 * 
 * This component provides a centralized map for fields as they are changing associating them with a store and later committing the changes to the store via put/add
 * 
 * Because this component is globally accessible it can track changes on different forms on different screens and then committ all the changes at once.
 * 
 * 
 */
define("app/utils/ChangeTracker", [
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/Stateful",
	"dojo/topic",
	"app/store/StoreManager"
	],
	function(declare, lang, Stateful, topic, StoreManager){
	
	var classRef = declare("app.utils.ChangeTracker", [], {
			//===========================================================
			// Instance members
			//===========================================================		
			storeManager:StoreManager.getInstance(),
			__entityMap:{},
			
			recordChange:function(storeURL, property, value, oldValue){
				console.log("recordChange " + storeURL + ", property = " + property  + " = " + value + ", oldValue = " + oldValue);
				
				//if(value == oldValue) return; // if the value hasn't changed, don't do anything
				
				if(value === false){
					value = "false";
				}
				
				// get the entity
				var entity = this.getChangesObject(storeURL);
				// add or override a property in it				
				this.setProperty(entity, property, value, oldValue, undefined, storeURL);
				
				if(value != oldValue){
					topic.publish(storeURL + "-modified", entity);
				}
				
				////console.log(storeURL)
				//console.log(entity);
			},
			
			setProperty:function(entity, property, value, oldValue, replace, storeURL){
				
				if(typeof(entity.oldValues) == "undefined"){
					entity.oldValues = {};						
				}
				
				if(property.indexOf(".") != -1){
					var propArray = property.split(".");
					var currentObj = entity;
					
					var oldValuesObj = entity.oldValues;
					
					for (var i=0; i < propArray.length; i++) {
						var p = propArray[i];
						var arrayName = undefined;
						var arrayIndex = undefined;
						
						if(p.indexOf("[") != -1){
							arrayName = p.substr(0, p.indexOf("["));
							arrayIndex = parseInt(p.substr (p.indexOf("[") + 1, p.indexOf("]") )); 
							//console.log("setProperty > arrayName = " + arrayName + ", index = " + arrayIndex);
						}
						
						// if we are on the last part of the path set the actual value here
						if(i == (propArray.length -1)){
							
							if(typeof(arrayName) != "undefined" && !isNaN(arrayIndex)){
								if(!lang.isArray(currentObj[arrayName])){
									//console.log("creating array " + arrayName);
									currentObj[arrayName] = [];
								}
								
								//console.log("setting index " + arrayIndex + "of " + arrayName + " to " + value);
								currentObj[arrayName][arrayIndex] = value;
								if(replace === true) currentObj[arrayName][arrayIndex].__replace__ = true;
							}else{
								currentObj[p] = value
								if(replace === true) currentObj[p].__replace__ = true;
							}
							
							if(typeof(oldValuesObj[p]) == "undefined"){ // only save the oldValue the first time
								oldValuesObj[p] = oldValue;
							}
						// build nested object according to each part of the dotted path ( prop.subprop.subprop)
						}else{
							
							
							if(typeof(arrayName) != "undefined" && !isNaN(arrayIndex)){
								if(!lang.isArray(currentObj[arrayName])){
									//console.log("creating array " + arrayName);
									currentObj[arrayName] = [];
								}
								
								if(typeof(currentObj[arrayName][arrayIndex]) != "object"){
									//console.log("setting index " + arrayIndex + "of " + arrayName + " to new object");
									currentObj[arrayName][arrayIndex] = {}
								}
								currentObj = currentObj[arrayName][arrayIndex];
								
							}else{
								if(typeof(currentObj[p]) != "object"){
									currentObj[p] = {}
								}
								currentObj = currentObj[p];
							} 
							
							if(typeof(oldValuesObj[p]) != "object"){
								oldValuesObj[p] = {}
							}
							oldValuesObj = oldValuesObj[p];
						}
					};
					
				}else{
					entity[property] = value;
					if(replace === true) entity[property].__replace__ = true;
					if(typeof(entity.oldValues[property]) == "undefined") entity.oldValues[property] = oldValue; // only save the oldValue the first time
				}

				this.__entityMap[storeURL] = entity;				

			},
			
			isModified:function(storeURL, property){
				if(typeof(property) == "undefined"){
					var changesObject = this.getChangesObject(storeURL);
					var oldValues = changesObject.oldValues;
					if(typeof(changesObject) == "object" && changesObject != null && typeof(oldValues) == "object" && oldValues != null){
						for(var p in changesObject){
							if(p != "oldValues" && oldValues.hasOwnProperty(p) && changesObject[p] != oldValues[p]){
								return true;
							}
						}
					}
				}else{
					var changesObject = this.getChangesObject(storeURL);
					if(typeof(changesObject) != "undefined" && changesObject != null && changesObject.hasOwnProperty(property)){
						return true;
					}
				}

				return false;
			},
			
			getChangesObject:function(storeURL, override){
				
				if(typeof(override) != "undefined" && override != null){
					if(typeof(override.oldValues) == "undefined"){
						override.oldValues = {};
					}
					this.__entityMap[storeURL] = override;
				}
				
				if(!this.__entityMap.hasOwnProperty(storeURL)){
					//this.__entityMap[storeURL] = {oldValues:{}}
					return {oldValues:{}};
				}
				
				return this.__entityMap[storeURL];
			},
			
			clearChangesObject:function(storeURL){
				if(this.__entityMap.hasOwnProperty(storeURL)){
					delete this.__entityMap[storeURL];
					topic.publish(storeURL + "-cleared");
				}
			},
			
			commitChanges:function(storeURL, updatingEntity){
				if(typeof(updatingEntity) == 'undefined' || updatingEntity == null){
					updatingEntity = null;
				}
				var entity = this.getChangesObject(storeURL);
				
				// we can't commit something with no data
				if(entity == null){
					return false;
				}
				
				// add/put the entity to the store based on updating 				
				var store = this.storeManager.getStore(storeURL);
				var xhrResult;
				
				delete entity.oldValues; // don't sent oldValues to the server
				
				//console.log('Committing changes >')
				if(updatingEntity){
					
					//console.log(entity);
					this.safeCopy(updatingEntity, entity);
					this.removeNonModifiedProperties(updatingEntity, entity);
					xhrResult = store.put(updatingEntity);
					/*
					this.mergeArrays(updatingEntity, entity);
					this.getIds(updatingEntity, entity);
					console.log(entity)
					xhrResult = store.put(entity);
					*/
				}else{
					//console.log(entity)
					xhrResult =  store.add(entity);
				}
				
				var owner = this;
				xhrResult.then(function(data){
					owner.clearChangesObject(storeURL); //after commiting changes let's clear the changes object
					if(typeof(data) == "object" && data != null && !data.hasOwnProperty("error")){
						if(updatingEntity){
							topic.publish(storeURL + "-saved", data);
						}else{
							topic.publish(storeURL + "-created", data);
						}
					}
				})
				
				return xhrResult;
			},
			
			setChange:function(storeURL, property, value){
				var entity = this.getChangesObject(storeURL);
				this.setProperty(entity, property, value, null, true, storeURL);
				topic.publish(storeURL + "-modified", entity);
			},
			
			safeCopy:function(updatingEntity, changesObject){
				for(var p in changesObject){
					if(typeof(changesObject[p]) == "object" && typeof(changesObject[p]) != "string" && isNaN(changesObject[p])){
						if(typeof(updatingEntity[p]) == "undefined" || changesObject[p].__replace__ == true){
							updatingEntity[p] = changesObject[p];
						}else{
							this.safeCopy(updatingEntity[p], changesObject[p]);
						}
					}else{
						updatingEntity[p] = changesObject[p];
					}
				}
			},
			
			removeNonModifiedProperties:function(updatingEntity, changesObject){
				var propsToDelete = [];
				for(var p in updatingEntity){
					if(p != "id" && p != "$ref" && !changesObject.hasOwnProperty(p)){
						propsToDelete.push(p);
					}
				}
				
				for (var i=0; i < propsToDelete.length; i++) {
					var dp = propsToDelete[i];
					delete updatingEntity[dp];
				};
			},
			
			mergeArrays:function(updatingEntity, changesObject){
				// recursively loop over the changesObject object and try to find arrays
				for(var p in changesObject){
					if(lang.isArray(changesObject[p]) && lang.isArray(updatingEntity[p])){
						var tempObj = lang.clone(updatingEntity);
						this.safeCopy(tempObj[p], changesObject[p]);
						changesObject[p] = tempObj[p];
					}else if(typeof(changesObject[p]) == "object" && typeof(changesObject[p]) != "string" && isNaN(changesObject[p]) && changesObject[p] != null){
						if(typeof(updatingEntity[p]) == "object" && typeof(updatingEntity[p]) != "string" && isNaN(updatingEntity[p]) && updatingEntity[p] != null){
							this.mergeArrays(updatingEntity[p], changesObject[p]);
						}
					}
					
				}
			},
			
			getIds:function(updatingEntity, changesObject){
				// if the object we are receiving as updatingEntity defines an id property copy ir over to the changesObject
				if(typeof(changesObject) == "object" && typeof(changesObject) != "string" && isNaN(changesObject) && changesObject != null){
					if(typeof(updatingEntity) == "object" && typeof(updatingEntity) != "string" && isNaN(updatingEntity) && updatingEntity != null){
						if(updatingEntity.hasOwnProperty("id")){
							changesObject.id = updatingEntity.id;
						}
					}
				}
				
				// recursively loop over the changesObject object properties
				for(var p in changesObject){
					if(typeof(changesObject[p]) == "object" && typeof(changesObject[p]) != "string" && isNaN(changesObject[p]) && changesObject[p] != null){
						if(typeof(updatingEntity[p]) == "object" && typeof(updatingEntity[p]) != "string" && isNaN(updatingEntity[p]) && updatingEntity[p] != null){
							this.getIds(updatingEntity[p], changesObject[p]);
						}
					}
				}
			}
			
			
	});
	
	//===========================================================
	// Static members
	//===========================================================
	lang.mixin(app.utils.ChangeTracker, {
		
		getInstance:function(params){
			if(!app.utils.ChangeTracker._instance){
				app.utils.ChangeTracker._instance = new app.utils.ChangeTracker(params);
			}
			
			return app.utils.ChangeTracker._instance;
		}
		
	});
	
	return classRef;
	
});
