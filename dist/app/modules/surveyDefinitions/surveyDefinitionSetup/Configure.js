//>>built
require({cache:{"url:app/modules/surveyDefinitions/surveyDefinitionSetup/templates/Configure.html":'<div class="moduleContainer" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="region: \'center\'">\n\t<div style="clear: both;" class="centerPanel" data-dojo-attach-point="_tabs" data-dojo-type="dijit.layout.TabContainer" data-dojo-props="region: \'center\'" nested="true" doLayout="false"></div>\n</div>'}});
define("app/modules/surveyDefinitions/surveyDefinitionSetup/Configure",["dojo/_base/declare","dojo/on","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","app/mixins/StatefulModule","dojo/text!./templates/Configure.html","dojo/_base/lang","app/store/UIStores","app/mixins/FormManager","app/mixins/TabManager"],function(c,l,d,e,f,g,h,m,i,j,k){return c("app.modules.surveyDefinitions.surveyDefinitionSetup.Configure",[d,e,f,g,j,k],{widgetsInTemplate:!0,templateString:h,uiStores:i.getInstance(),
startup:function(){this.inherited(arguments);this._tabs=this.getWidget("_tabs");this.configureTabs({tabs:this._tabs,steps:[{title:"Questions",moduleURL:"app/modules/surveyDefinitions/surveyDefinitionSetup/QuestionList"},{title:"Navigation Rules",moduleURL:"app/modules/surveyDefinitions/surveyDefinitionSetup/NavigationRuleList"},{title:"Report Rules",moduleURL:"app/modules/surveyDefinitions/surveyDefinitionSetup/ReportRuleList"}]})},onActivate:function(){this.inherited(arguments);if(typeof this.eventHandlers==
"undefined")this.eventHandlers=[];var a=this.getUpdatingEntity();typeof a=="object"&&a!=null?this.setOnChildren("survey_definition_id",a.id,!0):this.setOnChildren("survey_definition_id",null,!0)},onDeactivate:function(){for(var a=0;a<this.eventHandlers.length;a++){var b=this.eventHandlers[a];typeof b!="undefined"&&b.remove()}this.eventHandlers=[];this.inherited(arguments)}})});