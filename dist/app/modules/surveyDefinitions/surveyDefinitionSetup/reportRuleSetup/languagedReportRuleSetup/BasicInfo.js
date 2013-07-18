//>>built
require({cache:{"url:app/modules/surveyDefinitions/surveyDefinitionSetup/reportRuleSetup/languagedReportRuleSetup/templates/BasicInfo.html":'<div class="moduleContainer" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: \'center\'" style="overflow: auto; height:320px; margin-bottom: 5px;">\n\t\n\t<form dojoType="app.form.Manager" data-dojo-attach-point="languagedReportRuleBasicInfoForm" method="post">\n\t\t<table cellpadding="0" cellspacing="2" style="width: 100%;">\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Language*: </td>\n\t\t\t\t<td><select name="language_id" data-dojo-attach-point="languageBox" observer="refreshUI,recordChange" store="{config:{url:\'LANGUAGE\', selectFirst:true}}" dojoType="app.form.FilteringSelect" maxHeight="200"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Name*: </td>\n\t\t\t\t<td><input type="text" required="true" name="name" data-dojo-attach-point="nameBox" observer="recordChange" placeholder="Acme Lab Inc" dojoType="dijit.form.ValidationTextBox" missingMessage="Ooops!  You forgot the question name" /></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td></td>\n\t\t\t\t<td><span><strong>Participant Report Item</strong></span></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td colspan="3"><div data-dojo-attach-point="participant_report_itemBox" name="participant_report_item"  observer="recordChange" data-dojo-type="app.uicomponents.Editor" style="width:450px;"></div></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td></td>\n\t\t\t\t<td><span><strong>Staff Report Item</strong></span></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td colspan="3"><div data-dojo-attach-point="staff_report_itemBox" name="staff_report_item"  observer="recordChange" data-dojo-type="app.uicomponents.Editor" style="width:450px;"></div></td>\n\t\t\t</tr>\n\t\t</table>\n\t</form>\n\n</div>'}});
define("app/modules/surveyDefinitions/surveyDefinitionSetup/reportRuleSetup/languagedReportRuleSetup/BasicInfo",["dojo/_base/declare","dojo/on","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","app/mixins/StatefulModule","dojo/text!./templates/BasicInfo.html","dojo/_base/lang","dojo/_base/Deferred","dijit/registry","dijit/Dialog","dgrid/GridFromHtml","dojo/store/Memory","dojo/store/Observable","dojo/store/Cache","app/store/JsonRest","dgrid/Selection","dojo/parser","dojo/query",
"dijit/form/Button","dojox/validate","dojox/validate/web","app/form/Manager","app/mixins/FormManager","dijit/form/Textarea","dijit/form/TextBox","dijit/form/TimeTextBox","dijit/form/DateTextBox","dijit/form/Select","dijit/form/ComboBox","app/form/FilteringSelect","dijit/form/CheckBox","dijit/form/RadioButton","dijit/form/ValidationTextBox","dojox/form/CheckedMultiSelect","dojox/form/BusyButton","app/store/UIStores","app/uicomponents/Map"],function(c,l,d,e,f,g,h,i,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,j,B,
C,D,E,F,G,H,I,J,K,L,M,k){return c("app.modules.surveyDefinitions.surveyDefinitionSetup.reportRuleSetup.languagedReportRuleSetup.BasicInfo",[d,e,f,g,j],{widgetsInTemplate:!0,templateString:h,uiStores:k.getInstance(),startup:function(){this.inherited(arguments);this.languagedReportRuleBasicInfoForm=this.getWidget("languagedReportRuleBasicInfoForm");this.languagedReportRuleBasicInfoForm.set("storeURL",__.urls.LANGUAGED_REPORT_RULE);this.languagedReportRuleBasicInfoForm.set("refreshUI",i.hitch(this,"refreshFormUI"));
this.configureForm(this.languagedReportRuleBasicInfoForm)},refreshFormUI:function(){},onActivate:function(){this.inherited(arguments);if(typeof this.eventHandlers=="undefined")this.eventHandlers=[];this.viewInForm(this.getUpdatingEntity(),this.languagedReportRuleBasicInfoForm)},onDeactivate:function(){for(var a=0;a<this.eventHandlers.length;a++){var b=this.eventHandlers[a];typeof b!="undefined"&&b.remove()}this.eventHandlers=[]},destroy:function(){this.inherited(arguments)}})});