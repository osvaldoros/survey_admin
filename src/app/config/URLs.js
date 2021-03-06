define([
	"dojo/_base/declare"
	],
	function(declare){
	
	return declare([], {
			
		init:function(){
			
			this.LOGIN = dojo.config.appSpecific.auth_host + "api/surveys/login";
			this.LANGUAGE = dojo.config.appSpecific.api_host + "api/surveys/language";
			this.REFERRAL = dojo.config.appSpecific.api_host + "api/surveys/referral";
			this.CONTROL_TYPE = dojo.config.appSpecific.api_host + "api/surveys/control_type";

			this.GENDER = dojo.config.appSpecific.api_host + "api/surveys/languaged_response?response_type=gender";
			this.EDUCATION = dojo.config.appSpecific.api_host + "api/surveys/languaged_response?response_type=education";
			this.ENGLISH_PROFICIENCY = dojo.config.appSpecific.api_host + "api/surveys/languaged_response?response_type=english_proficiency";
			this.IMMIGRATION_STATUS = dojo.config.appSpecific.api_host + "api/surveys/languaged_response?response_type=immigration_status";
			this.HOME_LIFE = dojo.config.appSpecific.api_host + "api/surveys/languaged_response?response_type=home_life";
			this.INCOME = dojo.config.appSpecific.api_host + "api/surveys/languaged_response?response_type=income";
			this.RELATIONSHIP_STATUS = dojo.config.appSpecific.api_host + "api/surveys/languaged_response?response_type=relationship_status";

			this.CLIENT = dojo.config.appSpecific.api_host + "api/surveys/client";
			this.USER = dojo.config.appSpecific.api_host + "api/surveys/user";
			this.PROGRAM = dojo.config.appSpecific.api_host + "api/surveys/program";
			this.PARTICIPANT = dojo.config.appSpecific.api_host + "api/surveys/participant";

			this.SURVEY_RESPONSE = dojo.config.appSpecific.api_host + "api/surveys/survey_summary";
			this.SURVEY_DEFINITION = dojo.config.appSpecific.api_host + "api/surveys/data_definition";
			this.QUESTION = dojo.config.appSpecific.api_host + "api/surveys/question";
			this.QUESTION_GROUP = dojo.config.appSpecific.api_host + "api/surveys/question_group";
			this.REPORT_GROUP = dojo.config.appSpecific.api_host + "api/surveys/report_group?language_id=EN";
			this.LANGUAGED_QUESTION = dojo.config.appSpecific.api_host + "api/surveys/languaged_question";
			this.RESPONSE_TYPE = dojo.config.appSpecific.api_host + "api/surveys/response_type";
			this.LANGUAGED_RESPONSE = dojo.config.appSpecific.api_host + "api/surveys/languaged_response";
			this.RESPONSE_CODE = dojo.config.appSpecific.api_host + "api/surveys/response_code";


			this.NAVIGATION_RULE = dojo.config.appSpecific.api_host + "api/surveys/navigation_rule";
			this.REPORT_RULE = dojo.config.appSpecific.api_host + "api/surveys/report_rule";
			this.REUSABLE_REPORT_ITEM = dojo.config.appSpecific.api_host + "api/surveys/reusable_report_item";
			this.LANGUAGED_REUSABLE_REPORT_ITEM = dojo.config.appSpecific.api_host + "api/surveys/languaged_reusable_report_item";
			this.LANGUAGED_REPORT_RULE = dojo.config.appSpecific.api_host + "api/surveys/languaged_report_rule";
			
		}
	});
});
