//>>built
require({cache:{"url:app/uicomponents/templates/Notes.html":'<div class="dc_dialog" style="padding-top: 0;">\n\t<form class="pad10" dojoType="app.form.Manager" style="width:100%; height:215px; padding:0;" data-dojo-attach-point="notesForm" method="post">\n\t\t<div data-dojo-attach-point="_notes" name="_notes" data-dojo-type="app.uicomponents.Editor" data-dojo-props="editorHeight:\'100%;\'" observer="recordChange" style="width:100%; height:150px;" ></div>\n\t</form>\n\t\n\t<div class="edgePanel">\n\t\t<div class="floatRight" data-dojo-type="dijit.form.Button" data-dojo-attach-point="_actionBtn" style="margin-bottom:5px;">New note</div>\t\n\t\t<div class="floatRight" data-dojo-type="dijit.form.Button" data-dojo-attach-point="_cancelBtn" style="margin-bottom:5px;">Cancel</div>\t\n\t</div>\n\n\t<div data-dojo-attach-point="_noteCollection" style="width:100%; padding:0; margin:0;"></div>\n</div>'}});
define("app/uicomponents/Notes",["dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on","dojo/_base/lang","dojo/text!./templates/Notes.html","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","app/mixins/StatefulModule","app/utils/HashManager","app/utils/ChangeTracker","app/form/Manager","dijit/form/Button","app/mixins/FormManager","./Editor"],function(h,q,r,s,g,e,i,j,k,l,m,n,o,t,u,p){return h("app.uicomponents.Notes",[j,k,l,m,p],{title:"Notes",
widgetsInTemplate:!0,templateString:i,hashManager:n.getInstance(),changeTracker:o.getInstance(),_newLabel:"New note",_saveLabel:"Save",startup:function(){this.inherited(arguments);this.notesForm=this.getWidget("notesForm");this._actionBtn=this.getWidget("_actionBtn");this._cancelBtn=this.getWidget("_cancelBtn");this._noteCollection=this.getWidget("_noteCollection");this._actionBtn.set("label",this._newLabel);this.notesForm.domNode.style.display="none";this._cancelBtn.domNode.style.display="none";
this.notesForm.set("storeURL",__.urls.ACTIVITY)},onActivate:function(){console.log("Notes > onActivate");this.inherited(arguments);if(typeof this.eventHandlers=="undefined")this.eventHandlers=[];this.eventHandlers.push(g(this._actionBtn,"click",e.hitch(this,"actionButtonHandler")));this.eventHandlers.push(g(this._cancelBtn,"click",e.hitch(this,"cancelButtonHandler")));this.closeForm();this.refreshActivity()},refreshActivity:function(a,b){console.log("refreshActivity > ");typeof b=="undefined"&&(b=
!1);typeof a=="undefined"&&(a=this.hashManager.getEntity());var d=this;__.api.list(__.urls.ACTIVITY,function(a){d.populateNotes(a);b===!0&&d.autoShow(a)},{entity_id:a})},autoShow:function(a){console.log("autoShow > ");e.isArray(a)&&a.length>0&&!this.__isShowing()?this.show():this.hide()},__isShowing:function(){return this.parentPane.__isShowing},show:function(){console.log("show >");typeof this.parentPane=="object"&&this.parentPane!=null&&(console.log("parentPane > show > "),this.parentPane.show(),
this.parentPane.bringToTop())},hide:function(){console.log("hide >");typeof this.parentPane=="object"&&this.parentPane!=null&&(console.log("parentPane > hide > "),this.parentPane.hide())},actionButtonHandler:function(){switch(this._actionBtn.label){case this._newLabel:this.openForm();break;case this._saveLabel:this.closeForm();var a=this.changeTracker.getChangesObject(__.urls.ACTIVITY),b=this;__.api.post(__.urls.ACTIVITY,{details:a._notes.trim(),entity_id:this.hashManager.getEntity(),user:{id:__.user.id}}).then(function(){b.refreshActivity()})}},
cancelButtonHandler:function(){this.closeForm()},populateNotes:function(a){for(var b="",d=a.length-1;d>=0;d--){var c=a[d];c.title=c.activity_date+" "+c.activity_time;var e=d%2!=0?"#FAF0E6":"#FFFFFF",f;if(typeof c.user=="object"&&c.user!=null)if(typeof c.user.name!="undefined")f=c.user.name;else{if(typeof c.user.username!="undefined")f=c.user.username}else f="Anonymous";b+="<div style='border-style:solid; border-width:1px; border-color: #FFA07A; background-color: "+e+"; padding:5px;'>";b+="<span class='coloredLabel' style='float:right;'>"+
c.title+"</span>";b+="<span class='note_Label' style='float:left; font-weight:bold;'>"+f+" said: </span>";b+="<br/><br/>";b+="<span>"+c.details+"</span>";b+="</div>"}this._noteCollection.innerHTML=b},openForm:function(){this.notesForm.domNode.style.display="";this._cancelBtn.domNode.style.display="";this._actionBtn.set("label",this._saveLabel)},closeForm:function(){this.notesForm.domNode.style.display="none";this._cancelBtn.domNode.style.display="none";this._notes.set("value","");this._actionBtn.set("label",
this._newLabel)},onDeactivate:function(){this.inherited(arguments);console.log("Notes > onDeactivate");for(var a=0;a<this.eventHandlers.length;a++){var b=this.eventHandlers[a];typeof b!="undefined"&&b.remove()}this.eventHandlers=[]}})});