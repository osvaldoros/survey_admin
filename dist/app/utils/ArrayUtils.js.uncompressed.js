//>>built
/**
 * 
 * StringUtils
 * 
 * Common string utils
 * 
 */
define("app/utils/ArrayUtils", [
	"dojo/_base/declare",
	"dojo/_base/lang",
	"./MathUtils"
	],
	function(declare, lang, MathUtils){
		
		
	var classRef = declare("app.utils.ArrayUtils", [], {
		//===========================================================
		// Instance members
		//===========================================================
		//** This class since it is a pure utility doesn't need any instance members
	});
	
	//===========================================================
	// Static members
	//===========================================================
	lang.mixin(app.utils.ArrayUtils, {
		
		addIds:function(arr) {
			for (var i=0; i < arr.length; i++) {
				var obj = arr[i];
				obj.id = i;
			};

			return arr;
		},

		addHexadecimalIds:function(arr){
			if(arr != null && arr != undefined){
				for (var i=0; i < arr.length; i++) {
					var obj = arr[i];
					obj.id = MathUtils.randomNumber();
				};
			}
			return arr;
		},

		indexOfObjectWithId:function(arr, id){
			for (var i=0; i < arr.length; i++) {
				var obj = arr[i];
				if(obj.id == id){
					return i;
				}
			}

			return -1;
		},
		
		cleanEmbeddedArrayForSaving:function(arr, customCleanFn){
			var sendableArr = [];					
			for (var i=0; i < arr.length; i++) {
				var objDef = arr[i];
				var newObj = {}
				for(var p in objDef){
					if(p != "id" && p != "__parent_entity"){
						newObj[p] = objDef[p];
					}
				}
				if(typeof(customCleanFn) == "function") newObj = customCleanFn(newObj);
				sendableArr.push(newObj);
			};
			
			return sendableArr;
		}
		
	});
	
	
		
	return classRef
	
});
