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
			
			stateStore:null,
			languagesStore:null,
			labStore:null,
			mroStore:null,
			reasonStore:null,
			serviceStore:null,
			dispositionStore:null,
			statusStore:null,
			statusCategoryStore:null,
			sampleTypeStore:null,
			formTypeStore:null,
			paymentTypeStore:null,
			chargeTypeStore:null,
			amountTypeStore:null,
			substanceStore:null,
			subtestTypeStore:null,
			collectionTypeStore:null,
			batteriesStore:null,
			DOTAgenciesStore:null,
			sitePrioritiesStore:null,
			siteCategoriesStore:null,
			hoursStore:null,
			weekDaysStore:null,
			glAccounts:null,
			DOTType:null,
			companyGroup:null,
			randomTargetType:null,
			bookingReqTypeStore:null,
			bundleTypeFiltersStore:null,
			
			donorGroup:null,
			frequency:null,
			randomSelectionType:null,
			docTypes:null,
			docClasses:null,
			docProgress:null,
			labResultProgress:null,
			testProgress:null,
			responsibilities:null,
      		feeSchedules:null,
      		feeCategories:null,
      		feeSources:null,
      		unusedFeeCategories:null,
			
			companyGroupType:null,
			_preloadCompleteCallBack:null,
			_catalogsPreloaded:false,
			
			// since we only have one instance of this it doesn't matter if these are static
			dayValues: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			
			
			userRoles:null,
			permissions:null,

			// The constructor
		    constructor: function(args){
		        declare.safeMixin(this,args || {});
		        // all these functions will be called effectively preloading all these collections
		        this._functionsToPreload = [
					lang.hitch(this, "getServices"),
					lang.hitch(this, "getSubtestTypes"),
					lang.hitch(this, "getBatteries"),
					lang.hitch(this, "getLabs"),
					lang.hitch(this, "getCollectionTypes"),
					lang.hitch(this, "getSampleTypes"),
					lang.hitch(this, "getFormTypes"),
					lang.hitch(this, "getChargeTypes"),
					lang.hitch(this, "getAmountTypes"),
					lang.hitch(this, "getFeeSources"),
					lang.hitch(this, "getDocTypes"),
					lang.hitch(this, "getDocClasses"),
					lang.hitch(this, "getDocProgress"),
					lang.hitch(this, "getTestProgress"),
					lang.hitch(this, "getResponsibilities"),
					lang.hitch(this, "getDispositions"),
					lang.hitch(this, "getStatuses"),
					lang.hitch(this, "getStatusCategories"),
					lang.hitch(this, "getReasons"),
					lang.hitch(this, "getPermissions")
				]

				// this is used when you request one of these models unknowingly via rest, so we trap that and use the preload
				this._modelToPreloadMap = {
					service: lang.hitch(this, "getServices"),
					subtest_type: lang.hitch(this, "getSubtestTypes"),
					battery: lang.hitch(this, "getBatteries"),
					lab: lang.hitch(this, "getLabs"),
					collection_type: lang.hitch(this, "getCollectionTypes"),
					sample_type: lang.hitch(this, "getSampleTypes"),
					sample_type: lang.hitch(this, "getFormTypes"),
					sample_type: lang.hitch(this, "getChargeTypes"),
					amount_type: lang.hitch(this, "getAmountTypes"),
					fee_source: lang.hitch(this, "getFeeSources"),
					doc_type: lang.hitch(this, "getDocTypes"),
					doc_class: lang.hitch(this, "getDocClasses"),
					doc_progress: lang.hitch(this, "getDocProgress"),
					_progress: lang.hitch(this, "getTestProgress"),
					responsibility: lang.hitch(this, "getResponsibilities"),
					disposition: lang.hitch(this, "getDispositions"),
					status: lang.hitch(this, "getStatuses"),
					status_category: lang.hitch(this, "getStatusCategories"),
					reason: lang.hitch(this, "getReasons"),
					perm: lang.hitch(this, "getPermissions")
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
			
			},
			
			getBookingReqType:function(){
				
				if(this.bookingReqTypeStore != null){
					return this.bookingReqTypeStore;
				}
				
				this.bookingReqTypeStore = new Memory({
					data: [
						{id:"user", name:"Contact"},
						{id:"donor", name:"Donor"},
						{id:"other", name:"Other"}
					]
				});
				    
				return this.bookingReqTypeStore;
			
			},	

			getBundleTypeFilters:function(){
				
				if(this.bundleTypeFiltersStore != null){
					return this.bundleTypeFiltersStore;
				}
				
				this.bundleTypeFiltersStore = new Memory({
					data: [
						{name:"All Bundles", id:"ALL"},
						{name:"General Bundles", id:"$null"},
						{name:"Account Specific Bundles", id:"$neq($null)"}
					]
				});
				    
				return this.bundleTypeFiltersStore;
			
			},
			
			
			getDOTAgencies:function(){
				
				if(this.DOTAgenciesStore != null){
					return this.DOTAgenciesStore;
				}
				
				this.DOTAgenciesStore = new Memory({
					data: [
						{id:"1", name:"FAA"},
						{id:"2", name:"FMCSA"},
						{id:"3", name:"FRA"},
						{id:"4", name:"FTA"},
						{id:"5", name:"PHMSA"},
						{id:"6", name:"USCG"}
					]
				});
				    
				return this.DOTAgenciesStore;
			
			},
			
			getSitePriorities:function(){
				
				if(this.sitePrioritiesStore != null){
					return this.sitePrioritiesStore;
				}
				
				this.sitePrioritiesStore = new Memory({
					data: [
						{id:"DRIVERCHECK", name:"DriverCheck"},
						{id:"MAIN", name:"Main"},
						{id:"NO_PRIORITY", name:"Regular"},
						{id:"EMERGENCY_ONLY", name:"Emergency Only"}
					]
				});
				    
				return this.sitePrioritiesStore;
			
			},

			getSiteCategories:function(){
				if(this.siteCategoriesStore != null){
					return this.siteCategoriesStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.SITE_CATEGORY );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.siteCategoriesStore = new Memory({data: data});
				})
				
				return res;
			},
			
			/*
			getSitePriorities:function(){
				if(this.sitePrioritiesStore != null){
					return this.sitePrioritiesStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.SITE_PRIORITY );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.sitePrioritiesStore = new Memory({data: data});
				})
				
				return res;
			},
			*/
			
			
			getHours:function(){
				if(this.hoursStore != null){
					return this.hoursStore;
				}
				
				var minuteValues = ["00", "30"];
				var hourArray = [];
				for (var i=0; i < 24; i++) {
					var hour = i;
					var pm = false;
					for (var j=0; j < minuteValues.length; j++) {
						var minute = minuteValues[j];
						var displayHour = hour;
						if(displayHour >= 12){
							pm = true;
						}
						if(displayHour > 12){
							displayHour = displayHour - 12;
						}
						
						if(displayHour == 0){
							displayHour = 12;
						}
						if(hour < 9){
							hour = "0" + hour;
						}
						var value = hour + ":" + minute + ":00";
						var label = displayHour + ":" + minute;
						if(pm) label += " pm";
						/*if(displayHour == 12){
							label += pm ? " (noon)" : "(midnight)";
						}*/
						hourArray.push({id:value, name:label});
					}
				};
				
				
				this.hoursStore = new Memory({data:hourArray});
				
				return this.hoursStore
				
			},
			
			getWeekDays:function(){
				if(this.weekDaysStore != null){
					return this.weekDaysStore;
				}
				
				var dayArray = [];
				
				dayArray.push({id:"-2", name:"* Monday to Friday"});
				dayArray.push({id:"-1", name:"* Weekends"});
				
				for (var j=0; j < this.dayValues.length; j++) {
					var day = this.dayValues[j];
					dayArray.push({id:j + 1, name:day});
				}
				
				this.weekDaysStore = new Memory({data:dayArray});
				
				return this.weekDaysStore
			},
			
			getLabs:function(){
				if(this.labStore != null){
					return this.labStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.LAB );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.labStore = new Memory({data: data});
				})
				
				return res;
			},
			
			getLanguages:function(){
				if(this.languagesStore != null){
					return this.languagesStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.LANGUAGE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.languagesStore = new Memory({data: data});
				})
				
				return res;
			},	

			getPaymentTypes:function(){
				if(this.paymenTypeStore != null){
					return this.paymenTypeStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.PAYMENT_TYPE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.paymenTypeStore = new Memory({data: data});
				})
				
				return res;
			},			

			getCollectionTypes:function(){
				if(this.collectionTypeStore != null){
					return this.collectionTypeStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.COLLECTION_TYPE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.collectionTypeStore = new Memory({data: data});
				})
				
				return res;
			},

			getMROs:function(){
				if(this.mroStore != null){
					return this.mroStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.MRO );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.mroStore = new Memory({data: data});
				})
				
				return res;
			},
			
			
			getReasons:function(){
				if(this.reasonStore != null){
					return this.reasonStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.REASON );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.reasonStore = new Memory({data: data});
				})
				
				return res;
			},
			
			getServices:function(){
				if(this.serviceStore != null){
					return this.serviceStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.SERVICE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.serviceStore = new Memory({data: data});
				})
				
				return res;				
			},	

			getDispositions:function(){
				if(this.dispositionStore != null){
					return this.dispositionStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.DISPOSITION );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.dispositionStore = new Memory({data: data});
				})
				
				return res;
			},

			getStatuses:function(){
				if(this.statusStore != null){
					return this.statusStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.STATUS );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.statusStore = new Memory({data: data});
				})
				
				return res;
			},

			getStatusCategories:function(){
				if(this.statusCategoryStore != null){
					return this.statusCategoryStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.STATUS_CATEGORY );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.statusCategoryStore = new Memory({data: data});
				})
				
				return res;
			},
			
			getSubtestTypes:function(){
				if(this.subtestTypeStore != null){
					return this.subtestTypeStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.SUBTEST_TYPE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.subtestTypeStore = new Memory({data: data});
				})
				
				return res;
			},			

			getDocTypes:function(){
				if(this.docTypes != null){
					return this.docTypes;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.DOCUMENT_TYPE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.docTypes = new Memory({data: data});
				})
				
				return res;
			},

			getDocClasses:function(){
				if(this.docClasses != null){
					return this.docClasses;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.DOCUMENT_CLASS );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.docClasses = new Memory({data: data});
				})
				
				return res;
			},
			
			getResponsibilities:function(){
				if(this.responsibilities != null){
					return this.responsibilities;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.RESPONSIBILITY);
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.responsibilities = new Memory({data: data});
				})
				
				return res;
			},			

			getDocProgress:function(){
				if(this.docProgress != null){
					return this.docProgress;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.DOCUMENT_PROGRESS );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.docProgress = new Memory({data: data});
				})
				
				return res;
			},
			
			getLabResultProgress:function(){
				if(this.labResultProgress != null){
					return this.docProgress;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.LAB_RESULT_PROGRESS );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.labResultProgress = new Memory({data: data});
				})
				
				return res;
			},

			getTestProgress:function(){
				if(this.testProgress != null){
					return this.testProgress;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.TEST_PROGRESS );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.testProgress = new Memory({data: data});
				})
				
				return res;
			},
			
			getSampleTypes:function(){
				if(this.sampleTypeStore != null){
					return this.sampleTypeStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.SAMPLE_TYPE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.sampleTypeStore = new Memory({data: data});
				})
				
				return res;
			},			

			getFormTypes:function(){
				if(this.formTypeStore != null){
					return this.formTypeStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.FORM_TYPE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.formTypeStore = new Memory({data: data});
				})
				
				return res;
			},	

			getChargeTypes:function(){
				if(this.chargeTypeStore != null){
					return this.chargeTypeStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.CHARGE_TYPE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.chargeTypeStore = new Memory({data: data});
				})
				
				return res;
			},		

			getAmountTypes:function(){
				if(this.amountTypeStore != null){
					return this.amountTypeStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.AMOUNT_TYPE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.amountTypeStore = new Memory({data: data});
				})
				
				return res;
			},

			getFeeSources:function(){
				if(this.feeSources != null){
					return this.feeSources;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.FEE_SOURCE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.feeSources = new Memory({data: data});
				})
				
				return res;
			},			

			getSubstances:function(){
				if(this.substanceStore != null){
					return this.substanceStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.SUBSTANCE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.substanceStore = new Memory({data: data});
				})
				
				return res;
			},
			
			getBatteries:function(){
				if(this.batteriesStore != null){
					return this.batteriesStore;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.BATTERY );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.batteriesStore = new Memory({data: data});
				})
				
				return res;
			},			

			getGLAccounts:function(){
				if(this.glAccounts != null){
					return this.glAccounts;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.GL_ACCOUNT );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.glAccounts = new Memory({data: data});
				})
				
				return res;
			},
			
			getDOTType:function(){
				if(this.DOTType != null){
					return this.DOTType;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.DOT_TYPE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.DOTType = new Memory({data: data});
				})
				
				return res;
			},
			
			
			getCompanyGroup:function(){
				if(this.companyGroup != null){
					return this.companyGroup;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.COMPANY_GROUP );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.companyGroup = new Memory({data: data});
				})
				
				return res;
			},
			
			getRandomTargetType:function(){
				if(this.randomTargetType != null){
					return this.randomTargetType;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.RANDOM_TARGET_TYPE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.randomTargetType = new Memory({data: data});
				})
				
				return res;
			},
			
			getRandomSelectionType:function(){
				if(this.randomSelectionType != null){
					return this.randomSelectionType;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.RANDOM_SELECTION_TYPE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.randomSelectionType = new Memory({data: data});
				})
				
				return res;
			},
						
			getDonorGroup:function(){
				if(this.donorGroup != null){
					return this.donorGroup;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.DONOR_GROUP );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.donorGroup = new Memory({data: data});
				})
				
				return res;
			},
													
			getFrequency:function(){
				if(this.frequency != null){
					return this.frequency;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.FREQUENCY );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.frequency = new Memory({data: data});
				})
				
				return res;
			},
			
			getCompanyGroupType:function(){
				if(this.companyGroupType != null){
					return this.companyGroupType;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.COMPANY_GROUP_TYPE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.companyGroupType = new Memory({data: data});
				})
				
				return res;
			},
			
			getFeeSchedules:function(){
				if(this.feeSchedules != null){
					return this.feeSchedules;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.FEE_SCHEDULE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.feeSchedules = new Memory({data: data});
				})
				
				return res;
			},
			
			getFeeCategories:function(){
				if(this.feeCategories != null){
					return this.feeCategories;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.FEE_CATEGORY );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.feeCategories = new Memory({data: data});
				})
				
				return res;
			},
	
			getUnusedFeeCategories:function(feeSched){
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.FEE_CATEGORY_UNUSED );
        		var qparam = {};
        		qparam.fee_schedule_id = feeSched.id;
        		console.log("qparam",qparam);
				var res = remoteStore.add(qparam);
				var owner = this;
				res.then(function(data){
					owner.unusedFeeCategories = new Memory({data: data});
				})
				
				return res;
			},
			
			getRoles:function(){
				if(this.userRoles != null){
					return this.userRoles;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.ROLE );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.userRoles = new Memory({data: data});
				})
				
				return res;
			},
			
			getPermissions:function(){
				if(this.permissions != null){
					return this.permissions;
				}
				
				var remoteStore = StoreManager.getInstance().getStore( emanda2.urls.PERM );
				var res = remoteStore.query({});
				var owner = this;
				res.then(function(data){
					owner.permissions = new Memory({data: data});
				})
				return res;
			},

			//Returns an object based on given Id only if this have been preloaded
			getPreloadedById:function(functionName,id){
				var tmpStore =  this[functionName]();
				for(var i = 0; i < tmpStore.data.length; i++){
					if(tmpStore.data[i].id == id){
						return tmpStore.data[i];
					}

				}
				return null;
			},

			getFilterForCreditInvoice:function(){
				
				if(this.creditInvoice != null){
					return this.creditInvoice;
				}
				
				this.creditInvoice = new Memory({
					data: [
						{id:"all", name:"All Invoices"},
						{id:"credits", name:"Credits"},
						{id:"noncredits", name:"No Credits"}
					]
				});
				    
				return this.creditInvoice;
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
