//>>built
define("app/modules/responses/responseSetup/LanguagedResponseSetup",["dojo/_base/declare","dojo/on","dojo/_base/lang","app/uicomponents/blocks/WizardManagerBlock"],function(b,c,d,a){return b("app.modules.responses.responseSetup.LanguagedResponseSetup",[a],{_store:__.urls.LANGUAGED_RESPONSE,_entityLabel:"Languaged Response",_autoClose:!0,_showTabs:!1,constructor:function(a){b.safeMixin(this,a||{});this._steps=[{title:"Basic",moduleURL:"app/modules/responses/responseSetup/languagedResponseSetup/BasicInfo"}]},
prepareForSave:function(){this.changeTracker.getChangesObject(__.urls.LANGUAGED_RESPONSE).response_id=this.response_id;return!0}})});