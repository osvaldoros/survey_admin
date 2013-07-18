//>>built
define("app/uicomponents/InheritedEntriesGrid", [
	"dojo/_base/declare",
	"dojo/on",
	"dojo/_base/lang",	
	"./NestedEntriesGrid",
	"app/utils/ArrayUtils"	
	],
	function(declare, on, lang, NestedEntriesGrid, ArrayUtils){
	
	
	return declare("app.uicomponents.InheritedEntriesGrid", [NestedEntriesGrid], {
		
			entrySelectionChange:function(entry){
				if(entry.inherited == true){
					this.editEntryBtn.set("label", "Override Entry");
					this.removeEntryBtn.set("disabled", true);
				}else{
					this.editEntryBtn.set("label", "Edit Entry");
					this.removeEntryBtn.set("disabled", false);
				}
			},

			loadEntriesFromParentEntity:function(){
				this.parentEntity = this.getUpdatingEntity();
				this.entriesArray = (typeof(this.parentEntity) != "undefined" && this.parentEntity != null && lang.isArray(this.parentEntity[this.entriesProperty])) ? lang.clone(this.parentEntity[this.entriesProperty]) : [];
				this.inheritedEntriesArray = (typeof(this.parentEntity) != "undefined" && this.parentEntity != null) ? lang.clone(this.parentEntity["inherited_" + this.entriesProperty]) : [];
				
				var entryArray = this.addArrayToGrid(); 
				this.setupDialog.set("entries", entryArray, true);
			},
				

			addArrayToGrid:function(){
				return this.mergeArraysIntoGrid(this.entriesArray, this.inheritedEntriesArray);
			},

			mergeArraysIntoGrid:function(entries, inheritedEntries){
				this.entryMap = {};
				var entryArray = [];
				if(typeof(this.parentEntity) == "object" && this.parentEntity != null){
					if(lang.isArray(entries)){
						for (var f=0; f<entries.length; f++) {
							var entry = entries[f];
							if(this.addEntryToMap(entry)){
								entry.inherited = false;
								entry.schedule = {name:this.parentEntity.name, id:this.parentEntity.id};
								entryArray.push(entry);
							}else{
								console.log("duplicate entry");
								console.log(entry)
							}
						}
					}					
					if(lang.isArray(inheritedEntries)){
						for (var i=0; i<inheritedEntries.length; i++) {
							var inheritedEntry = inheritedEntries[i];
							if(this.addEntryToMap(inheritedEntry)){
								inheritedEntry.inherited = true;
								entryArray.push(inheritedEntry);
							}else{
								console.log("duplicate inherited entry");
								console.log(inheritedEntry)
							}
						}
					}
				}

				ArrayUtils.addIds(entryArray);

				var entryStoreConfig ={
					store:entryArray
				}	
				this.entryGridMgr.setStore(entryStoreConfig)					
				this.entryGrid.refresh();

				return entryArray;
			},   

			onEntryEntitySaved:function(entry) {
				if(!entry.__stay_open){
					this.setupDialog.confirmHide();
				}

				if(entry.inherited == true || !entry.hasOwnProperty("id")){
					var newEntry = entry; // IMPORTANT, we don't clone here because we want the entry to retain the id assigned by addArrayToGrid ( this way, if the dialog is still open and it saves again, it updates the same entry instead of creating a new one )
					delete newEntry.inherited;
					this.entriesArray.push(newEntry)
				}else{
					this.entriesArray[entry.id] = entry;
				}

				this.addArrayToGrid();
				this.changeTracker.setChange(this.storeURL, this.entriesProperty, this.entriesArray);
			}   
	});
});
