//>>built
define("app/modules/surveyDefinitions/surveyDefinitionSetup/ReusableReportItemSetup",["dojo/_base/declare","dojo/on","dojo/_base/lang","app/uicomponents/blocks/WizardManagerBlock","app/utils/ChangeTracker"],function(b,d,e,a,c){return b("app.modules.surveyDefinitions.surveyDefinitionSetup.ReusableReportItemSetup",[a],{_store:__.urls.REUSABLE_REPORT_ITEM,_entityLabel:"Reusable Report Item",changeTracker:c.getInstance(),constructor:function(a){b.safeMixin(this,a||{});this._steps=[{title:"Basic",moduleURL:"app/modules/surveyDefinitions/surveyDefinitionSetup/reusableReportItemSetup/BasicInfo"},
{title:"Languaged Reusable Items",moduleURL:"app/modules/surveyDefinitions/surveyDefinitionSetup/reusableReportItemSetup/LanguagedReusableReportItemList"}]},prepareForSave:function(){this.inherited(arguments);this.changeTracker.getChangesObject(__.urls.REUSABLE_REPORT_ITEM).data_definition_id=this.survey_definition_id;return!0}})});