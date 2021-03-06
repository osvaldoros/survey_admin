//>>built
/**
 * 
 * This class extends dojox.form.Manager to define a default observer method for all forms that use this as the form type
 * 
 * By adding the observer method here in the form we just need to make sure form elements have:
 * 
 *  - name
 *  - custom observer attribute like : observer="recordChange"
 * 
 * And automatically the form manager will fire the recordChange method in this class with the necessary information to track the changes
 * 
 */
define("app/form/Manager", [ 
	'dojo/_base/declare', 
	'dojox/form/Manager',
	"dojo/_base/array",	
	"dojo/_base/connect",	
	'dojo/date/stamp',
	'dijit/form/CheckBox',
	'app/utils/ChangeTracker'
	], function (declare, FormManager, baseArray, connect, dateStamp, CheckBox, ChangeTracker) {
    return declare('app.form.Manager', FormManager, {
    	
    	// make sure you set this in the form like this.myForm.set('storeURL', xxx)
    	storeURL:undefined,
    	_entity:null,
    	changeTracker: ChangeTracker.getInstance(),
    	onSubmit:function(){
			return false;
		},
    	
    	// record the change via the global changeTracker
		recordChange:function(value, name, element, event){
			//console.log("recordChange > " + name + ", value = " + value)
			if(event != undefined && event != null && event != ""){
				var oldValue = null;
				if(this._flattenedEntity && typeof(this._flattenedEntity) == 'object'){
					oldValue = this._flattenedEntity[name];
				}
				
				if(Object.prototype.toString.call(value) === '[object Date]'){
					value = dateStamp.toISOString(value);
					this.changeTracker.recordChange( this.storeURL, name, value, oldValue );
				}else if(typeof(value) == "object"){
					for(var p in value){
						
						if(this._flattenedEntity && typeof(this._flattenedEntity) == 'object'){
							oldValue = this._flattenedEntity[p];
						}
						var correctedPropertyName = this.substituteArrayIndexes(p, this._arrayPropIndexes);
						this.changeTracker.recordChange( this.storeURL, correctedPropertyName, value[p], oldValue );
					}				
				}else{
					
					// If the widget contains a $ref attribute, we assume the value is an ID and we need to create an object with the ref and the id
					// *Note, we do this here because we don't want it to get flattened, if the value was detected as 'object' earlier...
					if(typeof(element.$ref) != "undefined"){
						value = {
							$ref: element.$ref,
							id: value,
							__replace__ : true
						}
					}

					if(typeof(element.link_id) != "undefined" && typeof(value) == "object" && value != null){
						value.link_id = element.link_id;
					}
					
					var correctedName = this.substituteArrayIndexes(name, this._arrayPropIndexes);
					this.changeTracker.recordChange( this.storeURL, correctedName, value, oldValue );
				}
			}
		},
		
		// override this method to provide custom UI changes when form values change
		refreshUI:function(value, name, element, event){
			//console.log("refreshUI not overriden for field " + name)
		},
		
		
		substituteArrayIndexes:function(path, arrayIndexes){
			if(typeof(arrayIndexes) == "undefined" || arrayIndexes == null){
				return path;
			}
			
			
			var pathArray = path.split(".");
			for (var i=0; i < pathArray.length; i++) {
				var pathPiece = pathArray[i];
				if(pathPiece.indexOf("[x]") != -1){
					var arrayName = pathPiece.substr(0, pathPiece.indexOf("[x]"));
					//console.log(arrayName);
					if(arrayIndexes.hasOwnProperty(arrayName)){
						pathArray[i] = arrayName + "[" + arrayIndexes[arrayName]+ "]";
					}
				}
			};
			var newPath = pathArray.join(".");
			//console.log(newPath);
			return newPath;
		},

		/*Similar to destroy but without actually destroying the node*/
		clearWidgets:function(){
			for(var name in this.formWidgets){
				baseArray.forEach(this.formWidgets[name].connections, connect.disconnect);
			}
			this.formWidgets = {};
		},
		
		/**
		 * 
		 * formWidgetValue
		 * 
		 * Overrides dojox.form.manager._Mixin formWidgetValue to fix CheckBoxes
		 * 
		 * @param {Object} elem
		 * @param {Object} value
		 */
		formWidgetValue: function(elem, value){
			//console.log('formWidgetValue')
			//console.log(value);
			if(typeof elem == "string"){
				elem = this.formWidgets[elem];
				if(elem){
					elem = elem.widget;
				}
			}

			if(!elem){
				return null;	// Object
			}
			
			
			if(elem.isInstanceOf && elem.isInstanceOf(CheckBox)){
				if(typeof(value) != "undefined" && typeof(value.toLowerCase) == "function"){
					if(value.toLowerCase() == "true") value = true;
					else if(value.toLowerCase() == "false") value = false;
				}
			}
			
			// calls the super
			var res = this.inherited(arguments);
			// don't return disabled elements
			if(typeof(elem.get) == "function" && elem.get('disabled') == true){
				return null;
			}
			return res;
			
		},
		
		
		/**
		 * 
		 * gatherFormValues
		 * 
		 * Overrides dojox.form.Manager to make sure we don't include null values
		 * 
		 * @param {Object} names
		 */
		gatherFormValues: function(names){
			var result = this.inherited(arguments);
			var cleanedResults = {};
			for(var p in result){
				if(result[p] != null){
					var currentRes = null;
					if(this.formWidgets.hasOwnProperty(p)){
						var currentWidget = this.formWidgets[p].widget;
						if(currentWidget.hasOwnProperty("$ref") && result[p] != ""){
							currentRes = {"$ref": this.formWidgets[p].widget["$ref"], id: result[p]}
							if(currentWidget.hasOwnProperty("item") && currentWidget.item != null && currentWidget.item.hasOwnProperty("name")){
								currentRes.name = currentWidget.item.name;
							}
						}
					} 
					
					if(currentRes == null){
						currentRes = result[p];
					}

					cleanedResults[p] = currentRes;

				}
			}
			
			return cleanedResults;
		}
		
	});
});
