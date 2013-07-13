/*
 * 
 * Utility for parsing URL hashes
 */
define([
	"dojo/_base/declare", 
	"dojo/hash", 
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/topic"
	],
	function(declare, hash, baseArray, lang, topic){
	
		var classRef = declare("app.utils.HashManager", [], {

			//===========================================================
			// Instance members
			//===========================================================

			lastModuleURL:{},
			update:true,


		    constructor: function(args){
		        declare.safeMixin(this,args || {});
		        this.hashChangeHandle = topic.subscribe("/dojo/hashchange", lang.hitch(this, "onHashChange"));
		    },

		    /*
		    * Always listen to emanda/hashchange instead of dojo/hashchange to make sure the hash is clean
		    */
		    onHashChange:function(hashValue){
		    	var newHash = this.clean(hashValue);

		    	//if the cleaning didn't do anything, we will publish otherwise wait for the next event
		    	if(newHash != hashValue){
		    		this.setHash(newHash); // this will cause another onHashChange 
		    	}else{
		    		if(this.update == true){
		    			topic.publish("/emanda2/hashchange", hashValue);
		    		}
		    		
		    		this.update = true;
		    	}

		    },

		    addIdToURL:function(url, id){
				var newUrl;
				if(url.indexOf("{id}") != -1){
					newUrl = url.split("{id}").join(id);
				}else{
					newUrl = url + id;
				}

				return newUrl;
			},

		    clean:function(hashValue){
		    	hashValue = this.removeAuthToken(hashValue)
		    	return hashValue;
		    },

			parseHash:function(hashValue){
				var hashParams = {};
				hashValue = hashValue.toLowerCase();
				var hashPieces = hashValue.split('/');
				
				// check for a case where we have a leading slash
				if(hashPieces[0] == '' && hashPieces.length > 1){
					hashPieces.splice(0,1);			
				}
				
				hashParams.moduleName = hashPieces[0];
				
				if(hashPieces.length >= 2 ){
					hashParams.stateName = hashPieces[1];
				}
				
				if(hashPieces.length >= 3 ){
					hashParams.entityName = hashPieces[2];
				}
				
				hashParams.hashPieces = hashPieces;
				
				return hashParams;
				
				
			},

			addAuthToken:function(url){
				return url + "_-_" + emanda2.user.auth_token;
			},

			getAuthToken:function(){
				var hash = this.getHash();
				var authArray = hash.split("_-_");
				if(lang.isArray(authArray) && authArray.length > 1){
					return authArray[1];
				}
				return null;
			},

			removeAuthToken:function(hashValue){
				var authArray = hashValue.split("_-_");
				return authArray[0];
			},

			dropAuthToken:function(){
				var hash = this.getHash();
				this.setHash(this.removeAuthToken(hash));
			},
			
			dropHashItemsAfterNumber:function(hashItemNumber){
				var hashValue = this.getHash();
				var hashPieces = hashValue.split('/');
				var shortPieces = hashPieces.slice(0, hashItemNumber + 1);
				this.setHash(shortPieces.join('/'));
			},
			
			/**
			 * 
			 * Like getNextHashItem but skips entities and returns only states
			 * 
			 */
			getNextHashState:function(hashItem){
				var nextHashItem = this.getNextHashItem(hashItem);
				if(nextHashItem != null && nextHashItem == this.getEntity()){
					nextHashItem = this.getNextHashItem(nextHashItem)
				}
				
				return nextHashItem;
			},
			
			getNextHashItem:function(hashItem){
				if(typeof(hashItem) == 'undefined' || hashItem == null) return null;
				
				hashItem = hashItem.toLowerCase();
				
				var hashValue = this.getHash();
				var hashPieces = hashValue.split('/');
				var hashItemIndex = baseArray.indexOf(hashPieces, hashItem);
				
				if(hashItemIndex == -1) return null;
				if(hashItemIndex < (hashPieces.length - 1)){
					return hashPieces[hashItemIndex + 1].toLowerCase();
				}
				
				return null;
			},
			
			
			getHash:function(){
				return hash();
			},
			
			setHash:function(value, update){
				
				if(typeof update == 'undefined') update = true;
				this.update = update;
				
				var rawPieces = value.split('/');
				// remove all empty pieces
				var pieces = [];
				for (var i=0; i < rawPieces.length; i++) {
					if(rawPieces[i] != ""){
						pieces.push(rawPieces[i])
					}
				};
				
				// add an empty piece at the end ( to have a trailing slash )
				pieces.push('');
				
				// I could use this.getModule() but it seems like an awful waste of cycles when I can just get it directly from pieces and not have to re-parse the hash
				var moduleName = pieces[0];
				var newHash = pieces.join('/');
				// store the last hash of this module so we can pull it back when re-activating the module
				this.lastModuleURL[moduleName] = newHash;
				
				hash(newHash);
			},
			
			// returns the last hash that was set for a given module
			getLastModuleURL:function(moduleName){
				if(this.lastModuleURL.hasOwnProperty(moduleName)){
					return this.lastModuleURL[moduleName];
				}
				return null
			},
			
			/**
			 * Module
			 * 
			 */
			getModule:function(value){
				return this.getFragment(0);
			},			
			
			setModule:function(value, update){
				this.setFragment(0, value, update);
			},
			
			
			/**
			 * State
			 * 
			 */
			getState:function(value){
				return this.getFragment(1);
			},
			
			setState:function(value, update){
				this.setFragment(1, value, update);
			},
			
			/**
			 * Entity
			 * 
			 */
			getEntity:function(){
				var entityId = this.getFragment(2);
				if(typeof(entityId) != "undefined" && entityId != null && entityId != "" && entityId != "new"){
					return entityId;
				}else{
					return "none";
				}
			},
			
			setEntity:function(value, update){
				this.setFragment(2, value, update);
			},
			
			getModuleStateAndEntity:function(){
				var pieces = this.__getPieces();
				return this.__getFragment(pieces, 0) +"/"+ this.__getFragment(pieces, 1) +"/"+ this.__getFragment(pieces, 2);
			},
			
			/**
			 * EntityState
			 * 
			 */
			getEntityState:function(){
				return this.getFragment(3);
			},
			
			setEntityState:function(value, update){
				this.setFragment(3, value, update);
			},
			
			
			setFragment:function(index, value, update){

				var hashParams = this.parseHash(this.getHash());
				var hashPieces = hashParams.hashPieces;
				
				var lastPossibleIndex = hashPieces.length - 1
				if(index > lastPossibleIndex){
					for (var i=lastPossibleIndex; i < index; i++) {
						hashPieces[i] = "undefined";
					};
				}
				// fragment to the value provided
				hashPieces[index] = value;
				
				this.setHash( hashPieces.join('/'), update );
			},
			
			getFragment:function(index){
				var pieces = this.__getPieces();
				return this.__getFragment(pieces, index);				
			},
			
			
			__getPieces:function(){
				var hashParams = this.parseHash(this.getHash());
				var hashPieces = hashParams.hashPieces;
				return hashPieces;
			},
			
			__getFragment:function(pieces, index){
				if(pieces.length > index){
					return pieces[index]
				}else{
					return null;
				}
			}
			
	});
		
	
	//===========================================================
	// Static members
	//===========================================================
	lang.mixin(app.utils.HashManager, {
		
		getInstance:function(params){
			if(!app.utils.HashManager._instance){
				app.utils.HashManager._instance = new app.utils.HashManager(params);
			}
			
			return app.utils.HashManager._instance;
		}
		
	});
	
	return classRef;
});
