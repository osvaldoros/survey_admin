//>>built
require({cache:{"url:app/modules/participants/participantSetup/templates/BasicInfo.html":'<div class="moduleContainer" class="centerPanel" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: \'center\'">\n\t\n\t<form dojoType="app.form.Manager" data-dojo-attach-point="participantBasicInfoForm" method="post">\n\t\t<table cellpadding="0" cellspacing="2" style="width: 100%;">\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Id: </td>\n\t\t\t\t<td><input type="text" required="true" name="id" data-dojo-attach-point="id" observer="recordChange" placeholder="Acme Lab Inc" dojoType="dijit.form.ValidationTextBox" missingMessage="Ooops!  You forgot the participant name" /></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Created: </td>\n\t\t\t\t<td><input type="text" required="true" name="created" data-dojo-attach-point="created" observer="recordChange" placeholder="Acme Lab Inc" dojoType="dijit.form.ValidationTextBox" missingMessage="Ooops!  You forgot the participant name" /></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<\!--\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Age: </td>\n\t\t\t\t<td><input type="text" required="true" name="age" data-dojo-attach-point="age" observer="recordChange" placeholder="18" dojoType="dijit.form.ValidationTextBox" missingMessage="Ooops!  You forgot the participant age" /></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Client: </td>\n\t\t\t\t<td><select data-dojo-attach-point="client" name="client_id" data-dojo-attach-point="clientBox" store="{config:{url:\'CLIENT\', selectFirst:true}}" observer="recordChange, refreshUI" dojoType="app.form.FilteringSelect" maxHeight="200"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Education: </td>\n\t\t\t\t<td><select data-dojo-attach-point="education" name="education_id" data-dojo-attach-point="educationBox" store="{config:{url:\'EDUCATION\', selectFirst:true}}" observer="recordChange, refreshUI" dojoType="app.form.FilteringSelect" maxHeight="200"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label="true">English Proficiency: </td>\n\t\t\t\t<td><select data-dojo-attach-point="english_proficiency" name="english_proficiency_id" data-dojo-attach-point="english_proficiencyBox" store="{config:{url:\'ENGLISH_PROFICIENCY\', selectFirst:true}}" observer="recordChange, refreshUI" dojoType="app.form.FilteringSelect" maxHeight="200"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Immigration Status: </td>\n\t\t\t\t<td><select data-dojo-attach-point="immigration_status" name="immigration_status_id" data-dojo-attach-point="immigration_statusBox" store="{config:{url:\'IMMIGRATION_STATUS\', selectFirst:true}}" observer="recordChange, refreshUI" dojoType="app.form.FilteringSelect" maxHeight="200"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Home Life: </td>\n\t\t\t\t<td><select data-dojo-attach-point="home_life" name="home_life_id" data-dojo-attach-point="home_lifeBox" store="{config:{url:\'HOME_LIFE\', selectFirst:true}}" observer="recordChange, refreshUI" dojoType="app.form.FilteringSelect" maxHeight="200"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Income: </td>\n\t\t\t\t<td><select data-dojo-attach-point="income" name="income_id" data-dojo-attach-point="incomeBox" store="{config:{url:\'INCOME\', selectFirst:true}}" observer="recordChange, refreshUI" dojoType="app.form.FilteringSelect" maxHeight="200"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Relationship Status: </td>\n\t\t\t\t<td><select data-dojo-attach-point="relationship_status" name="relationship_status_id" data-dojo-attach-point="relationship_statusBox" store="{config:{url:\'RELATIONSHIP_STATUS\', selectFirst:true}}" observer="recordChange, refreshUI" dojoType="app.form.FilteringSelect" maxHeight="200"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label="true">Gender: </td>\n\t\t\t\t<td><select data-dojo-attach-point="gender" name="gender_id" data-dojo-attach-point="genderBox" store="{config:{url:\'GENDER\', selectFirst:true}}" observer="recordChange, refreshUI" dojoType="app.form.FilteringSelect" maxHeight="200"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t--\>\n\t\t</table>\n\t</form>\n\t\n\t\n</div>'}});
define("app/modules/participants/participantSetup/BasicInfo",["dojo/_base/declare","dojo/on","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","app/mixins/StatefulModule","dojo/text!./templates/BasicInfo.html","dojo/_base/lang","dojo/_base/Deferred","dijit/registry","dijit/Dialog","dgrid/GridFromHtml","dojo/store/Memory","dojo/store/Observable","dojo/store/Cache","app/store/JsonRest","dgrid/Selection","dojo/parser","dojo/query","dijit/form/Button","dojox/validate","dojox/validate/web",
"app/form/Manager","app/mixins/FormManager","dijit/form/Textarea","dijit/form/TextBox","dijit/form/TimeTextBox","dijit/form/DateTextBox","dijit/form/Select","dijit/form/ComboBox","app/form/FilteringSelect","dijit/form/CheckBox","dijit/form/RadioButton","dijit/form/ValidationTextBox","dojox/form/CheckedMultiSelect","dojox/form/BusyButton","app/store/UIStores","app/uicomponents/Map"],function(c,l,d,e,f,g,h,i,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,j,B,C,D,E,F,G,H,I,J,K,L,M,k){return c("app.modules.participants.participantSetup.BasicInfo",
[d,e,f,g,j],{widgetsInTemplate:!0,templateString:h,uiStores:k.getInstance(),startup:function(){this.inherited(arguments);this.participantBasicInfoForm=this.getWidget("participantBasicInfoForm");this.participantBasicInfoForm.set("storeURL",__.urls.PARTICIPANT);this.participantBasicInfoForm.set("refreshUI",i.hitch(this,"refreshFormUI"));this.configureForm(this.participantBasicInfoForm)},refreshFormUI:function(){},onActivate:function(){this.inherited(arguments);if(typeof this.eventHandlers=="undefined")this.eventHandlers=
[];this.viewInForm(this.getUpdatingEntity(),this.participantBasicInfoForm)},onDeactivate:function(){for(var a=0;a<this.eventHandlers.length;a++){var b=this.eventHandlers[a];typeof b!="undefined"&&b.remove()}this.eventHandlers=[]},destroy:function(){this.inherited(arguments)}})});