/*
 * 
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/store/Memory",
	"app/store/StoreManager"
	],
	function(declare, lang, baseArray, Memory, StoreManager){
	
		var classRef = declare("app.store.UIStores", [], {
			//===========================================================
			// Instance members
			//===========================================================
			
			languagesStore:null,
			stateStore:null,
			
			_preloadCompleteCallBack:null,
			_catalogsPreloaded:false,
			
			// The constructor
		    constructor: function(args){
		        declare.safeMixin(this,args || {});
		        // all these functions will be called effectively preloading all these collections
		        this._functionsToPreload = [
					lang.hitch(this, "getLanguages")
				]

				// this is used when you request one of these models unknowingly via rest, so we trap that and use the preload
				this._modelToPreloadMap = {
					language: lang.hitch(this, "getLanguages")
				}
		    },
		    
			preloadCatalogs:function(preloadCompleteCallBack){
				this._preloadCompleteCallBack = preloadCompleteCallBack;
				if(this._catalogsPreloaded){
					this._preloadCompleteCallBack();
				}else{
					
					for (var i=0; i < this._functionsToPreload.length; i++) {
						var storeFunction = this._functionsToPreload[i];
						var store = storeFunction();
						var owner = this;
						if(store.then){
							store.then(function(strFunct){
								return function(){
									owner._preloadComplete(strFunct);
								}
							}(storeFunction))
						}else{
							this._preloadComplete(storeFunction);
						}
					};
					
				}
			},

			getPreloadForModel:function(model){
				return this._modelToPreloadMap[model]; // this will return undefined for models that don't have preloads
			},
			
			_preloadComplete:function(storeFunction){
				for (var i=0; i < this._functionsToPreload.length; i++) {
					if(storeFunction == this._functionsToPreload[i]){
						this._functionsToPreload.splice(i,1);
						break;
					}
				};
				
				if(this._functionsToPreload.length == 0){
					this._catalogsPreloaded = true;
					this._preloadCompleteCallBack();
				}
			},
			
			getCachedStore:function(uiStoreFunction, filterFunction){
				var store = uiStoreFunction();
				if(store.then){
					return null; // store not cached
				}
				
				if(typeof(filterFunction) == "function"){
					return  new Memory({data: baseArray.filter(store.data, filterFunction)});
				}else{
					return store;
				}
			},
			
			populateComboArray:function(combo, array){
				this.populateCombo(combo, null, null, null, array);
			},

			populateCombo:function(combo, uiStoreFunction, filterFunction, afterPopulationCallBack, extraItems){
				if(!lang.isArray(extraItems)){
					extraItems = [];
				}

				var store = null;
				if(typeof(uiStoreFunction) == "function"){
         			store = uiStoreFunction();
				}

				if(store != null && store.then){
					store.then(function(data){
						if(typeof(filterFunction) == "function"){
							combo.set("store", new Memory({data: extraItems.concat( baseArray.filter(data, filterFunction)) }));
							if(typeof(afterPopulationCallBack) == "function") afterPopulationCallBack();
						}else{
							combo.set("store", new Memory({data: extraItems.concat( data )}));
							if(typeof(afterPopulationCallBack) == "function") afterPopulationCallBack();
						}
					})
				}else{
					if(typeof(filterFunction) == "function"){
						if(store != null){
							var filteredStore = new Memory({data: extraItems.concat( baseArray.filter(store.data, filterFunction) )});
							combo.set("store", filteredStore);
						}else{
							combo.set("store", new Memory({data: extraItems}));
						}
						if(typeof(afterPopulationCallBack) == "function") afterPopulationCallBack();
					}else{
						if(store != null){
							var unfilteredStore = new Memory({data: extraItems.concat( store.data )});
							combo.set("store", unfilteredStore );
						}else{
							combo.set("store", new Memory({data: extraItems}));
						}
						if(typeof(afterPopulationCallBack) == "function") afterPopulationCallBack();
					}
				}
			},
			
			populateComboDynamicREST:function(combo, url, base_query){
				var store = StoreManager.getInstance().getStore( url, base_query );
				combo.set("store", store);	
			},

			populateComboREST:function(combo, url, base_query, filterFunction, afterPopulationCallBack){
				var store = StoreManager.getInstance().getStore( url, base_query );
				var res = store.query({}); // get all
								
				if(res.then){
					res.then(function(data){
						if(typeof(filterFunction) == "function"){
							combo.set("store", new Memory({data: baseArray.filter(data, filterFunction)}));
							if(typeof(afterPopulationCallBack) == "function") afterPopulationCallBack();
						}else{
							combo.set("store", new Memory({data: data}));
							if(typeof(afterPopulationCallBack) == "function") afterPopulationCallBack();
						}
					})
				}
				
			},
			
			getLanguages:function(){
				if(this.languagesStore != null){
					return this.languagesStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( __.urls.LANGUAGE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.languagesStore = new Memory({data: data});
				})
				
				return res;
			},

			getStates:function(){
				
				if(this.stateStore != null){
					return this.stateStore;
				}
				
				this.stateStore = new Memory({
					data: [
						{id:"", name:"State/Province"},
						{id:"AL", name:"Alabama"},
						{id:"AK", name:"Alaska"},
						{id:"AB", name:"Alberta"},
						{id:"AZ", name:"Arizona"},
						{id:"AR", name:"Arkansas"},
						{id:"BC", name:"British Columbia"},
						{id:"CA", name:"California"},
						{id:"CO", name:"Colorado"},
						{id:"CT", name:"Connecticut"},
						{id:"DE", name:"Delaware"},
						{id:"DC", name:"District of Columbia"},
						{id:"FL", name:"Florida"},
						{id:"GA", name:"Georgia"},
						{id:"HI", name:"Hawaii"},
						{id:"ID", name:"Idaho"},
						{id:"IL", name:"Illinois"},
						{id:"IN", name:"Indiana"},
						{id:"IA", name:"Iowa"},
						{id:"KS", name:"Kansas"},
						{id:"KY", name:"Kentucky"},
						{id:"LA", name:"Louisiana"},
						{id:"ME", name:"Maine"},
						{id:"MB", name:"Manitoba"},
						{id:"MD", name:"Maryland"},
						{id:"MA", name:"Massachusetts"},
						{id:"MI", name:"Michigan"},
						{id:"MN", name:"Minnesota"},
						{id:"MS", name:"Mississippi"},
						{id:"MO", name:"Missouri"},
						{id:"MT", name:"Montana"},
						{id:"NE", name:"Nebraska"},
						{id:"NV", name:"Nevada"},
						{id:"NB", name:"New Brunswick"},
						{id:"NH", name:"New Hampshire"},
						{id:"NJ", name:"New Jersey"},
						{id:"NM", name:"New Mexico"},
						{id:"NY", name:"New York"},
						{id:"NL", name:"Newfoundland and Labrador"},
						{id:"NC", name:"North Carolina"},
						{id:"ND", name:"North Dakota"},
						{id:"NT", name:"Northwest Territories"},
						{id:"NS", name:"Nova Scotia"},
						{id:"NU", name:"Nunavut"},
						{id:"OH", name:"Ohio"},
						{id:"OK", name:"Oklahoma"},
						{id:"ON", name:"Ontario"},
						{id:"OR", name:"Oregon"},
						{id:"PA", name:"Pennsylvania"},
						{id:"PE", name:"Prince Edward Island"},
						{id:"PR", name:"Puerto Rico"},
						{id:"QC", name:"Quebec"},
						{id:"RI", name:"Rhode Island"},
						{id:"SK", name:"Saskatchewan"},
						{id:"SC", name:"South Carolina"},
						{id:"SD", name:"South Dakota"},
						{id:"TN", name:"Tennessee"},
						{id:"TX", name:"Texas"},
						{id:"UT", name:"Utah"},
						{id:"VT", name:"Vermont"},
						{id:"VA", name:"Virginia"},
						{id:"WA", name:"Washington"},
						{id:"WV", name:"West Virginia"},
						{id:"WI", name:"Wisconsin"},
						{id:"WY", name:"Wyoming"},
						{id:"YT", name:"Yukon"}
					]
				});
				    
				return this.stateStore;
			
			}



			
	});
	
	
	//===========================================================
	// Static members
	//===========================================================
	lang.mixin(app.store.UIStores, {
		
		getInstance:function(params){
			if(!app.store.UIStores._instance){
				app.store.UIStores._instance = new app.store.UIStores(params);
			}
			
			return app.store.UIStores._instance;
		}
		
	});	
	
	return classRef;
});
