//>>built
require({cache:{"url:app/uicomponents/templates/Spinner.html":'<div class="spinner_container">\n\t<div class="spinner"></div>\n</div>\n'}});
define("app/uicomponents/Spinner",["dojo/_base/declare","dojo/dom-class","dojo/on","dojo/_base/lang","dojo/text!./templates/Spinner.html","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin"],function(a,f,g,h,b,c,d,e){return a("app.uicomponents.Spinner",[c,d,e],{title:"Spinner",widgetsInTemplate:!1,templateString:b,spinning:!1,jsonRequests:0,startup:function(){this.inherited(arguments);this.hide()},spin:function(){this.jsonRequests==0&&this.__spin();this.jsonRequests++},__spin:function(){if(!this.spinning)this.show(),
this.spinning=!0},unspin:function(){this.jsonRequests>0&&this.jsonRequests--;this.jsonRequests==0&&this.__unspin()},__unspin:function(){if(this.jsonRequests==0)this.open&&this.hide(),this.spinning=!1},show:function(){this.domNode.style.display="block";this.open=!0},hide:function(){this.domNode.style.display="none";this.open=!1}})});