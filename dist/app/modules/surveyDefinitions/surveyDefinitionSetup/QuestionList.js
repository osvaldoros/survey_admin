//>>built
define("app/modules/surveyDefinitions/surveyDefinitionSetup/QuestionList",["dojo/_base/declare","dojo/on","dojo/_base/lang","app/uicomponents/blocks/GridManagerBlock","app/mixins/SelfActivates","./QuestionSetup"],function(b,g,c,d,e,f){return b("app.modules.surveyDefinitions.surveyDefinitionSetup.QuestionList",[d,e],{title:"Questions",_store:__.urls.QUESTION,_entityLabel:"Question",gridHeight:"250px",_showTitle:!1,constructor:function(a){b.safeMixin(this,a||{});this._columns=[{label:"Name",field:"name",
sortable:!0},{label:"Code",field:"id",sortable:!0},{label:"Order",field:"order",sortable:!0}];this._base_query=c.hitch(this,"questionBaseQuery")},questionBaseQuery:function(){if(typeof this.survey_definition_id=="undefined"||this.survey_definition_id==null)return!1;return{data_definition_id:this.survey_definition_id}},startup:function(){this.inherited(arguments);this.setupDialog=__.workspaceManager.getModuleInDialog(new f,{title:"Question Setup",dialogWidth:"700px",dialogHeight:"480px"})},onActivate:function(){this.inherited(arguments);
console.log("Questions > activate")},_setSurvey_definition_idAttr:function(a){this.survey_definition_id=a;console.log("Questions > survey_definition_id = "+a);this.setupDialog.set("survey_definition_id",a,!0);this.refresh();this._showAddBtn=this.survey_definition_id!=null&&typeof this.survey_definition_id!="undefined";this._showEditBtn=this.survey_definition_id!=null&&typeof this.survey_definition_id!="undefined";this._showDeleteBtn=this.survey_definition_id!=null&&typeof this.survey_definition_id!=
"undefined";this.showOrHideStuff()}})});