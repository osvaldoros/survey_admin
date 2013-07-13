define([
	"dojo/_base/declare",
	"dojo/on",
	"dojo/dom-class",
	"dojo/_base/lang",
	"app/uicomponents/MoreInfoRenderer",
	"app/store/UIStores",
	"app/utils/HashManager"	
	],
	function(declare, on, domClass, lang, MoreInfoRenderer, UIStores, HashManager){
		
		return declare("app.uicomponents.moreInfoRenderers.TestMoreInfoRenderer", [MoreInfoRenderer], {

			uiStores: UIStores.getInstance(),
			hashManager: HashManager.getInstance(),

			getName:function(){
				var testInfoArr =[];
				if(this._data){
					if(typeof(this._data.service) == "object" && this._data.service != null)  testInfoArr.push(this._data.service.name);
					if(typeof(this._data.battery) == "object" && this._data.battery != null)  testInfoArr.push(this._data.battery.name);
					if(typeof(this._data.subtest_type) == "object" && this._data.subtest_type != null)  testInfoArr.push(this._data.subtest_type.name);
					if(typeof(this._data.sample_type) == "object" && this._data.sample_type != null)  testInfoArr.push(this._data.sample_type.name);
					if(typeof(this._data.collection_type) == "object" && this._data.collection_type != null)  testInfoArr.push(this._data.collection_type.name);
				}
				return testInfoArr.join(", ");
			},

			evaluateProperty:function(name, prop){
				var contentString = this.inherited(arguments);
				
				// order_id is a string, so the usual $ref to gen links won't catch it, but we want to have a link...
				if(name == "order_id"){
					var link = HashManager.getInstance().addAuthToken( HashManager.getInstance().addIdToURL( emanda2.urls.model.links.editor["order"], prop ));
					return "<li><strong>order</strong> : <a href=" + link + " target=\"_blank\"> " + prop + "</a> </li>";
				}

				return contentString
				
			},

			renderItem:function(){
				//this.inherited(arguments); // can't do this because test $refs are subclassed, i.e. drug_test, physical_test instead of just test
				var _isTest = this.isTest();

				if(_isTest && this.useLink){
					var link = HashManager.getInstance().addAuthToken( HashManager.getInstance().addIdToURL(emanda2.urls.model.links.editor["test"], this._data.id) );
					this.name.innerHTML = '<a href="'+ link +'" target="_blank">'+ this.getName() +'</a>'
				}else{
					this.name.innerHTML = this.getName();
				}

				if(this._data){
					if(this._data.fixed == true || this._data.fixed == "true"){
						domClass.add(this.name, "lockedRow");
					}				

					if(_isTest && !this._data.hasOwnProperty("perform_date") && !this._data.hasOwnProperty("status")){
						domClass.add(this.name, "greenHighliteRow");
					}
				}
			},

			isTest:function(){
				if(this._data){
					if(this._data.hasOwnProperty("$ref") && this._data.hasOwnProperty("service") && typeof(this._data.service) == "object" && this._data.service != null){
						var matchedService = this.uiStores.getPreloadedById("getServices", this._data.service.id);
						if(matchedService != null) return true;
					}
				}
				return false;
			}
	});
});
