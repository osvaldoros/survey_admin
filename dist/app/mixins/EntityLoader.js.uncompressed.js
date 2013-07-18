//>>built
/**
*
*
* EntityLoader is a mixin that modules that work with a single entity to edit it can inherit from in order to ease the process of getting the actually entity.
* 
* The loadEntity method will try to load the entity from the hash (if the hashId of the module matches the current 'module' in the hashManager) otherwise it will assume that
* the entity has been injected via the setUpdatingEntity method and it will try to retrieve it via the getUpdatingEntity method.
*
* Requires:

 this._store

 * Optional:

this._baseQuery
*
*/
define("app/mixins/EntityLoader", [
	"dojo/_base/declare",
	"dojo/dom",
	"dojo/on",	
	"dojo/_base/lang",	
	"dojo/topic",
	"app/utils/ChangeTracker",
	"app/utils/HashManager",
	"app/mixins/CallBacks"
	],
	function(declare, dom, on, lang, topic, ChangeTracker, HashManager, CallBacks){
	
	return declare([CallBacks], {
		changeTracker: ChangeTracker.getInstance(),		
		hashManager: HashManager.getInstance(),		
		

		loadEntity:function(editEntityHandler, newEntityHandler){
			var meta = {};
			var module = this.hashManager.getModule();
			// if we are in the donors module, update the hash, and load the donor that way

			if(this.entityInjected == true){
				meta.usedHash = false;
				var entity = this.getUpdatingEntity();
				if(typeof(entity) != "undefined" && entity != null){
					if(typeof(editEntityHandler) == "function") editEntityHandler(entity);
					meta.isUpdating = true;		
				}else{
					if(typeof(newEntityHandler) == "function") newEntityHandler();
					meta.isUpdating = false;		
				}
			}else if(typeof(this._store) != "undefined" && this._store != null){
				var owner = this;

				meta.usedHash = true;
				var res = __.entities.getEntityFromHash(this._store, function(entity){
					if(typeof(editEntityHandler) == "function") editEntityHandler(entity);
					topic.publish(owner.id + "-entity-ready");
				},this._baseQuery);
				
				if(!res){
					if(typeof(newEntityHandler) == "function") newEntityHandler();
					meta.isUpdating = false;
				}
				else{
					meta.isUpdating = true;
				}	
			}	

			return meta;	
							
		}
		

						
	});
});
