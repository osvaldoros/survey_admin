//>>built
define("app/uicomponents/Dialog",["dojo/_base/declare","dijit/Dialog","app/mixins/StatefulModule","dojo/topic","dojo/_base/lang"],function(g,h,i,k,j){return g([h,i],{_hideConfirmed:!1,onShow:function(){this.inherited(arguments);this._hideConfirmed=!1;this.activate()},hide:function(){var b=!1,a=this.childrenRequireConfirmation();a==!0?b=a:typeof this.requireHideConfirmation=="function"&&(b=this.requireHideConfirmation());this._hideConfirmed||b==!1?this.inherited(arguments):(__.confirmDialog.set("confirmMessage",
"Are you sure you want to discard them ?"),__.confirmDialog.set("title","Unsaved changes"),__.confirmDialog.show(j.hitch(this,"confirmHide")))},confirmHide:function(){this._hideConfirmed=!0;this.hide()},onHide:function(){this.deactivate();this.inherited(arguments)},activate:function(){this.inherited(arguments);this.activateChildren(this.getChildren())},set:function(b,a,c){this.inherited(arguments);if(c===!0)for(var d=this.getChildren(),e=0;e<d.length;e++){var f=d[e];typeof f.set=="function"&&f.set(b,
a)}},setUpdatingEntity:function(b,a){for(var c=this.getChildren(),d=0;d<c.length;d++){var e=c[d];typeof e.setUpdatingEntity=="function"&&e.setUpdatingEntity(b,a)}},getUpdatingEntity:function(){for(var b=this.getChildren(),a=0;a<b.length;a++){var c=b[a];if(typeof c.getUpdatingEntity=="function")return c.getUpdatingEntity()}},childrenRequireConfirmation:function(){for(var b=this.getChildren(),a=0;a<b.length;a++){var c=b[a];if(typeof c.requireHideConfirmation=="function"&&c.requireHideConfirmation()==
!0)return!0}return!1},deactivate:function(){this.inherited(arguments);this.deactivateChildren(this.getChildren())},setCurrentState:function(b){this.inherited(arguments);if(this.getChildren().length==1){var a=this.getChildren()[0];typeof a!="undefined"&&a!=null&&typeof a.setCurrentState!="undefined"&&a.setCurrentState(b)}}})});