//>>built
require({cache:{"url:app/modules/surveyDefinitions/surveyDefinitionSetup/navigationRuleSetup/templates/BasicInfo.html":'<div class="moduleContainer" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: \'center\'">\n\t\n\t<form dojoType="app.form.Manager" data-dojo-attach-point="navigationRuleBasicInfoForm" method="post">\n\t\t<table cellpadding="0" cellspacing="2" style="width: 100%;">\n\t\t\t<tr>\n\t\t\t\t<td  label="true">From question: </td>\n\t\t\t\t<td><select data-dojo-attach-point="from_question_idBox" name="from_question_id" store="{config:{url:\'QUESTION\', selectFirst:true}}" observer="recordChange, refreshUI" dojoType="app.form.FilteringSelect" maxHeight="200"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Evaluate question: </td>\n\t\t\t\t<td><select data-dojo-attach-point="question_to_evaluate_idBox" name="question_to_evaluate_id" store="{config:{url:\'QUESTION\', selectFirst:true}}" observer="recordChange, refreshUI" dojoType="app.form.FilteringSelect" maxHeight="200"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label="true">If response equals: </td>\n\t\t\t\t<td><select data-dojo-attach-point="response_value_conditionBox" name="response_value_condition" observer="recordChange, refreshUI" dojoType="app.form.FilteringSelect" maxHeight="200"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Jump to question: </td>\n\t\t\t\t<td><select data-dojo-attach-point="to_question_idBox" name="to_question_id" store="{config:{url:\'QUESTION\', selectFirst:true}}" observer="recordChange, refreshUI" dojoType="app.form.FilteringSelect" maxHeight="200"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t</table>\n\t</form>\n</div>'}});
define("app/modules/surveyDefinitions/surveyDefinitionSetup/navigationRuleSetup/BasicInfo",["dojo/_base/declare","dojo/on","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","app/mixins/StatefulModule","dojo/text!./templates/BasicInfo.html","dojo/_base/lang","dojo/_base/Deferred","dijit/registry","dijit/Dialog","dgrid/GridFromHtml","dojo/store/Memory","dojo/store/Observable","dojo/store/Cache","app/store/JsonRest","dgrid/Selection","dojo/parser","dojo/query","dijit/form/Button",
"dojox/validate","dojox/validate/web","app/form/Manager","app/mixins/FormManager","dijit/form/Textarea","dijit/form/TextBox","dijit/form/TimeTextBox","dijit/form/DateTextBox","dijit/form/Select","dijit/form/ComboBox","app/form/FilteringSelect","dijit/form/CheckBox","dijit/form/RadioButton","dijit/form/ValidationTextBox","dojox/form/CheckedMultiSelect","dojox/form/BusyButton","app/store/UIStores","app/utils/ChangeTracker","app/uicomponents/Map"],function(d,m,e,f,g,h,i,c,n,o,p,q,r,s,t,u,v,w,x,y,z,A,
B,j,C,D,E,F,G,H,I,J,K,L,M,N,k,l){return d("app.modules.surveyDefinitions.surveyDefinitionSetup.navigationRuleSetup.BasicInfo",[e,f,g,h,j],{widgetsInTemplate:!0,templateString:i,uiStores:k.getInstance(),changeTracker:l.getInstance(),startup:function(){this.inherited(arguments);this.response_value_conditionBox=this.getWidget("response_value_conditionBox");this.from_question_idBox=this.getWidget("from_question_idBox");this.question_to_evaluate_idBox=this.getWidget("question_to_evaluate_idBox");this.to_question_idBox=
this.getWidget("to_question_idBox");this.navigationRuleBasicInfoForm=this.getWidget("navigationRuleBasicInfoForm");this.navigationRuleBasicInfoForm.set("storeURL",__.urls.NAVIGATION_RULE);this.navigationRuleBasicInfoForm.set("refreshUI",c.hitch(this,"refreshFormUI"));this.uiStores.populateComboDynamicREST(this.response_value_conditionBox,__.urls.RESPONSE_CODE,c.hitch(this,"responseCodeBaseQuery"));this.configureForm(this.navigationRuleBasicInfoForm)},onActivate:function(){this.inherited(arguments);
if(typeof this.eventHandlers=="undefined")this.eventHandlers=[];this.viewInForm(this.getUpdatingEntity(),this.navigationRuleBasicInfoForm)},refreshFormUI:function(a,b){switch(b){case "from_question_id":case "question_to_evaluate_id":this.question_to_evaluate_idBox.set("value",a),this.uiStores.populateComboDynamicREST(this.response_value_conditionBox,__.urls.RESPONSE_CODE,c.hitch(this,"responseCodeBaseQuery"))}},prepareForSave:function(){var a=this.changeTracker.getChangesObject(__.urls.NAVIGATION_RULE),
b;for(b in a){if(b=="from_question_id")a.from_question_display=this.from_question_idBox.item.name;if(b=="question_to_evaluate_id")a.question_to_evaluate_display=this.question_to_evaluate_idBox.item.name;if(b=="to_question_id")a.to_question_display=this.to_question_idBox.item.name;if(b=="response_value_condition")a.response_value_condition_display=this.response_value_conditionBox.item.name}return!0},responseCodeBaseQuery:function(){var a=this.question_to_evaluate_idBox.item;if(typeof a=="object"&&
a!=null)return{response_type_id:a.response_type_id};return!1},onDeactivate:function(){for(var a=0;a<this.eventHandlers.length;a++){var b=this.eventHandlers[a];typeof b!="undefined"&&b.remove()}this.eventHandlers=[];this.inherited(arguments)}})});