//>>built
define("app/modules/surveyDefinitions/surveyDefinitionSetup/questionSetup/LanguagedQuestionSetup",["dojo/_base/declare","dojo/on","dojo/_base/lang","app/uicomponents/blocks/WizardManagerBlock"],function(b,c,d,a){return b("app.modules.surveyDefinitions.surveyDefinitionSetup.questionSetup.LanguagedQuestionSetup",[a],{_store:__.urls.LANGUAGED_QUESTION,_entityLabel:"Languaged Question",_autoClose:!0,_showTabs:!1,_showTitle:!1,constructor:function(a){b.safeMixin(this,a||{});this._steps=[{title:"Basic",
moduleURL:"app/modules/surveyDefinitions/surveyDefinitionSetup/questionSetup/languagedQuestionSetup/BasicInfo"}]},prepareForSave:function(){this.changeTracker.getChangesObject(__.urls.LANGUAGED_QUESTION).question_id=this.question_id;return!0}})});