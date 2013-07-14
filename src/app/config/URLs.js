define([
	"dojo/_base/declare"
	],
	function(declare){
	
	return declare([], {
			
		init:function(){
			
			this.LOGIN = dojo.config.appSpecific.auth_host + "api/surveys/login";
			this.LANGUAGE = dojo.config.appSpecific.api_host + "api/surveys/language";
			this.TOKEN = dojo.config.appSpecific.api_host + "api/surveys/token";

			this.CLIENT = dojo.config.appSpecific.api_host + "api/surveys/client";
			
		}
	});
});
