//>>built
require({cache:{"url:app/uicomponents/templates/InfoWindowButton.html":'<div>\n\t<div data-dojo-type="dijit.form.Button" data-dojo-attach-point="_button">Select</div>\n</div>\n'}});
define("app/uicomponents/InfoWindowButton",["dojo/_base/declare","dojo/dom-class","dojo/on","dojo/topic","dojo/_base/lang","dojo/text!./templates/InfoWindowButton.html","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/form/Button","app/mixins/WidgetMap"],function(a,j,b,c,d,e,f,g,h,k,i){return a("app.uicomponents.InfoWindowButton",[f,g,h,i],{widgetsInTemplate:!0,templateString:e,startup:function(){this.inherited(arguments);this._button=this.getWidget("_button");this._buttonHandler=
b(this._button,"click",d.hitch(this,"onButtonClicked"))},onButtonClicked:function(){c.publish(this.topicName,this.data)},destroy:function(){this.inherited(arguments);typeof this._buttonHandler!="undefined"&&this._buttonHandler!=null&&this._buttonHandler.remove()}})});