//>>built
/**
 * 
 * MathUtils
 * 
 * Common mathematical utils
 * 
 */
define("app/utils/MathUtils", [
	"dojo/_base/declare",
	"dojo/_base/lang"
	],
	function(declare, lang){

		
	var classRef = declare("app.utils.MathUtils", [], {
		//===========================================================
		// Instance members
		//===========================================================
		//** This class since it is a pure utility doesn't need any instance members
	});
	
	//===========================================================
	// Static members
	//===========================================================
	lang.mixin(app.utils.MathUtils, {
		/**
		 * 
		 * Given an angle it returns its value in radians 
		 *
		 * @param {Object} $angle
		 */
		toRadians:function(angle) {
			return angle * (Math.PI/180);
		},


		/**
		*
		* Given a point a distance and an angle it will return a new point at the new resulting coordinates
		*
		*/
		displacePoint:function(origin, distance, angle){
			var angleRadians = app.utils.MathUtils.toRadians(angle);
			return {x: origin.x + (distance * Math.cos(angleRadians)), y:origin.y + (distance * Math.sin(angleRadians))}
		},



		/**
		*
		*
		* Given a slope and an x coordinate it returns the y
		*
		*/
		getLinePointY:function(m, x, b){
			if(typeof(b) != "undefined"){
				return m*x + b;
			}else{
				return m*x;
			}
		},

		/*
			Returns an hexadecimal number of 10 digits
		*/
		randomNumber:function(){
			var id = Math.floor(Math.random() * 0x100000).toString(16) + "" + Math.floor(Math.random() * 0x100000).toString(16);
			return id;
		}
		
	});
	
	
		
	return classRef
	
});
