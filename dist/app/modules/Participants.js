//>>built
require({cache:{"url:app/modules/templates/Participants.html":'<div class="moduleContainer">\n\t<div data-dojo-attach-point="participantList" class="activatable" data-dojo-type="app.modules.participants.ParticipantList"></div>\n\t<div data-dojo-attach-point="participantSetupDialog" class="activatable includeInStates dialogsetup" data-dojo-type="app.loader.DialogLauncher" data-dojo-props="moduleURL: \'app/modules/participants/ParticipantSetup\', title : \'Participant Setup\',  dialogWidth: \'800px\', dialogHeight: \'620px\'"></div>\n</div>\n\t\t\n'}});
define("app/modules/Participants",["dojo/_base/declare","dojo/on","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","app/mixins/StatefulModule","dojo/text!./templates/Participants.html","dojo/_base/lang","dijit/form/Button","app/modules/participants/ParticipantList","app/loader/DialogLauncher","app/utils/HashManager"],function(a,h,b,c,d,e,f,i,j,k,l,g){return a("app.modules.Participants",[b,c,d,e],{widgetsInTemplate:!0,templateString:f,hashManager:g.getInstance(),setCurrentState:function(){this.inherited(arguments);
this.getCurrentState()==""&&this.hashManager.setState("list")}})});