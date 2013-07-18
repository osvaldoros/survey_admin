//>>built
/**
 * 
 * 
 * 
 */
define("app/store/Entities", [
	"dojo/_base/declare",
	"app/store/StoreManager",	
	"app/utils/HashManager",
	"dojo/_base/lang"
	],
	function(declare, StoreManager, HashManager, lang){
	
	return declare("app.store.Entities", [], {
		
			storeManager:StoreManager.getInstance(),
			hashManager:HashManager.getInstance(),
			
			_requestMap:{},
			_entityRequestedInHash:null,
			
			// All these should eventually be removed
			//=============================================
			_locationParams:null,
			
			getCurrentLocationParams:function(){
				return this._locationParams;
			},
			setCurrentLocationParams:function(locationParams){
				this._locationParams = locationParams;
			},
			//=============================================

			constructor: function(args){
    			declare.safeMixin(this,args || {});

    			this._contextMap = {
					"default":{
						"options":{}
					}
				}
    		},

			setContext:function(contextObj, name){

				if(typeof(name) == "undefined" || name == ""){
					name = "default";
				}

				if(typeof(contextObj) != "object" || contextObj == null){
					contextObj = {};
				}
				// this is to make sure that currentContext always has the same properties, even if at times they are undefined
				this._contextMap[name] = {
					entityId: contextObj.entityId,
					entityType: contextObj.entityType,
					entity: contextObj.entity,
					entityArrayStore : contextObj.arrayStore,
					options: contextObj.options || {}
				}
			},

			getContext:function(name){
				if(typeof(name) == "undefined" || name == ""){
					name = "default";
				}			

				if(!this._contextMap.hasOwnProperty(name)){
					this._contextMap[name] = {options:{}};
				}

				return this._contextMap[name];
			},

			addOptionsToContext:function(moreOptions, name){
				if(typeof(name) == "undefined" || name == ""){
					name = "default";
				}	

				if(typeof(moreOptions) != "object" || moreOptions == null){
					moreOptions = {};
				}

				lang.mixin(this.getContext(name).options, moreOptions);
			},

			/*
			*
			* Recursively looks for a property propName in objects within the array and simplifies it if found
			*/
			simplifyArrayItemPropToReference:function(array, propName){
				var modArray;
				var item;
				var newItem;

				// if array is an actual array loop through its properties using int
				if(lang.isArray(array)){
					modArray = array.slice(0);

					for (var i = modArray.length - 1; i >= 0; i--) {
						item = modArray[i];
						if(typeof(item) == "object" && item != null){
							newItem = this.simplifyArrayItemPropToReference(item, propName);
							modArray[i] = newItem;
						}
					};
				// if array is an object we need to check if the object has the property we are looking for
				}else if(typeof(array) == "object" && array != null){
					modArray = lang.clone(array);
					// if the object has the property, simplify that property and replace it
					if(modArray.hasOwnProperty(propName)){
						modArray[propName] = this.simplifyToReference(modArray[propName]);
					// if it doesn't have that property let's iterate through the properties using property names looking for nested objects
					}else{
						for(var p in modArray){
							item = modArray[p];
							if(typeof(item) == "object" && item != null){
								newItem = this.simplifyArrayItemPropToReference(item, propName);
								modArray[p] = newItem;
							}
						}
					}
				}

				return modArray;
			},


			/**
			*
			* Given an array of entities it will simplify each one of those entities to contain only ref and id, see simplifyToReference
			*
			*/
			simplifyArrayItemsToReference:function(array){
				if(!lang.isArray(array)) return array;
				var modArray = array.slice(0);

				for (var i = modArray.length - 1; i >= 0; i--) {
					var item = modArray[i];
					modArray[i] = this.simplifyToReference(item);
				};

				return modArray;
			},

			/**
			*
			* Given a full entity object it collapses it to contain only the ref and id. This is often useful for lists of things that are posted to the server to limit the amount of data on the wire
			*
			*/
			simplifyToReference:function(entity){
				if(typeof(entity) == "object" && entity != null){
					if(entity.hasOwnProperty("$ref")  && entity.hasOwnProperty("id")){
						return {"$ref": entity["$ref"], id: entity.id};
					}
				}

				// if couldn't simplify return whatever we've got
				return entity;
			},
			
			/**
			 * 
			 * getEntityFromHash
			 * 
			 * Grabs the id from the hash and uses withEntity to return the entity regardless if it is async or sync.
			 * 
			 * 
			 */
			getEntityFromHash:function(storeURL, func, base_query, forceREST){
				return this.withEntity(this.hashManager.getEntity(), storeURL, func, base_query, forceREST);
			},
			
			/**
			 * 
			 * withEntity
			 * 
			 * Loads an entity by id from the store and if it needs to wait for the resolve it does otherwise it calls func right away.
			 * In this way this provides a simple way to do something with an entity without dealing with the asynchronous nature of them
			 * 
			 * The entity is returned as a parameter to the callback function specified
			 * 
			 */
			withEntity:function(id, storeURL, func, base_query, forceREST){
				//console.log('withEntity > storeURL = ' + storeURL + " id = " + id);
				if(parseInt(id, 16) >= 0){
					
					// if there is already a request going on for the same storeURL and id combination don't make another request, simply add the callback to an array of callbacks to be executed upon response
					if(this._requestMap.hasOwnProperty(storeURL + "_" + id)){
						//console.log("pending request matches storeURL and id, just add ourselves to the array of callbacks")
						var responseCallBackArray = this._requestMap[storeURL + "_" + id];
						responseCallBackArray.push(func);
						//console.log("There is now " + responseCallBackArray.length + " callbacks pending for " + storeURL + " id = " + id)
						this._requestMap[storeURL + "_" + id] = responseCallBackArray;
						return;
					}
					
					
					if(this._entityRequestedInHash != this.hashManager.getModuleStateAndEntity() || typeof(base_query) != "undefined" || forceREST == true){
 						this._entityRequestedInHash = this.hashManager.getModuleStateAndEntity();
					}
					// check our own map to see if the entity is there first before getting it from the store
					// * This map is tied to the url hash, while the url doesn't change subsequent calls to get the same entity use this map
					// otherwise it gets cleared
					
					var base_query_object = this.storeManager.getBaseQueryObject(base_query);
					var entity;
					if(typeof(base_query_object) == "object" && base_query_object != null && base_query_object != false){
						base_query_object.id = id;
						entity = this.storeManager.getStore(storeURL).get(base_query_object);
					}else{
						entity = this.storeManager.getStore(storeURL).get(id);
					}			
					var owner = this;
					
					if(entity.then){
						this._requestMap[storeURL + "_" + id] = [func]; // if the entity is async, save the func in an array of callbacks, to make it support multiple callbacks for the same id
						entity.then(function(data){
							owner._entity = data;
							//console.log("entity resolved for storeURL = " + storeURL + " id = " + id);
							//console.log(data);
							for (var i=0; i < owner._requestMap[storeURL + "_" + id].length; i++) {
								//console.log("executing callback " + i);
								var callBackFunc = owner._requestMap[storeURL + "_" + id][i];
								callBackFunc(data);
							};
							delete owner._requestMap[storeURL + "_" + id]
						})
						return true;
					}else{
						this._entity = entity;
						func(entity);
						return true
					}
				}else{
					this._entity = null;
					return false
				}
			}			
			
	});
});
