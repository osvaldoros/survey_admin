//>>built
require({cache:{"url:app/modules/surveyDefinitions/surveyDefinitionSetup/questionSetup/languagedQuestionSetup/templates/BasicInfo.html":'<div class="moduleContainer" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: \'center\'">\n\t\n\t<form dojoType="app.form.Manager" data-dojo-attach-point="languagedQuestionBasicInfoForm" method="post">\n\t\t<table cellpadding="0" cellspacing="2" style="width: 100%;">\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Language*: </td>\n\t\t\t\t<td><select name="language_id" data-dojo-attach-point="languageBox" observer="refreshUI,recordChange" store="{config:{url:\'LANGUAGE\', selectFirst:true}}" dojoType="app.form.FilteringSelect" maxHeight="200"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td colspan="3"><div data-dojo-attach-point="nameBox" name="name"  observer="recordChange" data-dojo-type="app.uicomponents.Editor" style="width:470px;"></div></td>\n\t\t\t</tr>\n\t\t</table>\n\t</form>\n\n</div>'}});
define("app/modules/surveyDefinitions/surveyDefinitionSetup/questionSetup/languagedQuestionSetup/BasicInfo",["dojo/_base/declare","dojo/on","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","app/mixins/StatefulModule","dojo/text!./templates/BasicInfo.html","dojo/_base/lang","dojo/_base/Deferred","dijit/registry","dijit/Dialog","dgrid/GridFromHtml","dojo/store/Memory","dojo/store/Observable","dojo/store/Cache","app/store/JsonRest","dgrid/Selection","dojo/parser","dojo/query",
"dijit/form/Button","dojox/validate","dojox/validate/web","app/form/Manager","app/mixins/FormManager","dijit/form/Textarea","dijit/form/TextBox","dijit/form/TimeTextBox","dijit/form/DateTextBox","dijit/form/Select","dijit/form/ComboBox","app/form/FilteringSelect","dijit/form/CheckBox","dijit/form/RadioButton","dijit/form/ValidationTextBox","dojox/form/CheckedMultiSelect","dojox/form/BusyButton","app/store/UIStores","app/uicomponents/Map"],function(c,l,d,e,f,g,h,i,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,j,B,
C,D,E,F,G,H,I,J,K,L,M,k){return c("app.modules.surveyDefinitions.surveyDefinitionSetup.questionSetup.languagedQuestionSetup.BasicInfo",[d,e,f,g,j],{widgetsInTemplate:!0,templateString:h,uiStores:k.getInstance(),startup:function(){this.inherited(arguments);this.languagedQuestionBasicInfoForm=this.getWidget("languagedQuestionBasicInfoForm");this.languagedQuestionBasicInfoForm.set("storeURL",__.urls.LANGUAGED_QUESTION);this.languagedQuestionBasicInfoForm.set("refreshUI",i.hitch(this,"refreshFormUI"));
this.configureForm(this.languagedQuestionBasicInfoForm)},refreshFormUI:function(){},onActivate:function(){this.inherited(arguments);if(typeof this.eventHandlers=="undefined")this.eventHandlers=[];this.viewInForm(this.getUpdatingEntity(),this.languagedQuestionBasicInfoForm)},onDeactivate:function(){for(var a=0;a<this.eventHandlers.length;a++){var b=this.eventHandlers[a];typeof b!="undefined"&&b.remove()}this.eventHandlers=[]},destroy:function(){this.inherited(arguments)}})});